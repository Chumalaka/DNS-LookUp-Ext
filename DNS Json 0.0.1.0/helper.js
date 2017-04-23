// Quick function to make an http request.
var httpGetAsync = function(theUrl, callback){
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

// Quick function to make an http request.
var httpPostAsync = function(theUrl, callback){
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

// Quick function to extract the domain from the url string.
var extractHostname = function (url) {
    var domain;
    //console.log(url);
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number if there is one
    domain = domain.split(':')[0];

    return domain;
};


// to address those who want the "root domain"
var extractRootDomain = function (url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
    }
    return domain;
};