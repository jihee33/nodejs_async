var async = require('async');

var x = 0;

// collection 제공
// 순서 
async.series([
    function(cb){
        var result = ++x;
        console.log(result);
        cb(null, result);
    },
    function(cb){
        var result = ++x;
        console.log(result);
        cb(new Error('그냥 에러'));
        // cb(null, result);
    },
    function(cb){
        var result = ++x;
        console.log(result);
        cb(null, result);
    }
],
function(err, result){
    if(err) {
        console.log(err);
    } else {
        console.log(result);
    }
});