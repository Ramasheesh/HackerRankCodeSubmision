const puppeteer = require('puppeteer');
require('dotenv').config();
const {answers} = require('./code')
let email = process.env.EMAIL;
let password = process.env.PASSWORD;
let cTab; // current Tab


let promiseOfOpenBrowser = puppeteer.launch({
    headless:false, // true
    defaultViewport:null,
    args:["--no-sandbox"],//"--no-sandbox","--start-maximized", "--headless", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1280,960"
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
        let emailWiilBeTypedPromise = cTab.type("input[name=username]", email ,{delay:100});
        return emailWiilBeTypedPromise;
    })
    .then(function(){
        console.log("Email typing compleated");
        let passwordWillBeTypedPromise = cTab.type("input[name=password]", password ,{delay:100});
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
        // console.log('linkArr: ', linkArr);
        // solved question
        let quesSoleverPromise = questionSolver(linkArr[0],0);
        for (let i = 1; i < linkArr.length; i++) {
            quesSoleverPromise = quesSoleverPromise.then(function () {
                return questionSolver(linkArr[i],i , {delay:1000});
            })
            //a=10-> a=a+1
        }
    })
    .then(function(){
        console.log("qsn solved ");
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
            // console.log("algo btn clicked");
            reso();
            
        }) 
        .catch(function(err){
            rej(err)
        })
    });
    return slePromise;
}

// url = question 
// ind = answer
function questionSolver(url, idx) {
    return new Promise(function(resolve,reject){
        let fullLink = `https://www.hackerrank.com/${url}`;
        let linkQuesnPromise = cTab.goto(fullLink);
        linkQuesnPromise
        .then(function(){
            console.log('Question oppend');
            // trick the custom input
            let waitForCheckBoxClickPromise = waitAndClick('.checkbox-input');
            return waitForCheckBoxClickPromise;
        })
        .then(function(){
            // select the box there code will be typed
            let waitForTextBoxPromise = waitAndClick('.custominput');// , {delay:100}
            return waitForTextBoxPromise;
        })
        .then(function(){
            let codeTypeInCustomBox = cTab.type('.custominput',answers[idx] ,{delay:20});
            return codeTypeInCustomBox;
        })
        .then(function(){
            let pressControlKeyPromise = cTab.keyboard.press('Control');
            let selAllKeyPromise = cTab.keyboard.press('A');
            let c =  pressControlKeyPromise+selAllKeyPromise;
            return c;
        })
        // .then(function(){
        //     let selAllKeyPromise = cTab.keyboard.press('A');
        //     return selAllKeyPromise;
        // })
        .then(function(){
            let selXKeyPromise = cTab.keyboard.press('X');
            return selXKeyPromise;
        })

        .then(function(){
            let upControl = cTab.keyboard.up('Control');
            return upControl;
        })
        .then(function(){
            return waitAndClick('.monaco-editor.no-user-select.vs');
        })
        .then(function(){
            let pressControlKeyPromise = cTab.keyboard.press('Control');
            let selAllKeyPromise = cTab.keyboard.press('A');
            let c =  pressControlKeyPromise+selAllKeyPromise;
            return c;
        })
        .then(function(){
            let pasteVKeyPressPromise = cTab.keyboard.press('V',{delay:3000});
            return pasteVKeyPressPromise;
        })
        .then(function(){
            let downControlKeyPromise = cTab.keyboard.up('Control');
            return downControlKeyPromise;
        })
        .then(function(){
            let clickSubmitBtnPromiise = waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled' );
            return clickSubmitBtnPromiise;
        }).then(function(){
            console.log('Code Submitted successfully');
            resolve();
        })
        .catch(function(err){
            reject(err);
        })
})}
