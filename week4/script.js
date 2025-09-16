// ===================================================================
// DO NOT MODIFY THE CODE BELOW - Call or reference them in your code as needed
// ===================================================================

// Takes in a number and updates the readonly display input
function updateDisplay(value) {
  const display = document.getElementById("display");
  display.value = String(parseFloat(value));
}

// Gets the value from the readonly display input
// Returns a number
// Doesn't need to be used but can help you verify
// the current value on the display
function getDisplay() {
  const display = document.getElementById("display");
  //parseFloat changes the string into a number we can use
  return display.value;
}

//Set up display to show zero when starting
updateDisplay(0);

console.log("Initial value of display: ", getDisplay());

// ===================================================================
// DO NOT MODIFY THE CODE Above - Call or reference them in your code as needed
// ===================================================================

// State variables to track calculator state
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

/**
 * Main input handler called from HTML buttons
 * This function receives ALL button clicks and routes them to the appropriate handler
 * @param {string} input - The input value from button clicks
 */
function handleInput(input) {
  console.log(`Button clicked: ${input}`);
  
  // Check if input is a number (0-9)
  if (!isNaN(parseFloat(input)) && isFinite(input)) {
    handleNumber(input);
  }
  // Check if input is an operator (+, -, *, /)
  else if (input === '+' || input === '-' || input === '*' || input === '/') {
    handleOperator(input);
  }
  // Check if input is a decimal point
  else if (input === '.') {
    handleDecimal();
  }
  // Check if input is equals (=)
  else if (input === '=') {
    executeOperation();
  }
  // Check if input is clear (C)
  else if (input === 'C') {
    resetCalculator();
  }
  // Check if input is clear entry (CE)
  else if (input === 'CE') {
    updateDisplay(0);
    console.log("Display cleared (CE)");
  }
  else {
    console.warn(`Unknown input received: ${input}`);
  }
  
  // Update display at the end
  console.log(`Current display value: ${getDisplay()}`);
}

// Arithmetic operation functions
function add(first, second) {
  const result = first + second;
  console.log(`Addition: ${first} + ${second} = ${result}`);
  return result;
}

function subtract(first, second) {
  const result = first - second;
  console.log(`Subtraction: ${first} - ${second} = ${result}`);
  return result;
}

function multiply(first, second) {
  const result = first * second;
  console.log(`Multiplication: ${first} * ${second} = ${result}`);
  return result;
}

function divide(first, second) {
  if (second === 0) {
    console.error("Division by zero attempted!");
    return "Error";
  }
  const result = first / second;
  console.log(`Division: ${first} / ${second} = ${result}`);
  return result;
}

/**
 * Handles number input (0-9)
 * @param {string} number - The number that was clicked
 */
function handleNumber(number) {
  const currentDisplay = getDisplay();
  
  if (shouldResetDisplay) {
    // Start fresh with new number
    updateDisplay(number);
    shouldResetDisplay = false;
    console.log(`Starting new number: ${number}`);
  } else {
    // Append to existing number (unless display shows 0)
    if (currentDisplay === '0') {
      updateDisplay(number);
    } else {
      updateDisplay(currentDisplay + number);
    }
    console.log(`Appending digit: ${number}, new value: ${getDisplay()}`);
  }
}

/**
 * Handles decimal point input
 */
function handleDecimal() {
  const currentDisplay = getDisplay();
  
  if (shouldResetDisplay) {
    // Start fresh with "0."
    updateDisplay('0.');
    shouldResetDisplay = false;
    console.log("Starting new decimal number: 0.");
  } else {
    // Only add decimal if one doesn't already exist
    if (currentDisplay.indexOf('.') === -1) {
      updateDisplay(currentDisplay + '.');
      console.log(`Added decimal point: ${getDisplay()}`);
    } else {
      console.warn("Decimal point already exists in current number");
    }
  }
}

/**
 * Handles operator input (+, -, *, /)
 * @param {string} nextOperator - The operator that was clicked
 */
function handleOperator(nextOperator) {
  const currentValue = parseFloat(getDisplay());
  
  if (firstOperand === null) {
    // First operator - store the first operand
    firstOperand = currentValue;
    console.log(`Stored first operand: ${firstOperand}`);
  } else if (operator && !shouldResetDisplay) {
    // Chain operations - calculate current result first
    const result = executeOperation();
    if (result === "Error") {
      return; // Don't continue if there was an error
    }
    firstOperand = parseFloat(getDisplay());
  }
  
  operator = nextOperator;
  shouldResetDisplay = true;
  console.log(`Operator set: ${operator}, ready for second operand`);
}

/**
 * Executes the calculation when = is pressed
 */
function executeOperation() {
  if (firstOperand === null || operator === null) {
    console.warn("Cannot execute operation: missing operand or operator");
    return;
  }
  
  const secondOperand = parseFloat(getDisplay());
  let result;
  
  // Use if/else statements to call the correct arithmetic function
  if (operator === '+') {
    result = add(firstOperand, secondOperand);
  } else if (operator === '-') {
    result = subtract(firstOperand, secondOperand);
  } else if (operator === '*') {
    result = multiply(firstOperand, secondOperand);
  } else if (operator === '/') {
    result = divide(firstOperand, secondOperand);
  } else {
    console.error(`Unknown operator: ${operator}`);
    return "Error";
  }
  
  // Handle error result from division by zero
  if (result === "Error") {
    updateDisplay("Error");
    resetCalculator();
    return "Error";
  }
  
  // Update display with result
  updateDisplay(result);
  
  // Reset state for next calculation
  firstOperand = null;
  operator = null;
  shouldResetDisplay = true;
  
  console.log(`Operation completed. Result: ${result}`);
  return result;
}

/**
 * Resets the calculator (C button)
 */
function resetCalculator() {
  firstOperand = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay(0);
  console.log("Calculator reset to initial state");
}