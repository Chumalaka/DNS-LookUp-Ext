document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab so we can extract the url.
  chrome.tabs.getSelected(null, function(tab) {
    var domainUrlNs = extractRootDomain(tab.url);
    var domainUrlC = extractHostname(tab.url);
    // The url we will be making the GET request to.
    var urlNS = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/ns'; 
    // The url we will be making the GET request to.
    var urlA = 'http://www.dns-lg.com/ch03/' + domainUrlNs + '/a';
    var urlC = 'http://www.dns-lg.com/ch03/' + domainUrlC + '/cname';
    //var urlMc = 'http://www.dns-lg.com/ch03/' + domainUrlA + '/cname'; 
    
    
    //console.log(urlNS);
    //console.log(urlA);
    httpGetAsync(urlNS, function(response){
      var data = JSON.parse(response);

      // Get the DOM elements.
      //var tabUrl = document.getElementById('tab');
      //var domain = document.getElementById('domain');
      var ns1 = document.getElementById('ns1');
      var ns2 = document.getElementById('ns2');
      //var urlT = document.getElementById('url');

      // Set the text of the elements.
      //tabUrl.innerHTML = tab.url;
      //domain.innerHTML = data.question[0].name;
      ns1.innerHTML = data.answer[0].rdata;
      ns2.innerHTML = data.answer[1].rdata;

      //domain.innerHTML = data.city + ", " + data.region + ", " + data.country;
      //urlT.innerHTML = urlNS;
    });

    //console.log(url);
    httpGetAsync(urlA, function(response){
      var data = JSON.parse(response);

      // Get the DOM elements.
      var tabUrl = document.getElementById('tab');
      //var domain = document.getElementById('domain');
      var a1 = document.getElementById('a1');
      //var a2 = document.getElementById('a2');
      //var urlT = document.getElementById('url');

      // Set the text of the elements.
      tabUrl.innerHTML = domainUrlC;
      //domain.innerHTML = data.question[0].name;
      a1.innerHTML = data.answer[0].rdata;
      //a2.innerHTML = data.answer[1].rdata;

      //domain.innerHTML = data.city + ", " + data.region + ", " + data.country;
      //urlT.innerHTML = url;
    });

    httpGetAsync(urlC, function(response){
      var data = JSON.parse(response);
      
      var cname1 = document.getElementById('cname1');

      cname1.innerHTML = data.answer[0].rdata;
    });
  });
});
