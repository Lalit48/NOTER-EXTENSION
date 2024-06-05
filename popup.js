document.getElementById("save").addEventListener("click", () => {
  const note = document.getElementById("note").value;
  if (note) {
    chrome.runtime.sendMessage({ action: "saveNote", note: note }, (response) => {
      if (response.status === "success") {
        document.getElementById("note").value = "";
        alert("Note saved!");
      }
    });
  } else {
    alert("Please enter a note before saving.");
  }
});

document.getElementById("export").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "exportNotes" }, (response) => {
    const notes = response.notes;
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  });
});

document.getElementById("new-note").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "newNoteFile" }, (response) => {
    alert(`New note file created: ${response.fileName}`);
  });
});
