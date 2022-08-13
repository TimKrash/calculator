// Global variables
const Operators = {
    Add: "+",
    Subtract: "-",
    Multiply: "×",
    Divide: "÷",
    Equals: "=" 
}

let displayQueue = [];
let displayValue = "0";

// Button event listeners
let calcButtons = [...document.querySelectorAll('.button')]; 
let displayScreen = document.querySelector('.display');
let clearButton = document.querySelector('.clear');
let deleteButton = document.querySelector('.delete');

    // Select display top element
let displayTop = document.querySelector('.text.top');
let displayBottom = document.querySelector('.text.bottom');


const add = (a, b) => parseFloat(a) + parseFloat(b);
const subtract = (a, b) => parseFloat(a) - parseFloat(b);
const multiply = (a, b) => parseFloat(a) * parseFloat(b);
const divide = (a, b) => {
    if (b == 0) {
        alert("Hey c'mon, why you tryna divide by 0");
        clearCalculator();
        return null;
    }
    return parseFloat(a) / parseFloat(b);
}

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


const display = (content) => {
    if (displayValue === "0" || !displayValue) {
        displayValue = content;
    } else {
        displayValue += content;
    }

    displayBottom.textContent = displayValue;
}

const queueOperation = (content) => {
    let operator = content;
    switch (operator) {
        case "+":
            operator = Operators.Add;
            break;
        case "-":
            operator = Operators.Subtract;
            break;
        case "&times;":
            operator = Operators.Multiply;
            break;
        case "*":
            operator = Operators.Multiply;
            break;
        case "/":
            operator = Operators.Divide;
            break;
        case "&#247;":
            operator = Operators.Divide;
            break;
        case "=":
            operator = Operators.Equals;
            displayTop.textContent = displayQueue.join(' ');
            break;
        case "Enter":
            operator = Operators.Equals;
            displayTop.textContent = displayQueue.join(' ');
            break; 
    }

    if (!(displayQueue.some(val => Object.values(Operators).includes(val))) && operator === Operators.Equals) {
        return;
    }

    if (displayValue) {
        displayQueue.push(displayValue);
        displayValue = null;
    }

    if (displayQueue.length == 2) {
        displayQueue[1] = operator
    } else {
        displayQueue.push(operator);
    }

    if (displayQueue.length == 4) {
        let initOperator = displayQueue[1];
        let nextOperator = displayQueue[3];
        let numOne = displayQueue[0];
        let numTwo = displayQueue[2];

        let answer = operate(initOperator, numOne, numTwo);
        if (!answer) {
            return;
        }
        if (nextOperator === Operators.Equals) {
            displayTop.textContent = displayQueue.join(' ');
            displayTop.style.opacity = 1;
            displayBottom.textContent = answer;
            displayQueue.splice(0, 4, answer.toString());
        } else {
            displayQueue.splice(0, 3, answer.toString());
            displayTop.textContent = displayQueue.join(' ');
            displayTop.style.opacity = 1;
            displayBottom.textContent = answer;
        }
    } else {
        displayTop.textContent = displayQueue.join(' ');
        displayTop.style.opacity = 1;
        displayBottom.textContent = displayQueue[0];
    }

}

// Clear and delete logic
const clearCalculator = () => {
   displayTop.textContent = null;
   displayBottom.textContent = 0;
   displayQueue = []; 
   displayValue = "0";
}

const deleteEntry = () => {
    if (displayValue === "0" || !displayValue) {
        return;
    }

    displayValue = displayValue.slice(0, -1);
    if (displayValue.length == 0) {
        displayValue = "0";
    }
    displayBottom.textContent = displayValue;
}

// Decimal
const handleDecimal = () => {
    if (!displayValue) {
        displayValue = "0";
    }

    if (displayValue.includes(".")) {
        return;
    }

    displayValue += ".";
    displayBottom.textContent = displayValue;
}

const handleNumberContent = (e) => display(e.target.textContent);
const handleOperatorContent = (e) => queueOperation(e.target.textContent);

let keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
let operationCodes = [13, 56, 191, 187, 189]
let dotCode = [190];
const handleKeyDown = (e) => {
    if (keyCodes.includes(e.which) && !e.shiftKey) {
        display(e.key);
    } else if (operationCodes.includes(e.which)) {
        queueOperation(e.key);
    } else if (dotCode.includes(e.which)) {
        handleDecimal(e.key);
    }
}

// Button event listeners
let numberButtons = calcButtons.filter(button => {
    return button.className.toLowerCase().indexOf("multiply") === -1 &&
    button.className.toLowerCase().indexOf("divide") === -1 && button.className.toLowerCase().indexOf("subtract") === -1 &&
    button.className.toLowerCase().indexOf("add") === -1 && button.className.toLowerCase().indexOf("equals") === -1 &&
    button.className.toLowerCase().indexOf("dot") === -1;
})
let operatorButtons = calcButtons.filter(button => {
    return button.className.includes("multiply") || button.className.includes("divide") ||
    button.className.includes("equals") || button.className.includes("subtract") || button.className.includes("add");
})

let decimalButtons = calcButtons.filter(button => button.className.includes("dot"));

numberButtons.forEach(button => button.addEventListener('click', handleNumberContent));
operatorButtons.forEach(button => button.addEventListener('click', handleOperatorContent));
decimalButtons.forEach(button => button.addEventListener('click', handleDecimal));

clearButton.addEventListener('click', clearCalculator);
deleteButton.addEventListener('click', deleteEntry);

// Keyboard event listeners
window.addEventListener('keydown', handleKeyDown);
