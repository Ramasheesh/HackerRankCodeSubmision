const puppeteer = require('puppeteer');
require('dotenv').config()
let email = process.env.EMAIL;
let password = process.env.PASSWORD;
let cTab;
let promiseOfOpenBrowser = puppeteer.launch({
    headless:false, // true
    defaultViewport:null,
    args:["--start-maximized"],//"--no-sandbox", "--headless", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1280,960"
    // executablePath:'C:\Program Files\Google\Chrome\Application\chrome.exe',

});

promiseOfOpenBrowser
    .then(function(browser) {
        console.log('browser is open');
        // console.log('Browser: ',browser);
        let allTabPromise = browser.pages();
        return allTabPromise;
    
    })
    .then(function (allTabsArr) {
        cTab = allTabsArr[0];
        console.log('New Tab');
        let visitingLoginPasePromise = cTab.goto("https://www.hackerrank.com/auth/login");
        return visitingLoginPasePromise;
    })
    .then(function() {
        console.log("Hacker Rank Login page Opened");
        let emailWiilBeTypedPromise = cTab.type("input[name=username]", email);
        return emailWiilBeTypedPromise;
    })
    .then(function(){
        console.log("Email typing compleated");
        let passwordWillBeTypedPromise = cTab.type("input[name=password]", password)
        return passwordWillBeTypedPromise;
    })
    .then(function(){
        console.log("Password typing compleated");
        let hkLoginPromise = cTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
        return hkLoginPromise;
    })
    .then(function(){
        console.log('Hacker Rank login successfully');
    })
    .catch(function(err){
        console.log("erroe is: ",err);
    })


