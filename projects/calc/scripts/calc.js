const calculator = {
    screen: null,
    memory: 0,
    operands: [0, 0],
    operandIndex: 0,
    operation: 'none',
    keys: {
        'sqrt': null, 'percent': null, 'clear': null, 'reset': null, 'memclear': null, 'memrecall': null, 'memadd': null, 'memremove': null, 'num7': null, 'num8': null, 'num9': null, 'add': null, 'num4': null, 'num5': null, 'num6': null, 'subtract': null, 'num1': null, 'num2': null, 'num3': null, 'mult': null, 'decimal': null, 'num0': null, 'eval': null, 'divide': null,
    },

    init() {
        this.screen = document.getElementById('display');
        this.newDisplay = 0;
        this.operands = [0, 0];
        this.operation = 'none';
        this.memory = 0;

        for (let keyName in this.keys) {
            this.keys[keyName] = document.getElementById(keyName);
            //console.log(this.keys[keyName]);
        }

        this.keys['sqrt'].onclick = () => {
            let operand = this.currentOperand;
            operand = Math.sqrt(operand).toPrecision(12);
            this.newOperand = operand;
            this.newDisplay = this.currentOperand;
        }
        this.keys['percent'].onclick = () => {
            let operand = this.currentOperand;
            operand /= 100;
            this.newOperand = operand;
            this.newDisplay = this.currentOperand;
        }
        this.keys['clear'].onclick = () => {
            this.newOperand = 0;
            this.newDisplay = this.currentOperand;
        }
        this.keys['reset'].onclick = () => {
            this.operands = [0, 0];
            this.index = 0;
            this.operation = 'none';
            this.memory = 0;
            this.newDisplay = this.currentOperand;
        }
        this.keys['eval'].onclick = () => {
            this.evaluate();
        };
        // Memory onlick events

        // Arithmetic onclick events
        this.keys['add'].onclick = () => {
            this.evaluate();
            this.operation = 'add';
            this.index = 1;
        };
        this.keys['subtract'].onclick = () => {
            this.evaluate();
            this.operation = 'subtract';
            this.index = 1;
        };
        this.keys['mult'].onclick = () => {
            this.evaluate();
            this.operation = 'mult';
            this.index = 1;
        };
        this.keys['divide'].onclick = () => {
            this.evaluate();
            this.operation = 'divide';
            this.index = 1;
        };

        this.keys['decimal'].onclick = () => {
            this.newOperand = this.currentOperand+'.';
            this.newDisplay = this.currentOperand;
        };

        // Numerals onclick events
        for(let i = 0; i < 10; i++) {
            this.keys[`num${i}`].onclick = () => {
                //console.log(i);
                this.newOperand = Number(String(this.currentOperand) + i);
                this.newDisplay = this.currentOperand;
                console.log(this.currentOperand);
            }
        }

    },

    evaluate() {
        let answer = 0;
        let op = this.operands;
        if (this.operation === 'add') {
            answer = op[1]+op[0];
        } else if (this.operation === 'subtract') {
            answer = op[0]-op[1];
        } else if (this.operation === 'mult') {
            answer = op[1]*op[0];
        } else if (this.operation === 'divide') {
            answer = op[0]/op[1];
        } else if (this.operation === 'none' && this.index === 0) {
            answer = this.currentOperand;
        } else {
            answer = 'Error';
        }
        if (this.currentIndex === 1) {
            this.newOperand = 0;
            this.index = 0;
            this.newOperand = answer;
        }
        this.newDisplay = this.currentOperand;

    },

    /**
     * @param {string} content
     */
    set newDisplay(content) {
        if (String(content).length > 9) {
            content = String(Number(content).toExponential(8)).toLocaleUpperCase();
        }
        this.screen.innerText = content;
        return;
    },

    get currentDisplay() {
        return this.screen.innerText;
    },

    get currentOperand() {
        return this.operands[this.operandIndex];
    },

    /**
     * @param {number} value
     */
    set newOperand(value) {
        this.operands[this.operandIndex] = value;
        return;
    },

    get currentIndex() {
        return this.operandIndex;
    },

    set index(newIndex) {
        this.operandIndex = newIndex;
    }

};

calculator.init();