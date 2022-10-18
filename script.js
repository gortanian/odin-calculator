let displayValue = "hello";

updateDisplay(displayValue);

buttonPressHandler();

// TODO
// make the display capable of multi-digit numbers
// store the calculator items in an array 
// when = is clicked, calculate the things and stuff
// when C is clicked, clear out the array and display


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

function updateDisplay(displayValue) {
    const display = document.getElementById("display");
    display.textContent = displayValue;
}

function buttonPressHandler() {
    // update the display when a button is pressed
    let buttons = document.querySelectorAll("button");
    for (button of buttons) {
        button.addEventListener("click", function (e) {
            let userItem = e.target.textContent;
            if (isNaN(userItem)) {
                displayValue = userItem;
                updateDisplay(e.target.textContent);
            }
            else {
                if (isNaN(displayValue)) {
                    displayValue = '';
                }
                displayValue += userItem;
                updateDisplay(displayValue);
            }
            
        })
    }
}