document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab so we can extract the url.
  chrome.tabs.getSelected(null, function(tab) {
    var domainUrlNs = extractRootDomain(tab.url);
    var domainUrlC = extractHostname(tab.url);
    // The urls we will be making the GET request to.
    var urlNS = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/ns';
    var urlA = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/a';
    var urlC = 'http://www.dns-lg.com/ch03/' + domainUrlC + '/cname';
    
    //console.log(urlNS);
    //console.log(urlA);
    httpGetAsync(urlNS, function(response){
      var data = JSON.parse(response);

      // Get the DOM elements.
      var ns1 = document.getElementById('ns1');
      var ns2 = document.getElementById('ns2');
      //var urlT = document.getElementById('url');

      // Set the text of the elements.
      ns1.innerHTML = data.answer[0].rdata;
      ns2.innerHTML = data.answer[1].rdata;

    });

    //console.log(url);
    httpGetAsync(urlA, function(response){
      var data = JSON.parse(response);
      // Get the DOM elements.
      var tabUrl = document.getElementById('tab');
      tabUrl.innerHTML = domainUrlC;

      var a1 = document.getElementById('a1');
      // Set the text of the elements.
      a1.innerHTML = data.answer[0].rdata;
    });

    httpGetAsync(urlC, function(response){
      var data = JSON.parse(response);
      var cname1 = document.getElementById('cname1');

      cname1.innerHTML = data.answer[0].rdata;
    });
  });
});
