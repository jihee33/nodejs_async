var async = require('async');
var uuid = require('uuid');

var arr = [];


async.waterfall([
    function(callback){
        for(var i = 0; i < 5; i++) {    
            // for문은 io함수 사용시 사용하지 않기 비동기라 순서제어 ㄴㄴ
            arr[i] = Math.floor(Math.random()*10) + 1;
        }
        callback(null, arr);
    },
    function(arr, callback2){
        async.map(arr, function(item, done){
            if(typeof(item) !== 'number'){
                done(new Error(item + ' is not a number!'));
            } else {
                var arr2 = {};
                arr2[uuid.v4()] = item;
                 done(null, arr2);
            }
        },function(err, result){
            if(err){
                callback2(err);
            } else {
               callback2(null, result);
            }
        });
    }
], function(err, result){
    if(err){
        console.log(err);
    } else {
        console.log(result);
    }
});