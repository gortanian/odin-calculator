let displayValue = "hello"; 

updateDisplay(displayValue);

// create a function that updates the display when a button is pressed
let buttons = document.querySelectorAll("button"); 
for (button of buttons) {
    button.addEventListener("click", (e) => updateDisplay(e.target.textContent));
}







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