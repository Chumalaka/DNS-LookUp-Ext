// Quick function to make an http request.
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

// Quick function to make an http request.
var httpPostSync = function (theUrl, callback) {
    var xmlHttp = new XMLHttpRequest(); // create the http request object

    // Set up an event listener for when the request is returned.
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    // Create the request.
    xmlHttp.open("POST", theUrl, false); // true for asynchronous
    xmlHttp.send(null);
};

var getOldStore = function (win) {
    //var pageNa = [];
    //var ele = [];
    var resultado = {};

    fetch(win.location.href)
        .then(text => text.text())
        .then(pageSource => {
            return pageSource.slice(
                pageSource.indexOf('var publicModel = '),
                pageSource.indexOf('var googleAnalytics')
            )
        })
        .then(clean => clean.slice(18, clean.indexOf(';')))
        .then(JSON.parse)
        .then(obj => Promise.all(
            obj.pageList.pages.map(
                page => {
                    var topo = obj.pageList.topology[0];
                    return fetch(`${topo.baseUrl}${topo.parts.replace('{filename}', page.pageJsonFileName)}`)
                }
            )))
        .then(responses => responses.map(response => response.json()))
        .then(promiseResponses => promiseResponses.map(pr =>
            pr.then(obj => {
                return {
                    'pageName': obj.pageUriSEO,
                    'found': obj.structure.components.map(comp => {
                        oldStoreBlockers = [{
                            label: 'old eCom Component',
                            regex: 'ecommerce'
                        },
                        {
                            label: 'old FAQ',
                            regex: 'faq'
                        },
                        {
                            label: 'old news list',
                            regex: 'news'
                        },
                        {
                            label: 'old list',
                            regex: 'app1'
                        },
                        {
                            label: 'old restaurant menu',
                            regex: 'menu'
                        }
                        ]
                        return oldStoreBlockers.map(blocker => {
                            //console.log(blocker)
                            let regex = new RegExp(blocker.regex);
                            //console.log(regex)
                            let results = comp.styleId.match(regex);
                            if (results) {
                                return `Found ${blocker.label} at x: ${comp.layout.x}, y: ${comp.layout.y}`
                            } else {
                                return ''
                            }
                        })

                    })
                        //filter for empty logs
                        .map(red => red.filter(resp => {
                            return resp.length > 0
                        }))
                        //flatten the array
                        .reduce(
                        (a, b) => a.concat(b)
                        )
                }
            })
                .then(out => {
                    pageNa.push(out.pageName);
                    elem.push(out.found.join() ? out.found.join() : ' is ready for conversion');
                    resultado[out.pageName] = out.found.join() ? out.found.join() : ' is ready for conversion';
                    console.log(pageNa, elem);
                })
        )).then(out => {return resultado})

}