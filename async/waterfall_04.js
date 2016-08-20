var async = require('async');

async.waterfall([
    
    function(cb){
        var a = 10;
        console.log('1');
        cb(null, a);
    },
    function(arg1, cb){
        var b = 20;
        console.log('2');
        cb(null, arg1, b);
    },
    function(arg1, arg2, cb){
        var c = 30;
        console.log('3');
        cb(null,arg1 + arg2 + c);
    }
], function(err, result){
    console.log(result);
});