// Known Bugs: 
//          Parenthesis after previous answer does not ignore the previous answer
//          Enter button pressed presses the last button clicked on by the mouse

const INITIAL_DISPLAY_VALUE = "0";
let expressionArray = [];
let answer;
let previousAnswer = false;

let buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
let displayValue = '';

updateDisplay(INITIAL_DISPLAY_VALUE);

buttonPressHandler();   

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function modulo(num1, num2) {
    return num1 % num2;
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    }
    else if (operator === "-") {
        return subtract(num1, num2);
    }
    else if (operator === "*") {
        return multiply(num1, num2);
    }
    else if (operator === "/") {
        return divide(num1, num2);
    }
    else if (operator === "%") {
        return modulo(num1, num2);
    }
    else {
        return "error";
    }
}

function updateDisplay(value) {
    const display = document.querySelector(".display");
    const MAX_DISPLAY_SIZE = 11;
    value = value.toString();

    if (isNaN(value)) {
        display.textContent = value;
    }
    else if (value.length < MAX_DISPLAY_SIZE) {
        display.textContent = value;
    }
    else {
        display.textContent = Number(value).toPrecision(MAX_DISPLAY_SIZE);
    }
}

function buttonPressHandler() {
    for (button of buttons) {
        button.addEventListener("click", buttonPressFunction);
        button.addEventListener("keydown", buttonPressFunction);
    }
}

function buttonPressFunction (e) {
    let buttonItem;

    if (e.type === "click") { // for clicked input
        buttonItem = e.target.textContent;
    }

    // keyboard reading
    else if (e.type === "keydown") {
        if (e.shiftKey) { // shift key pressed5
            if (e.code === "Equal") {
                buttonItem = "+";
            }
            else if (e.code === "Digit8") {
                buttonItem = "*";
            }
            else if (e.code === "Digit9") {
                buttonItem = "(";
            }
            else if (e.code === "Digit0") {
                buttonItem = ")";
            }
            else if (e.code === "Digit5") {
                buttonItem = "%";
            }
            else if (e.code === "KeyC" || e.code === "Backspace") {
                buttonItem = "C";
            }
            else {
                console.log("invalid key");
                return;
            }
    
        }
        else if (e.code === "Slash") { // shift key not pressed
            buttonItem = "/";
        }
        else if (e.code === "KeyC" || e.code === "Backspace") {
            buttonItem = "C";
        }
        else if (e.code === "Digit0") {
            buttonItem = "0";
        }
        else if (e.code === "Minus") {
            buttonItem = "-";
        }
        else if (e.code === "Equal") {
            buttonItem = "="
        }
        else if (e.code === "Period") {
            buttonItem = ".";
        }
        else if (e.code === "Digit1") {
            buttonItem = "1";
        }
        else if (e.code === "Digit2") {
            buttonItem = "2";
        }
        else if (e.code === "Digit3") {
            buttonItem = "3";
        }
        else if (e.code === "Digit4") {
            buttonItem = "4";
        }
        else if (e.code === "Digit5") {
            buttonItem = "5";
        }
        else if (e.code === "Digit6") {
            buttonItem = "6";
        }
        else if (e.code === "Digit7") {
            buttonItem = "7";
        }
        else if (e.code === "Digit8") {
            buttonItem = "8";
        }
        else if (e.code === "Digit9") {
            buttonItem = "9";
        }
        else {
            console.log("invalid key");
            return;
        }
    }
    
    

    // If user presses clear button, clear the display, answer, and expression array 
    if (buttonItem === 'C') {
        display.classList.add("display-animation");
        expressionArray = [];
        updateDisplay(INITIAL_DISPLAY_VALUE);
        displayValue = '';
        answer = null;
        setTimeout(function() {
            display.classList.remove("display-animation");
        }, 500);
    }

    // If the user presses an operator button, update the array and display value
    else if (isNaN(buttonItem) && buttonItem != ".") {
        if (true) { // if there is already a display value
            if (!isNaN(displayValue)) { // and if that display value is a number
                expressionArray.push(displayValue); // add that number to the expression array
            }
            if (buttonItem === '=') {
                display.classList.add("display-animation");
                answer = calculateArrayExpression(expressionArray);
                expressionArray = [];
                setTimeout(function() {
                    display.classList.remove("display-animation");
                }, 500);
            }
            else {
                expressionArray.push(buttonItem);
            }
            
        }
        if (answer != null) {
            updateDisplay(answer);
            displayValue = answer;
            answer = null;
            previousAnswer = true; 
        }
        
        else {
            displayValue = buttonItem;
            updateDisplay(displayValue);
        }
        
    }

    // If the user presses a numeric button, update the display
    else {
        if (isNaN(displayValue)) {
            displayValue = '';
        }
        // first check if the display value is the answer to the previous calculation
        if (previousAnswer) {
            displayValue = buttonItem
            previousAnswer = false;
            updateDisplay(displayValue);
        }
        // if it is, replace it entirely with the button item. 
        else {
            if (buttonItem === ".") {
                if (!displayValue.includes(".")) { // if the display doesnt already have a "."
                    displayValue += buttonItem;
                    updateDisplay(displayValue);
                }
            }
            else {
                displayValue += buttonItem;
                updateDisplay(displayValue);
            }
            
        }
        
    }
}

