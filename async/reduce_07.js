var async = require('async');

async.reduce([1,2,3], 1, function(memo, item, callback) {
    // pointless async:
    process.nextTick(function() {
        callback(null, memo + item)
    });
}, function(err, result) {
    console.log(result);
    // result is now equal to the last value of memo, which is 6
});
// 