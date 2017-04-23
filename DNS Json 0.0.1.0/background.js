var updateLocation = function(){
  //console.log('urlNS');

  chrome.tabs.getSelected(null, function(tab) {

    chrome.browserAction.setBadgeText({text: ''});

    var domainNS = {};
    var knownDomains = ['wixpress.com', 'wixanswers.com', 'google.com', 'youtube.com', 'gmail.com'];
    var domainUrlNs = extractRootDomain(tab.url);
    var urlNS = 'https://dns.google.com/resolve?name=' + domainUrlNs + '&type=ns';
    var urlW = 'https://bo.wixpress.com/bo/api/s3/domain/services/getWixDomain?domainName=' + domainUrlNs;

    //console.log('read google');
    httpGetSync(urlNS, function(response){
      var data = JSON.parse(response);

      domainNS.LookUp = [data.Answer[0].data, data.Answer[1].data];

    });
    //console.log('done google');
    
    //console.log('read Wix');
    httpPostSync(urlW, function(response){
      try {
        var data = JSON.parse(response);
        domainNS.Wix = [data.nameserver2, data.nameserver1];
      } catch(e) {
        console.log(e);
        domainNS.Wix = ['', ''];
      };
      //console.log(domainNS);
    });
    //console.log('done Wix');
    //console.log('comp');

    var comp = '';

    if (domainNS.Wix[0] === '' || knownDomains.indexOf(domainUrlNs) >= 0 ) {
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
