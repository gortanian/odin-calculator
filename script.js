const INITIAL_DISPLAY_VALUE = "0";

updateDisplay(INITIAL_DISPLAY_VALUE);

buttonPressHandler();

// TODO
// when = is clicked, calculate the things in the array and display the result


function add(num1, num2) {
    return Number(num1) + Number(num2); // avoid concatenation with Number()
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
    const display = document.getElementById("display");
    display.textContent = value;
}

function buttonPressHandler() {
    // initialize the expression array (is this the right place to initialize? scope issues maybe)
    let expressionArray = [];

    // update the display when a button is pressed
    let buttons = document.querySelectorAll("button");
    let displayValue = '';
    for (button of buttons) {
        button.addEventListener("click", function (e) {
            let buttonItem = e.target.textContent;

            // If user presses clear button, clear the display and expression array 
            if (buttonItem === 'C') {
                expressionArray = [];
                updateDisplay(INITIAL_DISPLAY_VALUE);
                displayValue = '';
            }

            // If the user presses a non-numeric button, update the array and display value
            else if (isNaN(buttonItem)) {
                if (displayValue !== '') {
                    if (!isNaN(displayValue)) {
                        expressionArray.push(displayValue);
                    }
                    if (buttonItem === '=') {
                        let answer = calculateArrayExpression(expressionArray);
                        updateDisplay(answer);
                    }
                    else {
                        expressionArray.push(buttonItem);
                    }
                    
                }
                displayValue = buttonItem;
                updateDisplay(e.target.textContent);
            }

            // If the user presses a numeric button, update the display
            else {
                if (isNaN(displayValue)) {
                    displayValue = '';
                }
                displayValue += buttonItem;
                updateDisplay(displayValue);
            }
            console.log(expressionArray);
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
            console.log("checkpoint 1");
            break;
        }
    }
    for (let i = array.length - 1; i >= 0; i--) { // read the array backwards
        if (!isNaN(array[i])) {
            lastNumberIndex = i; 
            console.log("checkpoint 2");
            break;
        }
    }
    let trimmedArray = array.slice(firstNumberIndex, lastNumberIndex + 1);
    for (let i = 0; i < trimmedArray.length; i++) {
        if (isNaN(trimmedArray[i])) {
            if (isNaN(trimmedArray[i + 1])) {
                trimmedArray.splice(i, 1); // remove 1 element at index i
                i--; // don't skip the shifted array element
                console.log("checkpoint 3");
            }
        }
    }
    return trimmedArray;
}

function calculateTrimmedArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "*" || array[i] === "/") {
            array[i] = operate(array[i - 1], array[i], array[i + 1]); // replace operator with answer
            array.splice(i - 1, 1); // remove preceeding number
            array.splice(i, 1); // remove following number
            i = 0; // start back at the beginning
        }
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i] === "+" || array[i] === "-") {
            array[i] = operate(array[i - 1], array[i], array[i + 1]); // replace operator with answer
            array.splice(i - 1, 1); // remove preceeding number
            array.splice(i, 1); // remove following number
            i = 0; // start back at the beginning
        }
    }
    return array[0];
}