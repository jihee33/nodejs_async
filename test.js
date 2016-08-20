var async = require('async');
var path = require('path');
var fs = require('fs');
var jsonPath = path.join(__dirname, '4300.txt');

var result = "";
var reader = fs.createReadStream(jsonPath);

reader.on('data', function(chunk) {
    result += chunk.toString();
});

reader.on('end', function(){
    var re = /[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F-]+/g;
    var arrayOfResult = result.trim().replace(re, '^^').split('^^').sort();

    console.log(arrayOfResult);

    var count = 0;
    var resultObj = [];

    async.whilst(
        function() { return count < arrayOfResult.length; },
        function(callback) {
            var word = arrayOfResult[count];



          /*  if(typeof(resultObj[word])==='undefined'){
                resultObj[word] = 1;
                count++;
                process.nextTick(function() {
                    callback(null, resultObj);
                });
            } else {
                resultObj[word]++;
                count++;
                process.nextTick(function() {
                    callback(null, resultObj);
                });
            }*/
        },
        function(err, result) {
            console.log(result);
        }
    );



});

