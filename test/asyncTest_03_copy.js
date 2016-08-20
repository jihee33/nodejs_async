
// TODO : 파일 시스템 선언
// TODO : path 선언
// TODO : async 선언
// TODO : 파일 명 선언
var async = require('async');
var path = require('path');
var fs = require('fs');

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

    async.map(strArr, function(word, callback) {
        //process.nextTick(function() { // 병렬일때는 안써도 됨
            var transformed = [];
            transformed.push(word);
            transformed.push(0);
          //  console.log(transformed);
            callback(null, transformed);
    }, function(err, transformed) { //map
        var strMap = new Map(transformed);
        console.log(strMap);
        async.each(strArr, function(word, callback) {
                strMap.set(word, strMap.get(word) + 1);
                callback(null);
        }, function(err) { // each
            var writer = fs.createWriteStream('wordcount_result.txt');
            // var strResult = JSON.stringify(result);
            // writer.write(strResult,function(err) {
            //    console.log("save!"); })
            async.eachSeries(strMap, function(entry, callback) {
                process.nextTick(function() {
                    writer.write(entry[0] + ": " + entry[1] + "\n");
                    callback();
                });
            }, function(err) { //eachSeries
                console.timeEnd('...');
                console.log('result saved!!!');
            })// eachSeries
        });//each
    }); // map
});