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

/**
 * 
 * @param {Event} e 
 */
const display = (e) => {
    if (displayValue === "0" || !displayValue) {
        displayValue = e.target.textContent;
    } else {
        displayValue += e.target.textContent;
    }

    displayBottom.textContent = displayValue;
}

const queueOperation = (e) => {
    let operator = e.target.textContent;
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
        case "&#247;":
            operator = Operators.Divide;
            break;
        case "=":
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
            displayBottom.textContent = answer;
            displayQueue.splice(0, 4, answer.toString());
        } else {
            displayQueue.splice(0, 3, answer.toString());
            displayTop.textContent = displayQueue.join(' ');
            displayBottom.textContent = answer;
        }
    } else {
        displayTop.textContent = displayQueue.join(' ');
        displayBottom.textContent = displayQueue[0];
    }

}

// Clear and delete logic
const clearCalculator = () => {
   displayTop.textContent = null;
   displayBottom.textContent = 0;
   displayQueue = []; 
   displayValue = 0;
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
const handleDecimal = (e) => {
    if (!displayValue) {
        displayValue = "0";
    }

    if (displayValue.includes(".")) {
        return;
    }

    displayValue += ".";
    displayBottom.textContent = displayValue;
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

numberButtons.forEach(button => button.addEventListener('click', display));
operatorButtons.forEach(button => button.addEventListener('click', queueOperation));
decimalButtons.forEach(button => button.addEventListener('click', handleDecimal));

clearButton.addEventListener('click', clearCalculator);
deleteButton.addEventListener('click', deleteEntry);
