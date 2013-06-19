// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
window.saveVideoData = function(tab) {
  var url = tab.url;
  $.ajax("http://www.youtube.com/oembed?url=" + url + "&format=json").done(function(response) {
    this.videos = JSON.parse(localStorage.getItem('videos'));
    if(this.videos == null) {
      this.videos = new Array();
    }
    this.videos.push(response);
    localStorage.setItem('videos', JSON.stringify(this.videos));
  });
};
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });
chrome.browserAction.onClicked.addListener(
    function(tab) {
      saveVideoData(tab);
    }
);

