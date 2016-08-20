var fs = require('fs');
var async = require('async');
var path = require('path');

var result = '';
var filePath = path.join(__dirname, 'sample.json');

var reader = fs.createReadStream(filePath);

reader.on('data', function(chunk) {
    result += chunk.toString();
});

reader.on('end',function() {
    var arr = JSON.parse(result);
    async.filter(arr, function(item, callback) {
        if(typeof(item) !== 'number') {
            callback(new Error(item + ' is not a number!'));
        } else {
            callback(null, item % 2 === 1);
        }
    }, function(err, results) {
        if(err){
            console.log(err);
        } else {
            async.reduce(results, 0, function(memo, item, done) {
                    done(null, memo + item);
            }, function(err2, result) {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(result);
                }

            });
        }
    });
});


