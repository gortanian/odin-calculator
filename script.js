// TODO: 
//      Handle keyboard input

const INITIAL_DISPLAY_VALUE = "0";

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
    // initialize the expression array (is this the right place to initialize? scope issues maybe)
    let expressionArray = [];
    let answer;
    let previousAnswer = false;

    // update the display when a button is pressed
    let buttons = document.querySelectorAll("button");
    const display = document.querySelector(".display");
    let displayValue = '';
    for (button of buttons) {
        button.addEventListener("click", function (e) {
            let buttonItem = e.target.textContent;

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
        })
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