const functions = document.getElementsByClassName("function-dropdown")[0];
console.log(functions);

function onClickFunctions(e) {
  const functionClass = document.getElementsByClassName("function-dropdown")[0];
  functionClass.classList.toggle("show");
}

function functionSum(e) {
  activeCell.innerText = "=SUM()";
  activeCell.addEventListener("keydown", calculateSum);
}

function calculateSum(e) {
  if (e.keyCode === 13) {
    let sum = 0;
    const formula = e.target.innerText;
    const cellText = formula.match(/[a-zA-Z]+\d+/g);

    for (let i = 0; i < cellText.length; i++) {
      here: for (let j = 0; j < data[currentSheetIndex - 1].length; j++) {
        for (let k = 0; k < data[currentSheetIndex - 1][j].length; k++) {
          if (
            cellText[i].toUpperCase() === data[currentSheetIndex - 1][j][k].id
          ) {
            sum += parseInt(
              data[currentSheetIndex - 1][j][k].innerText === undefined
                ? "0"
                : data[currentSheetIndex - 1][j][k].innerText
            );
            break here;
          }
        }
      }
    }

    activeCell.innerText = sum;
    activeCell.removeEventListener("keydown", calculateSum);
  }
}

function functionAverage(e) {
  activeCell.innerText = "=AVERAGE()";
  activeCell.addEventListener("keydown", calculateAverage);
}

function calculateAverage(e) {
  if (e.keyCode === 13) {
    const formula = e.target.innerText;
    const cellText = formula.match(/[a-zA-Z]+\d+/g);
    console.log(cellText, formula);
    let sum = 0;

    for (let i = 0; i < cellText.length; i++) {
      here: for (let j = 0; j < data[currentSheetIndex - 1].length; j++) {
        for (let k = 0; k < data[currentSheetIndex - 1][j].length; k++) {
          if (
            cellText[i].toUpperCase() === data[currentSheetIndex - 1][j][k].id
          ) {
            sum += parseInt(
              data[currentSheetIndex - 1][j][k].innerText === undefined
                ? "0"
                : data[currentSheetIndex - 1][j][k].innerText
            );
            break here;
          }
        }
      }
    }

    activeCell.textContent = Math.floor(sum / cellText.length);
    activeCell.removeEventListener("keydown", calculateAverage);
  }
}

function functionCount(e) {
  activeCell.innerText = "=COUNT()";
  activeCell.addEventListener("keydown", calculateCount);
}

function calculateCount(e) {
  if (e.keyCode === 13) {
    const formula = e.target.innerText;
    const cellText = formula.match(/[a-zA-Z]+\d+/g);
    activeCell.textContent = cellText.length;
    activeCell.removeEventListener("keydown", calculateCount);
  }
}

function functionMax(e) {
  activeCell.innerText = "=MAX()";
  activeCell.addEventListener("keydown", calculateMax);
}

function calculateMax(e) {
  if (e.keyCode === 13) {
    const formula = e.target.innerText;
    const cellText = formula.match(/[a-zA-Z]+\d+/g);

    let sum = -Infinity;

    for (let i = 0; i < cellText.length; i++) {
      here: for (let j = 0; j < data[currentSheetIndex - 1].length; j++) {
        for (let k = 0; k < data[currentSheetIndex - 1][j].length; k++) {
          if (
            cellText[i].toUpperCase() === data[currentSheetIndex - 1][j][k].id
          ) {
            sum = Math.max(
              parseInt(
                data[currentSheetIndex - 1][j][k].innerText === ""
                  ? "0"
                  : data[currentSheetIndex - 1][j][k].innerText
              ),
              sum
            );
            break here;
          }
        }
      }
    }

    activeCell.innerHTML = sum === -Infinity ? 0 : sum;
    activeCell.removeEventListener("keydown", calculateMax);
  }
}

function functionMin(e) {
  activeCell.innerText = "=MIN()";
  activeCell.addEventListener("keydown", calculateMin);
}

function calculateMin(e) {
  if (e.keyCode === 13) {
    const formula = e.target.innerText;
    const cellText = formula.match(/[a-zA-Z]+\d+/g);

    let sum = Infinity;

    for (let i = 0; i < cellText.length; i++) {
      here: for (let j = 0; j < data[currentSheetIndex - 1].length; j++) {
        for (let k = 0; k < data[currentSheetIndex - 1][j].length; k++) {
          if (
            cellText[i].toUpperCase() === data[currentSheetIndex - 1][j][k].id
          ) {
            sum = Math.min(
              parseInt(
                data[currentSheetIndex - 1][j][k].innerText === ""
                  ? "0"
                  : data[currentSheetIndex - 1][j][k].innerText
              ),
              sum
            );
            break here;
          }
        }
      }
    }

    activeCell.textContent = sum === Infinity ? 0 : sum;
    activeCell.removeEventListener("keydown", calculateMin);
  }
}