document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.sync.get(["geminiAPIKey"], ({geminiAPIKey}) => {
        if(geminiAPIKey) document.getElementById("api-key").value = geminiAPIKey;
    });
});