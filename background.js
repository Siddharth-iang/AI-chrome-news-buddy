//.local stores only in ur current browser
//.sync stores across all chrome browsers

chrome.runtime.onInstalled.addListener(()=>{
    chrome.storage.sync.get(["geminiAPIKey"], (result) => {
        if(!result.geminiAPIKey){
            chrome.tabs.create({
                "url": "options.html",
            });
        }
    });
});