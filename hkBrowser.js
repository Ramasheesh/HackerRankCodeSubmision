const puppeteer = require('puppeteer');
require('dotenv').config();
// const myPromise = require('./common/promiseFunctions');
let email = process.env.EMAIL;
let password = process.env.PASSWORD;
let cTab; // current Tab


let promiseOfOpenBrowser = puppeteer.launch({
    headless:false, // true
    defaultViewport:null,
    args:["--start-maximized"],//"--no-sandbox", "--headless", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1280,960"
    // executablePath:'C:\Program Files\Google\Chrome\Application\chrome.exe',

});

// chaning of promises
promiseOfOpenBrowser //fullfil
    .then(function(browser) {
        // console.log('browser: ', browser);
        console.log('browser is open');
        let allTabPromise = browser.pages();
        return allTabPromise;
    
    }).then(function (allTabsArr) {
        cTab = allTabsArr[0];
        console.log('New Tab');
        let visitingLoginPasePromise = cTab.goto("https://www.hackerrank.com/auth/login");
        return visitingLoginPasePromise;
    }).then(function() { // response of http
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
        let algorithmsTabPromise = waitAndClick('div[data-automation="algorithms"]');
        return algorithmsTabPromise;
    })
    .then(function(){
        console.log("Algorithms page is oppend");
        let allQuesnPromise = cTab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]');
        return allQuesnPromise;
    })
    .then(function(){
        // console.log('all question list gotted');
        function getAllQuesLinks() {
            let allLinkArr = document.querySelectorAll('a[data-analytics="ChallengeListChallengeName"]');
            let linkArr = [];
            for (let i = 0; i < allLinkArr.length; i++) {
                linkArr.push(allLinkArr[i].getAttribute('href'));                
            }
            return linkArr;
        }
        let linkArrPromise = cTab.evaluate(getAllQuesLinks);
        return linkArrPromise;
    })
    .then(function(linkArr){
        console.log('links of all question received');
        console.log('linkArr: ', linkArr);
        // solved question
    })
    .catch(function(err){
        console.log("erroe is: ",err);
    })
function waitAndClick(algoBtnSelector){
    let slePromise = new Promise(function(reso,rej){
        let waitForSelectorPromise = cTab.waitForSelector(algoBtnSelector);
        waitForSelectorPromise
        .then(function(){
            let clickOnPromise = cTab.click(algoBtnSelector);
            return clickOnPromise;
        })
        .then(function(){
            console.log("algo btn clicked");
            reso();
            
        }) 
        .catch(function(err){
            console.log("Error is: ",err);
        })
    });
    return slePromise;
}

