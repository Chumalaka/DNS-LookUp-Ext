document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab so we can extract the url.
  chrome.tabs.getSelected(null, function(tab) {
    var domainUrlNs = extractRootDomain(tab.url);
    var domainUrlC = extractHostname(tab.url);
    // The urls we will be making the GET request to.
    var urlNS = 'https://dns.google.com/resolve?name=' + domainUrlNs + '&type=ns';
    var urlA = 'https://dns.google.com/resolve?name=' + domainUrlNs + '&type=a';
    var urlC = 'https://dns.google.com/resolve?name=' + domainUrlC + '&type=cname';
    var urlW = 'https://bo.wixpress.com/bo/api/s3/domain/services/getWixDomain?domainName=' + domainUrlNs;
    //var domainNS = {};

    //console.log(urlW);
    //console.log(urlC);
    httpGetAsync(urlNS, function(response){
      var data = JSON.parse(response);

      // Get the DOM elements.
      var ns1 = document.getElementById('ns1');
      var ns2 = document.getElementById('ns2');

      // Set the text of the elements.
      ns1.innerHTML = data.Answer[0].data;
      ns2.innerHTML = data.Answer[1].data;
      domainNS.LookUp = [data.Answer[0].data, data.Answer[1].data];

      var tabUrl = document.getElementById('tab');
      tabUrl.innerHTML = domainUrlNs;

    });

    httpGetAsync(urlA, function(response){
      var data = JSON.parse(response);
      
      var a1 = document.getElementById('a1');
      // Set the text of the elements.
      a1.innerHTML = data.Answer[0].data;
    });

    httpGetAsync(urlC, function(response){
      var data = JSON.parse(response);
      var cname1 = document.getElementById('cname1');

      cname1.innerHTML = data.Answer[0].data;
    });

    httpPostAsync(urlW, function(response){
      
      try {
        var data = JSON.parse(response);
        var nsW1 = document.getElementById('nsW1');
        var nsW2 = document.getElementById('nsW2');
        var cnameW = document.getElementById('cnameW');

        nsW1.innerHTML = data.nameserver2;
        nsW2.innerHTML = data.nameserver1;
        cnameW.innerHTML = data.wwwRecordCName;

      } catch(e) {
        var nsW1 = document.getElementById('nsW1');
        nsW1.innerHTML = 'Not In Wix';
      };


    });

  });
});
