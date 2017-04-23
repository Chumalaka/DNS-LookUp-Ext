/*var ns1c = document.getElementById('ns1');
var ns2c = document.getElementById('ns2');

var nsW1c = document.getElementById('nsW1');
var nsW2c = document.getElementById('nsW2');*/

document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab so we can extract the url.
  chrome.tabs.getSelected(null, function(tab) {

        
        console.log(createNsObject());
        console.log(ns1 + " " + ns2 + " " + nsW1 + " " + nsW2 + " " );

        if (ns1c.includes(nsW1c) || ns1c.includes(nsW2c)) {
            document.getElementById("ns1").style.color = "magenta";
        };

  });
});