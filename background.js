chrome.commands.onCommand.addListener(function(command) {
  if (command === "search-on-google") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var selectedText = "";
      chrome.tabs.executeScript(tabs[0].id, {code: "window.getSelection().toString();"}, function(selection) {
        selectedText = selection[0];
        var newUrl = "https://www.hoptimaal.nl/nl/search/" + encodeURIComponent(selectedText) + "/";
        chrome.tabs.create({url: newUrl});
      });
    });
  }
});

chrome.contextMenus.create({
  title: "Dig it on Hoptimaal",
  contexts: ["selection"],
  id: "myContextMenuId"
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "myContextMenuId") {
    var selectedText = info.selectionText;
    var newUrl = "https://www.hoptimaal.nl/nl/search/" + encodeURIComponent(selectedText) + "/";
    chrome.tabs.create({url: newUrl});
  }
});
