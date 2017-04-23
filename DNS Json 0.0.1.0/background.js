var updateLocation = function(){
  console.log('urlNS');

  chrome.tabs.getSelected(null, function(tab) {

    var a13 = document.getElementById('a1');
    console.log(a13);
    
    let nsWix = [];
    let ns = [];

    var domainUrlNs = extractRootDomain(tab.url);
    
    var urlNS = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/ns';
    var urlW = 'https://bo.wixpress.com/bo/api/s3/domain/services/getWixDomain?domainName=' + domainUrlNs;

    //var url = 'http://ip-api.com/json/' + extractRootDomain(tab.url); 
    // The url we will be making the GET request to.

 /*   httpGetAsync(url, function(response){
      var data = JSON.parse(response);
      chrome.browserAction.setBadgeText({text: data.region});
      chrome.browserAction.se
    });*/

    /*function getRecords (callback) {

      httpGetAsync(urlNS, function(response){
        var data = JSON.parse(response);
        ns.push(data.answer[0].rdata);
        ns.push(data.answer[1].rdata);
      });

      httpPostAsync(urlW, function(response){
        var data = JSON.parse(response);
        nsWix.push(data.nameserver2);
        nsWix.push(data.nameserver1);
      });
      console.log(ns, nsWix);
      callback();
    };


    function checkNS () {
      if (nsWix[0] === ns[0]){
        chrome.browserAction.setBadgeText({text: 'YES'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'GREEN'});
        
      } else {
        chrome.browserAction.setBadgeText({text: 'NO'});
        chrome.browserAction.setBadgeBackgroundColor({color: 'RED'});
      }
    };

    getRecords(null, checkNS);
*/
    
  });
};


// Called whenever a tab is updated (change URL).
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo.status === 'complete'){
      updateLocation();
    }
});

// Called when a new tab is activated (switching tabs/ new tab).
chrome.tabs.onActivated.addListener(function(activeInfo) {
    updateLocation();
});
