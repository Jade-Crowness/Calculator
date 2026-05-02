const buttons = document.querySelectorAll('button');
const upperScreen = document.querySelector('#upper-screen');
const lowerScreen = document.querySelector('#lower-screen');

const add = function(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

const substract = function(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

const multiply = function(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

const divide = function(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

const operators = ['+', '-', 'X', '/', '='];
const misc = ['AC', '%', '⌫', '.'];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

let firstInputNumber = null;
let secondInputNumber = null;
let inputOperator = null;

function clearAll() {
    firstInputNumber = null;
    secondInputNumber = null;
    inputOperator = null;
}

buttons.forEach(function (button) {
    button.addEventListener('click', (event) => {
        let buttonClicked = event.target.textContent;

        if (lowerScreen.textContent.length > 10) {
            if (buttonClicked == "AC") {
                lowerScreen.textContent = '0'
            } else {
                return;
            }
        }
        if (operators.includes(buttonClicked)) {
            if (buttonClicked == '=') {
                if (firstInputNumber != null && inputOperator != null) {
                    secondInputNumber = lowerScreen.textContent;
                    firstInputNumber = upperScreen.textContent;
                    let num1 = Number(firstInputNumber);
                    let num2 = Number(secondInputNumber);
                    if (inputOperator == '+') {
                        lowerScreen.textContent = add(num1, num2);
                        upperScreen.textContent = "";
                    } else if (inputOperator == '-') {
                        lowerScreen.textContent = substract(num1, num2);
                        upperScreen.textContent = "";
                    } else if (inputOperator == 'X') {
                        lowerScreen.textContent = Math.round(multiply(num1, num2) * 100) / 100;
                        upperScreen.textContent = "";
                    } else if (inputOperator == '/') {
                        lowerScreen.textContent = Math.round(divide(num1, num2) * 100) / 100;
                        upperScreen.textContent = "";
                    }
                    clearAll();
                }
            } else {
                if (inputOperator != null) {
                    if (buttonClicked == "+" || buttonClicked == "-" || buttonClicked == "X" || buttonClicked == "/" ) {
                        let numb1 = Number(upperScreen.textContent);
                        let numb2 = Number(lowerScreen.textContent);
                        if (inputOperator == "+") {
                            upperScreen.textContent = add(numb1, numb2);
                            lowerScreen.textContent = "0";
                        } else if (inputOperator == "-") {
                            upperScreen.textContent = substract(numb1, numb2);
                            lowerScreen.textContent = "0";
                        } else if (inputOperator == "X") {
                            upperScreen.textContent = Math.round(multiply(numb1, numb2) * 100) / 100;
                            lowerScreen.textContent = "0";
                        } else if (inputOperator == "/") {
                            upperScreen.textContent = Math.round(divide(numb1, numb2) * 100) / 100;
                            lowerScreen.textContent = "0";
                        }
                        inputOperator = buttonClicked;
                    } 
                } else {
                    inputOperator = buttonClicked;
                    firstInputNumber = lowerScreen.textContent;
                    lowerScreen.textContent = '0';
                    upperScreen.textContent = firstInputNumber;
                }
                }
        } else if (misc.includes(buttonClicked)) {
            if (buttonClicked == 'AC') {
                upperScreen.textContent = "";
                lowerScreen.textContent = '0';
                clearAll();
                lowerScreen.textContent = '0';
            } else if (buttonClicked == '⌫') {
                if (lowerScreen.textContent == '0') {
                    return;
                } else if (lowerScreen.textContent.length == 1) {
                    lowerScreen.textContent = '0';
                } else {
                    lowerScreen.textContent = lowerScreen.textContent.slice(0, -1);
                }
            } else if (buttonClicked == '.') {
                if (lowerScreen.textContent.includes('.')) {
                    return;
                } else {
                    lowerScreen.textContent = lowerScreen.textContent + '.';
                }
            } else {
                lowerScreen.textContent = Number(lowerScreen.textContent) / 100;
            }
        } else if (numbers.includes(buttonClicked)) {
            if (lowerScreen.textContent == '0') {
                lowerScreen.textContent = buttonClicked
            } else {
                lowerScreen.textContent = lowerScreen.textContent + buttonClicked;
            }
        }
    })
})