document.getElementById("summarize").addEventListener("click", ()=>{
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<div class="loading"><div class="loader"></div></div>';
    const summaryType = document.getElementById("summary-type").value; 

    // 1. Get urser's API key
    chrome.storage.sync.get(["geminiApiKey"], async (result) => {
    if (!result.geminiApiKey) {
      resultDiv.innerHTML =
        "API key not found. Please set your API key in the extension options.";
      return;
    }
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
                    const summary = await getGeminiSummary(text, summaryType, result.geminiApiKey);
                    resultDiv.textContent = summary;
                } catch(error){
                    resultDiv.textContent = "Gemini Error:" + error.message;
                }
            });
        });
    });

    async function getGeminiSummary(rawText, type, apiKey){
        const max = 20000;
        const text = rawText.length > max ? rawText.slice(0,max) : rawText;

    let prompt;
    switch (type) {
     case "brief":
      prompt = `Provide a brief summary of the following article in 2-3 sentences:\n\n${text}`;
      break;
     case "detailed":
       prompt = `Provide a detailed summary of the following article, covering all main points and key details:\n\n${text}`;
       break;
     case "bullets":
       prompt = `Summarize the following article in 5-7 key points. Format each point as a line starting with "- " (dash followed by a space). Do not use asterisks or other bullet symbols, only use the dash. Keep each point concise and focused on a single key insight from the article:\n\n${text}`;
       break;
     default:
       prompt = `Summarize the following article:\n\n${text}`;
   }

try {
    // Make a POST request to Google's Gemini API
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",                           // HTTP method - we're sending data
        headers: { "Content-Type": "application/json" },  // Tell API we're sending JSON
        body: JSON.stringify({                    // Convert JavaScript object to JSON string
            contents: [{                          // The content to process
                parts: [{ text: prompt }],        // The prompt text we want summarized
            }],
            generationConfig: {                   // Configuration for how to generate text
                temperature: 0.2,                 // Low temperature = more focused/consistent output
            },
        }),
    });
    
    if (!res.ok) {
        const errorData = await res.json();     // Parse the error response as JSON
        throw new Error(errorData.error?.message || "API request failed"); 
    }
    
    // Parse the successful response as JSON
    const data = await res.json();
    
    // Extract the generated text from the nested response structure
    return (data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.");
    
} catch(error) {
    console.error("Error calling Gemini API:", error); 
    throw new Error("Failed to generate summary. Please try again later.");  
  }
}
});

document.getElementById("copy-btn").addEventListener("click", () => {
  const summaryText = document.getElementById("result").innerText;

  if (summaryText && summaryText.trim() !== "") {
    navigator.clipboard
      .writeText(summaryText)
      .then(() => {
        const copyBtn = document.getElementById("copy-btn");
        const originalText = copyBtn.innerText;

        copyBtn.innerText = "Copied!";
        setTimeout(() => {
          copyBtn.innerText = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  }
});