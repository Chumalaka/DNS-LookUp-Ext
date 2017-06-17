//Function to extract the domain from the url string.
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
    var domain = extractHostname(url);
    var parts = domain.split('.').reverse();
    var cnt = parts.length;
    if (cnt >= 3) {
        // see if the second level domain is a common SLD.
        if (parts[1].match(/^(com|edu|gov|net|mil|org|nom|co|name|info|biz)$/i)) {
            domain = parts[2] + '.' + parts[1] + '.' + parts[0];
            return domain;
        }
    }
    domain = parts[1] + '.' + parts[0];
    return domain;
};

//Function to make an http request. GET Asynchronous
var httpGetAsync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);

};

//Function to make an http request. GET Synchronous
var httpGetSync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("GET", theUrl, false); // true for asynchronous
    xmlHttp.send(null);
};





/*
// Quick function to make an http request.
var httpPostAsync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};
*/

/*
var httpPostAsync2 = function (theUrl, body, callback) {
    var data = JSON.stringify({
        "domain": "josephdscs.com",
        "isAdmin": false
    });

    //var data = "{\"domain\":\"josephdscs.com\",\"isAdmin\":false}"
    console.log("ASYNC func");

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            callback(this.responseText);
        }
    });

    xhr.open("POST", "https://domain-troubleshooter.wix.com/_api/domain-troubleshooter-server/premiumData", true);
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "5729896a-fbfb-ace5-9318-6a044e194b33");

    xhr.send(data);

};
*/

/*var httpPostAsync2 = function (theUrl, body, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object
    //xmlHttp.withCredentials = true;
    console.log("ASYNC func");

    xmlHttp.withCredentials = false;

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("content-type", "application/json");
    xmlHttp.setRequestHeader("cache-control", "no-cache");
    xmlHttp.send(body);

};*/


var httpPostAsync2 = function (theUrl, callback) {
    /*    var data2 = JSON.stringify({
            "domain": "",
            "isAdmin": false
        });*/

    console.log("ASYNC function");

    //var data = "{\"domain\":\"josephdscs.com\",\"isAdmin\":false}";
    var data = JSON.stringify({
        "domain": "josephdscs.com",
        "isAdmin": false
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("POST", "https://domain-troubleshooter.wix.com/_api/domain-troubleshooter-server/premiumData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader( 'Access-Control-Allow-Origin', 'https://www.josephdscs.com');
    //xhr.setRequestHeader("postman-token", "7495a442-ef52-fac9-4575-b229c9bb3042");

    xhr.send(data);
};



// Quick function to make an http request.
/*var httpPostSync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, false); // true for asynchronous
    xmlHttp.send(null);
};*/

/*var httpPostSync2 = function (theUrl, body, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object
    //xmlHttp.withCredentials = true;
    console.log("SYNC func");

    xmlHttp.withCredentials = false;

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, false); // true for asynchronous
    xmlHttp.setRequestHeader("content-type", "application/json");
    xmlHttp.setRequestHeader("cache-control", "no-cache");
    xmlHttp.send(body);

};*/


var httpPostSync2 = function (theUrl, body, callback) {
    var data = JSON.stringify({
        "domain": "josephdscs.com",
        "isAdmin": false
    });
    console.log("SYNC func");

    //var data = "{\"domain\":\"josephdscs.com\",\"isAdmin\":false}"

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
            callback(this.responseText);
        }
    });

    xhr.open("POST", "https://domain-troubleshooter.wix.com/_api/domain-troubleshooter-server/premiumData", false);
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader("cache-control", "no-cache");
    //xhr.setRequestHeader("postman-token", "5729896a-fbfb-ace5-9318-6a044e194b33");

    xhr.send(data);

};




/*
if (element.includes(":")) {
    var ele = element.split(":");
    console.log(ele[0] +' : '+ ele[1]);
} else {
    
}

check

function showme(element, index, array) {

	if (element.includes(":")) {
    var ele = element.split(":");
    console.log(ele[0] +' : '+ ele[1]);
} else {
    
}
}

function checkme (str) {
    var arr = str.split("\n");
    arr.forEach(showme);
}*/