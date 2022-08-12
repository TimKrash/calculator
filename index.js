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


const add = (a, b) => parseInt(a) + parseInt(b);
const subtract = (a, b) => parseInt(a) - parseInt(b);
const multiply = (a, b) => parseInt(a) * parseInt(b);
const divide = (a, b) => parseInt(a) / parseInt(b);

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

    let displayScreenValue = displayScreen.querySelector('.text.bottom');
    displayScreenValue.textContent = displayValue;
}

const queueOperation = (e) => {
    // Select display top element
    let displayTop = document.querySelector('.text.top');
    let displayBottom = document.querySelector('.text.bottom');

    // Push existing display value to queue and then set to null
    if (displayValue) {
        displayQueue.push(displayValue);
        displayValue = null;
    }

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
            break;
    }

    if (displayQueue.length == 2) {
        displayQueue[1] = operator
    } else {
        displayQueue.push(operator);
    }

    if (displayQueue.length == 4) {
        let slicedArr = displayQueue.slice(0, 3);
        let answer = operate(slicedArr[1], slicedArr[0], slicedArr[2]);
        displayQueue.splice(0, 3, answer.toString());
    }
    displayBottom.textContent = displayQueue[0];
    displayTop.textContent = displayQueue.join(' ');

    displayTop.textContent = displayTop.textContent.replace("*", "&times;");
    displayTop.textContent = displayTop.textContent.replace("/", "&#247;");
}

// Button event listeners
let numberButtons = calcButtons.filter(button => {
    return button.className.toLowerCase().indexOf("multiply") === -1 &&
    button.className.toLowerCase().indexOf("divide") === -1 && button.className.toLowerCase().indexOf("subtract") === -1 &&
    button.className.toLowerCase().indexOf("add") === -1 && button.className.toLowerCase().indexOf("equals") === -1;
})
let operatorButtons = calcButtons.filter(button => {
    return button.className.includes("multiply") || button.className.includes("divide") ||
    button.className.includes("equals") || button.className.includes("subtract") || button.className.includes("add");
})

numberButtons.forEach(button => button.addEventListener('click', display));
operatorButtons.forEach(button => button.addEventListener('click', queueOperation));
