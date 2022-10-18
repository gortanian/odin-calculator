const INITIAL_DISPLAY_VALUE = "0";

updateDisplay(INITIAL_DISPLAY_VALUE);

buttonPressHandler();

// TODO
// when = is clicked, calculate the things in the array and display the result
// when C is clicked, clear out the array and display 0


function add(num1, num2) {
    return num1 + num2;
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
            if (buttonItem === 'C') {
                expressionArray = [];
                updateDisplay(INITIAL_DISPLAY_VALUE);
                displayValue = '';
            }
            else if (isNaN(buttonItem)) {
                if (displayValue !== '') {
                    if (!isNaN(displayValue)) {
                        expressionArray.push(displayValue);
                    }
                    if (buttonItem === '=') {
                        calculateArrayExpression(expressionArray);
                    }
                    else {
                        expressionArray.push(buttonItem);
                    }
                    
                }
                displayValue = buttonItem;
                updateDisplay(e.target.textContent);
            }
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



}