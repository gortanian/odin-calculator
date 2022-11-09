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
    else {
        return "error";
    }
}

function updateDisplay(value) {
    const display = document.querySelector(".display");
    display.textContent = value;
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
                expressionArray = [];
                updateDisplay(INITIAL_DISPLAY_VALUE);
                displayValue = '';
                answer = null;
            }

            // If the user presses an operator button, update the array and display value
            else if (isNaN(buttonItem)) {
                if (displayValue !== '') { // if there is already a display value
                    if (!isNaN(displayValue)) { // and if that display value is a number
                        expressionArray.push(displayValue); // add that number to the expression array
                    }
                    if (buttonItem === '=') {
                        answer = calculateArrayExpression(expressionArray);
                        expressionArray = [];
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
                    displayValue += buttonItem;
                    updateDisplay(displayValue);
                }
                
            }
        })
    }
}

function calculateArrayExpression(array){
    // TODO calculate the array expression

    // trim the array of extraneous operators
    let trimmedArray = trimArray(array);

    // calculate trimmed array
    return calculateTrimmedArray(trimmedArray);
}

function trimArray(array) {
    let firstNumberIndex = -1;
    let lastNumberIndex = -1;
    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i])) {
            firstNumberIndex = i; 
            break;
        }
    }
    for (let i = array.length - 1; i >= 0; i--) { // read the array backwards
        if (!isNaN(array[i])) {
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
    while (array.indexOf("*") !== -1 || array.indexOf("/") !== -1) { 
        for (let i = 0; i < array.length; i++) {
            if (array[i] === "*" || array[i] === "/") {
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