var async = require('async');

var arr = [1, 2, 3, 4, 5];

async.map(arr, function(item, callback){
    if(typeof(item) !== 'number'){
        callback(new Error(item + ' is not a number!'));
    } else {
        callback(null, {'category' :item % 2, 'value' : item});
    }
},function(err, results){
    if(err){
        console.log(err);
    } else {
        console.log(results);
    }
});
// 구조는 each와 동일
// 자동 데이터 분류
// 카테고리 구성 / 기존의 원소에 태그를 달아줌