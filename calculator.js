class Calculator {
    constructor() {
        this.currentValue = 0;
        this.previousValue = null;
        this.operator = null;
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
    }

    setOperator(op) {
        this.operator = op;
    }
}

// Export for potential use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}
