document.getElementById("summarize").addEventListener("click", ()=>{
    const result = document.getElementById("result");
    const summaryType = document.getElementById("summary-type").value;  

    resultDiv.innerHTML = '<div class="loader>'

    // 1. Get urser's API key
    chrome.storage.get(["geminiAPIKey"], ({geminiAPIKey}) => {
        if(!geminiAPIKey){
            resultDiv.textContent = "No API Key is set. Click the gear icon to add one !";
            return;
        }
    });
    // 2. Ask content.js for the page text
    chrome.tabs.query({active:true, currentWindow:true}, ([tab])=>{
        chrome.tabs.sendMessage(
            tab.id, 
            {type: "GET_ARTICLE_TEXT"},
            async ({text}) => {
                if(!text){
                    resultDiv.textContent = "Couldn't extract text from this page."
                    return;
                }
                
                // 3. Send text to Gemini
                try{
                    const summary = await getGeminiSummary(text, summaryType, geminiAPIKey);
                    resultDiv.textContent = summary;
                } catch(error){
                    resultDiv.textContent = "Gemini Error:" + error.message;
                }
            });
        });
    });

    async function getGeminiSummary(rawText, type, apikey){
        const max = 20000;
        const text = rawText.length > max ? rawText.slice(0,max) : rawText;

    let prompt;
    switch (summaryType) {
     case "brief":
      prompt = `Provide a brief summary of the following article in 2-3 sentences:\n\n${truncatedText}`;
      break;
     case "detailed":
       prompt = `Provide a detailed summary of the following article, covering all main points and key details:\n\n${truncatedText}`;
       break;
     case "bullets":
       prompt = `Summarize the following article in 5-7 key points. Format each point as a line starting with "- " (dash followed by a space). Do not use asterisks or other bullet symbols, only use the dash. Keep each point concise and focused on a single key insight from the article:\n\n${truncatedText}`;
       break;
     default:
       prompt = `Summarize the following article:\n\n${truncatedText}`;
   }
}