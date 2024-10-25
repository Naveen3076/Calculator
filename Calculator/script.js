const themeToggleBtn = document.querySelector(".toggle");
const calculator = document.querySelector(".container");
const toggleIcon = document.querySelector(".toggle-icon");
const expressionField = document.querySelector(".expression");
const resultField = document.querySelector(".result");
let isDark = true;
let expression = ''; // To hold the current mathematical expression
let isCalculated = false; // To track if a result was just calculated

// Theme Toggle Functionality
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
  if (isDark) {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  } else {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  }
};

// Function to handle calculator input clicks
const handleInput = (input) => {
  if (isCalculated && (!isNaN(input) || input === '.')) { // If result was just calculated and number clicked
    expression = ''; // Clear expression to start a new one
  }
  else if ((isCalculated) && isOperator(input)) { // If result was calculated and an operator is clicked
    expression = resultField.textContent; // Use the result as the starting point
    expressionField.textContent = expression;
  }

  isCalculated = false; // Reset the flag for future inputs

  // Append input to the expression
  expression += input;
  expressionField.textContent = expression; // Update the display
};

// Helper function to check if the input is an operator
const isOperator = (input) => {
  return ['+', '-', 'x', '/', '÷', '%'].includes(input); // Define the valid operators
};   

// Function to clear the calculator (AC)
const clearAll = () => {
  expression = '';
  expressionField.textContent = expression;
  resultField.textContent = '';
  isCalculated = false;
};

// Function to clear the last entry (C)
const clearLast = () => {
  if (isCalculated){
    return;
  }
  if (expression.length > 0) {
    expression = expression.slice(0, -1); // Remove the last character
    expressionField.textContent = expression; // Update the display
  }
};

// Function to evaluate the result
const calculateResult = () => {
  try {
    // Evaluate the expression safely
    console.log(`${expression}`)
    const result = eval(expression.replace('x', '*').replace('÷', '/'));
    resultField.textContent = result; // Display result
    isCalculated = true; // Flag that result was just calculated
  } catch (error) {
    resultField.textContent = 'Error'; // Handle invalid expressions
  }
};

// Add event listeners to all calculator buttons
const buttons = document.querySelectorAll('.item');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      handleInput(value); // Handle number input
    } else if (button.classList.contains('operator')) {
      handleInput(`${value}`); // Handle operator input with spaces
    } else if (button.classList.contains('function')) {
      if (value === 'AC') clearAll(); // Clear all (AC)
      else if (value === 'C') clearLast(); // Clear last entry (C)
      else if (value === '%') handleInput('/100'); // Handle percentage input
      else if (value === '.') handleInput('.'); // Handle decimal input
    } else if (button.classList.contains('equal')) {
      calculateResult(); // Handle equal button for evaluation
    }
  });
});
