// let cTab;
// function waitAndClick(algoBtnSelector){
//     let slePromise = new Promise(function(reso,rej){
//         let waitForSelectorPromise = cTab.waitForSelector(algoBtnSelector);
//         waitForSelectorPromise
//         .then(function(){
//             let clickOnPromise = cTab.click(algoBtnSelector);
//             return clickOnPromise;
//         })
//         .then(function(){
//             reso();
//         }) 
//         .catch(function(err){
//             console.log("Error is: ",err);
//         })
//     });
//     return slePromise;
// }

// module.exports = {
//     waitAndClick
// }