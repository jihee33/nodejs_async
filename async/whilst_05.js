var async = require('async');

var count = 0;
async.whilst(
    function() {
        return count < 5;
    }, // true면 아래 실행
    function(callback) {
        count++;
        setTimeout(function() {
            callback(null, count);
        }, 1000);
    },
    function (err, n) {
        console.log(n);
        // 5 seconds have passed, n = 5
    }// 비동기에서 루프가 필요하다면 스는 것 마지막 
);