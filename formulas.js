const cells = document.querySelectorAll(".cell");

cells.forEach(function (cell) {
    cell.addEventListener("click", function () {
        activeElement = cell;
        // console.log("Active Cell:", activeElement);
    });
});

let activeElement = null; // Initialize activeElement

function onCellFocus(event) {
    activeElement = event.target;
}

function onCellBlur() {
    // Optionally handle blur event
}

function onCellInput() {
    // Optionally handle input event
}

cells.forEach((cell) => {
    cell.addEventListener("focus", onCellFocus);
    cell.addEventListener("blur", onCellBlur);
    cell.addEventListener("input", onCellInput);
});

const expressionInput = document.querySelector("#formulas");

expressionInput.addEventListener("input", handleExpressionInput);

function handleExpressionInput() {
    const expression = expressionInput.textContent.trim(); // Use textContent for content editable div

    // Log the expression for debugging
    console.log("Expression:", expression);

    // Check if the expression is not empty
    if (expression !== "") {
        // Check if the expression ends with an operator
        if (/[+\-*/]$/.test(expression)) {
            // Remove the trailing operator
            const correctedExpression = expression.slice(0, -1);

            try {
                // Use math.js to evaluate the corrected expression
                const result = math.evaluate(correctedExpression);

                // Display the result in the active cell
                if (activeElement) {
                    activeElement.innerText = result;

                    // Update the state with the evaluated result
                    // (Replace this line with your actual state update logic)
                    // state[activeElement.id] = { ...state[activeElement.id], value: result };
                } else {
                    console.error("No active cell found");
                }
            } catch (error) {
                console.error("Error evaluating expression:", error);
                // Handle the error as needed
            }
        } else {
            // The expression doesn't end with an operator, proceed as usual
            try {
                // Use math.js to evaluate the expression
                const result = math.evaluate(expression);

                // Display the result in the active cell
                if (activeElement) {
                    activeElement.innerText = result;

                    // Update the state with the evaluated result
                    // (Replace this line with your actual state update logic)
                    // state[activeElement.id] = { ...state[activeElement.id], value: result };
                } else {
                    console.error("No active cell found");
                }
            } catch (error) {
                console.error("Error evaluating expression:", error);
                // Handle the error as needed
            }
        }
    }
}

