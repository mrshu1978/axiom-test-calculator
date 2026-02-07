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

    inputDecimal() {
        // For simplicity, treat decimal as digit 0 for now
        // In a full implementation, this would handle decimal points
        this.inputDigit(0);
    }
}

// Initialize calculator instance
const calculator = new Calculator();

// Get DOM elements
const display = document.querySelector('.display');
const buttonGrid = document.querySelector('.button-grid');

// Update display function
function updateDisplay() {
    if (calculator.currentValue === -1) {
        display.textContent = 'Error';
    } else {
        display.textContent = calculator.currentValue;
    }
}

// Event delegation for button clicks
buttonGrid.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const value = event.target.getAttribute('data-value');
        handleInput(value);
    }
});

// Handle input from both buttons and keyboard
function handleInput(value) {
    if (value >= '0' && value <= '9') {
        calculator.inputDigit(parseInt(value, 10));
    } else if (value === 'C') {
        calculator.clear();
    } else if (value === '=') {
        calculator.compute();
    } else if (value === '.') {
        calculator.inputDecimal();
    } else if (['+', '-', '*', '/'].includes(value)) {
        calculator.setOperator(value);
    }
    updateDisplay();
}

// Keyboard support
function handleKeydown(event) {
    const key = event.key;
    let handled = false;
    
    // Number keys 0-9
    if (key >= '0' && key <= '9') {
        handleInput(key);
        handled = true;
    }
    // Operator keys
    else if (['+', '-', '*', '/'].includes(key)) {
        handleInput(key);
        handled = true;
    }
    // Enter/= key
    else if (key === 'Enter' || key === '=') {
        handleInput('=');
        handled = true;
    }
    // Escape/C key
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleInput('C');
        handled = true;
    }
    // Decimal point key
    else if (key === '.') {
        handleInput('.');
        handled = true;
    }
    
    // Prevent default for handled keys
    if (handled) {
        event.preventDefault();
        
        // Visual feedback: highlight corresponding button
        const button = document.querySelector(`button[data-value="${key}"]`);
        if (button) {
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
            }, 150);
        }
    }
}

// Add keydown listener to document
document.addEventListener('keydown', handleKeydown);

// Initialize display
updateDisplay();