function calculateArrayExpression(array){

    const TIMEOUT = 100; 
    for (let i = 0; i <= TIMEOUT; i++) {
        if (i === TIMEOUT) {
            console.log("calculateArrayExpression timeout reached.");
        }

        if (array.includes("(") || array.includes(")")) {

            // remove extraneous parenthesis
            // red flags: missing "(", extra ")"
            //            missing ")", extra "("
            //            parenthesisStart > parenthesisEnd ----- parenthesis out of order, remove both parenthesis. 
            if (array.indexOf("(") === -1) {
                array.splice(array.indexOf(")"), 1); // remove ")"
                continue;
            }
            else if (array.indexOf(")") === -1) {
                array.splice(array.indexOf("("), 1); // remove "("
                continue;
            }
            else if (array.indexOf("(") > array.indexOf(")")) {
                array.splice(array.indexOf(")"), 1); // remove ")"
                array.splice(array.indexOf("("), 1); // remove "("
                continue;
            }

            let parenthesisStart = array.lastIndexOf("(");
            let parenthesisEnd = array.slice(parenthesisStart).indexOf(")") + parenthesisStart;
            let subArray = array.slice(parenthesisStart + 1, parenthesisEnd);
            let subAnswer = calculateArrayExpression(subArray);
            array.splice(parenthesisStart, subArray.length + 2, subAnswer);
        }
        // if no parenthesis exist, trim the array of extraneous operators, and calculate
        else {
            let trimmedArray = trimArray(array);
            return calculateTrimmedArray(trimmedArray);
        }
    }
    
}

function trimArray(array) {
    let firstNumberIndex = -1;
    let lastNumberIndex = -1;
    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i]) && !(array[i] === "")) {
            firstNumberIndex = i; 
            break;
        }
    }
    for (let i = array.length - 1; i >= 0; i--) { // read the array backwards
        if (!isNaN(array[i]) && !(array[i] === "")) {
            lastNumberIndex = i; 
            break;
        }
    }
    let trimmedArray = array.slice(firstNumberIndex, lastNumberIndex + 1);
    for (let i = 0; i < trimmedArray.length; i++) {
        if (isNaN(trimmedArray[i])) {
            if (isNaN(trimmedArray[i + 1])) {
                trimmedArray.splice(i, 1); // remove 1 element at index i
                i--; // don't skip the shifted array element
            }
        }
    }
    return trimmedArray;
}

function calculateTrimmedArray(array) {
    while (array.indexOf("*") !== -1 || array.indexOf("/") !== -1 || array.indexOf("%") !== -1) { 
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "*" || array[i] === "/" || array[i] === "%") {
                array[i] = operate(array[i - 1], array[i], array[i + 1]); // replace operator with answer
                array.splice(i - 1, 1); // remove preceeding number
                array.splice(i, 1); // remove following number
            }
        }
    }
    while (array.indexOf("+") !== -1 || array.indexOf("-") !== -1) {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "+" || array[i] === "-") {
                array[i] = operate(array[i - 1], array[i], array[i + 1]); // replace operator with answer
                array.splice(i - 1, 1); // remove preceeding number
                array.splice(i, 1); // remove following number
            }
        }
    }
    return array[0];
}