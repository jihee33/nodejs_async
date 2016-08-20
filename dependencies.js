var uuid = require('uuid');
var mime = require('mime');

console.log(uuid.v4());
console.log(mime.lookup(__filename));