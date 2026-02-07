class Calculator {
    constructor() {
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = false;
    }

    calculate(num1, operator, num2) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                if (num2 === 0) {
                    return -1; // numeric error code for division by zero
                }
                return num1 / num2;
            default:
                return 0; // fallback for invalid operator
        }
    }

    clear() {
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
        this.waitingForNewValue = false;
    }

    setOperator(op) {
        this.operator = op;
    }

    inputDigit(digit) {
        if (this.waitingForNewValue) {
            this.currentValue = digit;
            this.waitingForNewValue = false;
        } else {
            this.currentValue = this.currentValue * 10 + digit;
        }
    }

    compute() {
        if (this.previousValue !== null && this.operator !== null) {
            const result = this.calculate(this.previousValue, this.operator, this.currentValue);
            this.currentValue = result;
            this.previousValue = null;
            this.operator = null;
            this.waitingForNewValue = true;
        }
    }
}

// Initialize calculator instance
const calculator = new Calculator();

// Get DOM elements
const display = document.querySelector('.display');
const buttonGrid = document.querySelector('.button-grid');

// Update display function
function updateDisplay() {
    display.textContent = calculator.currentValue;
}

// Event delegation for button clicks
buttonGrid.addEventListener('click', (event) => {
    if (!event.target.matches('button')) return;
    
    const value = event.target.getAttribute('data-value');
    
    if (value >= '0' && value <= '9') {
        // Digit button
        calculator.inputDigit(parseInt(value, 10));
        updateDisplay();
    } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        // Operator button
        if (calculator.previousValue === null) {
            calculator.previousValue = calculator.currentValue;
        } else if (!calculator.waitingForNewValue) {
            calculator.compute();
            calculator.previousValue = calculator.currentValue;
        }
        calculator.setOperator(value);
        calculator.waitingForNewValue = true;
        updateDisplay();
    } else if (value === '=') {
        // Equals button
        calculator.compute();
        updateDisplay();
    } else if (value === 'C') {
        // Clear button
        calculator.clear();
        updateDisplay();
    }
});

// Initial display update
updateDisplay();

// Export for potential use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
