const puppeteer = require('puppeteer');

let promiseOfOpenBrowser = puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args:["--start-maximized"]//"--no-sandbox", "--headless", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1280,960"
})

promiseOfOpenBrowser
    .then(function() {
        console.log('browser is open');
    })


