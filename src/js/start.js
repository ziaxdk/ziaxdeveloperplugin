// Run our kitten generation script as soon as the document's DOM is ready.
/*document.addEventListener('DOMContentLoaded', function () {
  //kittenGenerator.requestKittens();
  chrome.tabs.create({ url: "home.html" }, function (tab){ });
});*/
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: chrome.extension.getURL("../home.html")
  });
});