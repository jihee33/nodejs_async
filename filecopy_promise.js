// ECMA 6일때 promise를 쓸 수 있음
var fs = require('fs');
var path =require('path');

srcPath = (process.argv[2] !== undefined) ? path.join(__dirname, process.argv[2]) : __filename;
var destPath = process.argv[3] || (srcPath + '.copy');

function readFile() {
    return new Promise(function (resolve, reject) {
        var reader =  fs.createReadStream(srcPath);
        var data = '';
        reader.on('data', function(chunk) {
            data += chunk;
        });
        reader.on('end', function() {
            resolve(data);
        });
        reader.on('error', function() {
            reject('readable stream error....');
        });
    });
}

function writeFile(value) {
    return new Promise(function (resolve, reject) {
        var writer = fs.createWriteStream(destPath);
        writer.on('finish', function () {
            resolve('copy completed!!');
        });
        writer.on('error', function () {
            reject('writer stream error....');
        });
        writer.write(value);
        writer.end(); // flushing...  all & close =>finish event
    });
}

readFile() // 성공하면 resolve에 의해 then이 호출
.then(writeFile)
.then(function(value) { // resolve
        console.log(value);
}).catch(function(reason) { // reject
    console.log(reason);
});


 /*
}, function(reason) { // reject
    console.log(reason);
});*/

/* OR
읽고     쓰고
promise.then(   // then은 다시 promise객체를 만듬
    function(value) { // resolve
        console.log(value.toString());
    }).then(null, function(reason) { // reject
        console.log(reason);
    });*/

/* OR
 promise.then(
 function(value) { // resolve
 console.log(value.toString());
 }).catch(function(reason) { // catch
 console.log(reason);
 });*/
