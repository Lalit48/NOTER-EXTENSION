chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ notes: "", fileCount: 1 }, () => {
    console.log("Notes storage initialized.");
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveNote") {
    chrome.storage.sync.get(["notes"], (result) => {
      let newNotes = result.notes + request.note + "\n";
      chrome.storage.sync.set({ notes: newNotes }, () => {
        sendResponse({ status: "success" });
      });
    });
    return true;
  } else if (request.action === "exportNotes") {
    chrome.storage.sync.get(["notes"], (result) => {
      sendResponse({ notes: result.notes });
    });
    return true;
  } else if (request.action === "newNoteFile") {
    chrome.storage.sync.get(["fileCount"], (result) => {
      let newFileCount = result.fileCount + 1;
      chrome.storage.sync.set({ notes: "", fileCount: newFileCount }, () => {
        sendResponse({ fileName: `notes${newFileCount}.txt` });
      });
    });
    return true;
  }
});
