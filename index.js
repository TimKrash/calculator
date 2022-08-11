const Operators = {
    Add: "+",
    Subtract: "-",
    Multiply: "*",
    Divide: "/" 
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

/**
 * 
 * @param {string} operator 
 * @param {Number} numOne 
 * @param {Number} numTwo 
 */
const operate = (operator, numOne, numTwo) => {
    switch(operator) {
        case Operators.Add:
            return add(numOne, numTwo);
        case Operators.Subtract:
            return subtract(numOne, numTwo);
        case Operators.Multiply:
            return multiply(numOne, numTwo);
        case Operators.Divide:
            return divide(numOne, numTwo);
    }
}

console.log(operate("/", 5, 6));