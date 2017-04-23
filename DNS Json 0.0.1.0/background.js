var updateLocation = function(){
  //console.log('urlNS');

  chrome.tabs.getSelected(null, function(tab) {

    chrome.browserAction.setBadgeText({text: ''});

    var domainNS = {};
    var domainUrlNs = extractRootDomain(tab.url);
    var urlNS = 'https://dns.google.com/resolve?name=' + domainUrlNs + '&type=ns';
    var urlW = 'https://bo.wixpress.com/bo/api/s3/domain/services/getWixDomain?domainName=' + domainUrlNs;

    console.log('read google');
    httpGetSync(urlNS, function(response){
      var data = JSON.parse(response);

      domainNS.LookUp = [data.Answer[0].data, data.Answer[1].data];

    });
    console.log('done google');
    console.log('read Wix');
    httpPostSync(urlW, function(response){
      console.log(typeof(response)=== "string");
      try {
        var data = JSON.parse(response);
        domainNS.Wix = [data.nameserver2, data.nameserver1];
      } catch(e) {
        console.log(e);
        domainNS.Wix = ['', ''];
      };
      
      console.log(domainNS);
      
    });
    console.log('done Wix');

    //chrome.browserAction.setBadgeText({text: 'YES'});
    //chrome.browserAction.setBadgeBackgroundColor({color: 'GREEN'});
    console.log('comp');

    var comp = '';

    if (domainNS.Wix[0] === '' || ['wixpress.com', 'google.com', 'youtube.com', 'gmail.com'].indexOf(domainUrlNs) >= 0 ) {
      comp = '';
    } else {
      comp = domainNS.LookUp[0].includes(domainNS.Wix[0]) || domainNS.LookUp[0].includes(domainNS.Wix[1]);
    };

    switch(comp) {
      case true:
            chrome.browserAction.setBadgeText({text: 'OK'});
            chrome.browserAction.setBadgeBackgroundColor({color: 'GREEN'});
            break;
      case false:
            chrome.browserAction.setBadgeText({text: 'BAD'});
            chrome.browserAction.setBadgeBackgroundColor({color: 'RED'});
            break;
      default:
            chrome.browserAction.setBadgeText({text: ''});
    };



    //var domainUrlNs = extractRootDomain(tab.url);
    
    //var urlNS = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/ns';
    //var urlW = 'https://bo.wixpress.com/bo/api/s3/domain/services/getWixDomain?domainName=' + domainUrlNs;

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
