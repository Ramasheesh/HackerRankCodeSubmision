const fs = require('fs');


// resolved/fullfill rejected error

console.log('before');
//synchronous working
// let data = fs.readFileSync('f1.txt');
// console.log(data+" ");

// // async wokring
// fs.readFile('f1.txt',cb);
// function cb(err,data) {
//     if (err) {
//         console.log(err);
//     }else console.log(data+"");
// }

//promise working
let PromiseToRead = fs.promises.readFile('f1.txt'); // state will be in pending state
console.log('PromiseToRead: ', PromiseToRead);
PromiseToRead.then(PromiseDone);
PromiseToRead.catch(promiseRejected);

console.log('after');

function PromiseDone(data) {
    console.log("Promise full field");
    console.log(data+"");
}
function promiseRejected(err) {
    console.log("Promise rejected");
    console.log(err);
}

