

let mypromise = new Promise(function(reso,reject){
    let num1 = 1;
    let num2 = 1;
    let result = num1 + num2;
    if(result == 2){
        reso("Value of sum is: 2 ");
    }else{
        reject("Error");
    }

});
mypromise.then(function(data) {console.log('data: ',data);});

mypromise.catch(function(err){
    console.log('error from catch side: ',err);
})