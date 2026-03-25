document.addEventListener("DOMContentLoaded", ()=>{
    chrome.storage.sync.get(["geminiAPIKey"], ({geminiAPIKey}) => {
        if(geminiAPIKey) document.getElementById("api-key").value = geminiAPIKey;
    });

    document.getElementById("save-button").addEventListener("click", ()=>{
        const apikey = document.getElementById("api-key").value.trim();
        if(!apikey) return;

        chrome.storage.sync.set({geminiAPIKey: apikey}, ()=>{
            document.getElementById("success-message").style.display = "block";
            setTimeout(() => window.close(), 1000);
        });
    });
});