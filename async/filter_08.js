var async = require('async');

var arr = [1, 2, 3, 4, 5];
var arr1 = [];

async.filter(arr, function(item, callback){
    if(typeof(item) !== 'number'){
        callback(new Error(item + ' is not a number!'));
    } else {
        callback(null,item % 2 ===1);
    }
},function(err, results){
    if(err){
        console.log(err);
    } else {
        async.reduce(results, 0, function(memo, item, callback) {
            // pointless async:
            process.nextTick(function() {
                callback(null, memo + item)
            });
        }, function(err, result) {
            console.log(result);
            // result is now equal to the last value of memo, which is 6
        });
    }
});
// <-> reject