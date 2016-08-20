var fs = require('fs');
var path =require('path');

srcPath = path.join(__dirname, 'contact.json');
    //('contact.json' !== undefined) ? path.join(__dirname, 'contact.json') : __filename;

function readFile() {
    return new Promise(function (resolve, reject) {
        var reader =  fs.createReadStream(srcPath);
        var data = '';
        reader.on('data', function(chunk) {
            data += chunk;
        });
        reader.on('end', function() {
            data = JSON.parse(data); // 추후수정
            resolve(data);
        });
        reader.on('error', function() {
            reject('readFile error...');
        });
    });
}

function writeName(value) {
    return new Promise(function (resolve, reject) {
        if (value.name !== undefined) {
            console.log('이름 : ' + value.name);
            resolve(value);
        } else {
            reject('이름 없다.');
        }
    });
}
function writeAge(value) {
    console.log('나이 : ' + value.age);
    return value;
}
function writeGender(value) {
    console.log('성별 : ' + value.gender);
    return value;
}
function writePhone(value) { // 동기 함수
    console.log('전화 : ' + value.phone);
   // return value;
}

readFile()
.then(writeName)
.then(writeAge)
.then(writeGender)
.then(writePhone)
.then(function() {
    console.log('success');
}).catch(function(reason) {
    console.log(reason);
});