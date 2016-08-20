var fs = require('fs');
var path = require('path');
var async = require('async');

var filePath = path.join(__dirname, '4300.txt');
var inputStr = "";

var reader = fs.createReadStream(filePath);
reader.on('data', function(chunk) {
    inputStr += chunk.toString();
});
reader.on('end', function () {
    var rexp = /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007FI—]+/g;
    var strArr = inputStr.trim().replace(rexp, '^').split("^").sort();

    console.time('...');

    async.mapSeries(strArr, function(word, callback) {
        process.nextTick(function() {
            var transformed = [];
            transformed.push(word)
            transformed.push(0);
            callback(null, transformed);
        });
    }, function(err, results) {
        var strMap = new Map(results);
        async.eachSeries(strArr, function(word, callback) {
            process.nextTick(function() {
                strMap.set(word, strMap.get(word) + 1);
                callback(null);
            });
        }, function(err) {
            var writer = fs.createWriteStream('wordcount_result.txt');
            async.eachSeries(strMap, function(entry, callback) {
                process.nextTick(function() {
                    writer.write(entry[0] + ": " + entry[1] + "\n");
                    callback();
                });
            }, function(err) {
                console.timeEnd('...');
                console.log('result saved!!!');
            })
        })
    });
});