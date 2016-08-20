var async = require('async');


// TODO : 파일 읽기
function readFile(callback) {
    var reader = fs.createReadStream(srcPath);
    var data = '';
    reader.on('data', function(chunk) {
        data += chunk; //바이너리 일수있기때문에 toString 안됨
    });
    reader.on('end', function() {
        console.log('reading completed!!');
        callback(null, data);
    });
    reader.on('error', function() {
        console.log('reading error!!');
        callback('reading error');
    });
}// function readfile

// TODO : 파일 쓰기
function writeFile(data, callback){
    var writer = fs.createWriteStream(destPath);
    writer.write(data);
    callback(null);
} // function writeFile

async.waterfall([readFile, writeFile], function(err){
    if (err) {
        console.log(err);
        return; //if-else 안쓰기 위햄
    }
    console.log('copy completed!');
});

/*var filePath = path.join(__dirname, process.argv[2]); // process.argv[2]
var inputStr = "";

var reader = fs.createReadStream(filePath);
reader.on('data', function(chunk) {
    inputStr += chunk.toString();
});
reader.on('end', function () {
    async.waterfall([
        function (callback) {
           var newFile = process.argv[3];
            callback(null, newFile);
        }, function (nF, callback) {
           var writer = fs.createWriteStream(path.join(__dirname, nF));
            writer.write(inputStr);
            callback(null, 'success');
        }
    ],
        function(err, result){
            console.log(result);
        }
    )
});*/
