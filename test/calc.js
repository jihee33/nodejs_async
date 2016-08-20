function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x, y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function sum(var_args){
    var result = 0;
    for (var i = 0; i < var_args.length; i++)
        result += var_args[i];
    return result;
}

module.exports.add = add;
module.exports.subtract = subtract;
module.exports.multiply = multiply;
module.exports.divide = divide;
module.exports.sum = sum;