var async = require('async');

var arr = [1, 2, "a", 4, 5];

// collection 제공
// each[병렬] or eachSeries[직렬]
async.each(arr, function(item, callback){
    if(typeof(item) !== 'number'){
        callback(new Error(item + ' is not a number!'));
    } else {
        console.log(item);
        callback();
    }
},function(err){
    if(err){
        console.log(err);
    } else {
        console.log('Completed!');
    }
});
//첫번째 객체는 배열이나 리터럴 반복되는 객체
// async.each(collection, iteratorFn, doneCallback);

// series(tasks_함수배열, doneCallback);
