const assert = require('assert').strict;

function truncate(value, precision) {
    var step = Math.pow(10, precision || 0);
    var temp = Math.trunc(step * value);
    return temp / step;
}
function format(inputValue, precision = 2, deciDiv = ",", thousandsDiv = ".", roundValue = true) {
    let workingValue = inputValue;
    const currencyFormat = ( deciDiv.concat(thousandsDiv) === ".," ) ? "en-GB" : "de-DE"

    if(inputValue === undefined) {
        return "0,00"
    }    
    if(typeof inputValue === "string") {
        workingValue = parseFloat(inputValue)
    }
    if(!roundValue) {
        return truncate(workingValue, precision).toLocaleString(currencyFormat)
    }
    let fixedValue = workingValue.toFixed(precision)
    return parseFloat(fixedValue).toLocaleString( currencyFormat, { minimumFractionDigits: precision } )
}

assert.equal("0,00", format(undefined));
assert.equal("2,56", format(2.555));
assert.equal("10.000,556", format(10000.5555, 3));
assert.equal("100.000,28", format(100000.28374, 2, ",", "."));
assert.equal("100,000.6", format(100000.55555, 1, ".", ","));
assert.equal("1,5550000000", format(1.555, 10, ",", "."));
assert.equal("-1,5555", format(-1.55555, 4));
assert.equal("-1,5555", format("-1.55555", 4));
assert.equal("1,555", format(1.55555, 3, ",", ".", false));
assert.equal("1,56", format("1.5555", 2
