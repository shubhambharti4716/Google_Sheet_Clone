let activeSheetColor = "#ced6e0";
let sheetsFolderCont = document.querySelector(".sheets-folder-container");
let addSheetBtn = document.querySelector(".sheet-add-icon");
let cellData = {};

let defaultProperties = {
  text: "",
  "font-weight": "",
  "font-style": "",
  "text-decoration": "",
  "text-align": "left",
  "background-color": "white",
  "color": "black",
  "font-family": "monospace",
  "font-size": "14px"
}

let selectedSheet = "sheet1";
let totalSheets = 1;
let lastlyAddedSheet = 1;

//For default sheet
document.addEventListener("DOMContentLoaded", function () {
  const defaultSheet = document.querySelector(".sheet-folder");
  selectSheet(defaultSheet);
});


document.addEventListener("DOMContentLoaded", function () {
  let columnContainer = document.getElementsByClassName("column-name-container");
  let rowContainer = document.getElementsByClassName("row-name-container");
  let selectedCellBox = document.getElementsByClassName(" selected-cell");
  let boldIcon = document.getElementsByClassName("icon-bold");
  let italicIcon = document.getElementsByClassName("icon-italic");
  let underLIneIcon = document.getElementsByClassName("icon-underline");
  let alignLeftIcon = document.getElementsByClassName("icon-align_left");
  let alignCenterIcon = document.getElementsByClassName("icon-align_center");
  let alignRightIcon = document.getElementsByClassName("icon-align_right");
  let backgroundColorPicker = document.getElementsByClassName("background-color-picker");
  let textColorPicker = document.getElementsByClassName("text-color-picker");
  let iconColorFill = document.getElementsByClassName("icon-color_fill");
  let iconColorText = document.getElementsByClassName("icon-color_text");
  let fontSize = document.getElementById("size-selector");
  let fontFamily = document.getElementById("font-family");



  for (let i = 1; i <= 100; i++) {
    let ans = "";
    let n = i;
    while (n > 0) {
      let rem = n % 26;

      if (rem == 0) {
        ans = "Z" + ans;
        n = Math.floor(n / 26) - 1;
      } else {
        ans = String.fromCharCode(rem - 1 + 65) + ans;
        n = Math.floor(n / 26);
      }
    }
    columnContainer[0].innerHTML += `<div class="column-name colId-${i}" id="colCode-${ans} ">${ans}</div>`;

    rowContainer[0].innerHTML += `<div class="row-name" id="rowId-${i}">${i}</div>`;
  }

  //   creating the input-cell
  let cellContainer = document.getElementsByClassName("input-cell-container");
  for (let i = 1; i <= 100; i++) {
    let row = document.createElement("div");
    row.className = "cell-row";
    for (let j = 1; j <= 100; j++) {
      let colCode = document
        .getElementsByClassName(`colId-${j}`)[0]
        .attributes["id"].value.split("-")[1];
      if (i == j && j == 1) {
        row.innerHTML += `<div class="input-cell selected" id="row-${i}-col-${j}" data="code-${colCode}"> </div>`;
      } else {
        row.innerHTML += `<div class="input-cell" id="row-${i}-col-${j}" data="code-${colCode}"> </div>`;
      }
    }
    cellContainer[0].appendChild(row);
  }

  let alignment = document.querySelectorAll(".align-icon");
  // Iterate through each "align-icon" element and attach a click event listener
  alignment.forEach(function (alignIcon) {
    alignIcon.addEventListener("click", function () {
      // Remove the "selected" class from all elements with class "align-icon"
      var selectedElements = document.querySelectorAll(".align-icon.selected");
      selectedElements.forEach(function (selectedElement) {
        selectedElement.classList.remove("selected");
      });

      // Add the "selected" class to the clicked element
      this.classList.add("selected");
    });
  });

  let styleIcons = document.querySelectorAll(".style-icon");
  styleIcons.forEach(function (StIcon) {
    StIcon.addEventListener("click", function () {
      var clickedElement = this;
      // Check if the clicked element has the "selected" class
      if (clickedElement.classList.contains("selected")) {
        // If it has the class, remove it
        clickedElement.classList.remove("selected");
      } else {
        // If it doesn't have the class, add it
        clickedElement.classList.add("selected");
      }
    });
  });

  let cells = document.querySelectorAll(".input-cell");
  cells.forEach(function (cell) {
    cell.addEventListener("click", function (e) {
      var clickedElement = this;
      let columnName = clickedElement.attributes["data"].nodeValue.split("-")[1];
      let [rowId, colId] = getRowCol(clickedElement);
      selectedCellBox[0].textContent = `${columnName}${rowId}`;
      // Remove the "selected" class from all previously selected cells
      document.querySelectorAll(".input-cell.selected").forEach(function (cell) {
        cell.classList.remove("selected");
      });
      // Add the "selected" class to the clicked cell
      clickedElement.classList.add("selected");
      changeHeader(clickedElement);
      clickedElement.setAttribute("contenteditable", true);
      clickedElement.focus();

    });

    cell.onclick = function () {
      var clickedElement = this;
      document.getElementsByClassName("input-cell selected")[0].classList.remove("selected");
      clickedElement.classList.add("selected");
      clickedElement.setAttribute("contenteditable", true);
      clickedElement.focus();
    };

    cell.addEventListener("blur", function () {
      document.getElementsByClassName("input-cell selected")[0].setAttribute("contenteditable", "false");
      updateCell("text", this.textContent);
    },
      true
    );
  });

  function changeHeader(ele) {
    let [rowId, colId] = getRowCol(ele);
    if (selectedSheet && cellData[selectedSheet] && cellData[selectedSheet][rowId] && cellData[selectedSheet][rowId][colId]) {
      let cellInfo = cellData[selectedSheet][rowId][colId];
      if (cellData[selectedSheet][rowId] && cellData[selectedSheet][rowId][colId]) {
        cellInfo = cellData[selectedSheet][rowId][colId];
      }
      fontFamily.value = cellInfo["font-family"] || "MonoSpace";
      cellInfo["font-size"] != "14px" ? fontSize.value = cellInfo["font-size"] : fontSize.value = "14";
      cellInfo["font-weight"] ? boldIcon[0].classList.add("selected") : boldIcon[0].classList.remove("selected");
      cellInfo["font-style"] ? italicIcon[0].classList.add("selected") : italicIcon[0].classList.remove("selected");
      cellInfo["text-decoration"] ? underLIneIcon[0].classList.add("selected") : underLIneIcon[0].classList.remove("selected");
      let alignment = cellInfo["text-align"];
      document.getElementsByClassName("align-icon selected")[0].classList.remove("selected");
      document.getElementsByClassName(`icon-align_${alignment}`)[0].classList.add("selected");

      cellInfo["background-color"] != "white" ? iconColorFill[0].style.color = cellInfo["background-color"] : iconColorFill[0].style.color = "black";
      cellInfo["color"] != "black" ? iconColorText[0].style.color = cellInfo["color"] : iconColorText[0].style.color = "black";
    }
    //   scroll left and top
    cellContainer[0].addEventListener("scroll", function () {
      columnContainer[0].scrollLeft = this.scrollLeft;
      rowContainer[0].scrollTop = this.scrollTop;
    });
  }

  function getRowCol(ele) {
    let selectedCell = ele.attributes["id"].value.split("-");
    let rowId = parseInt(selectedCell[1]);
    let colId = parseInt(selectedCell[3]);
    return [rowId, colId];
  }

  function updateCell(property, value, defaultPossible) {
    let selectedCells = document.querySelectorAll(".input-cell.selected");
    selectedCells.forEach(function (cell) {
      if (property == "font-size") {
        cell.style.setProperty(property, value + "px");
      } else {
        cell.style.setProperty(property, value);
      }
      let [rowId, colId] = getRowCol(cell);

      if (selectedSheet && cellData[selectedSheet]) {
        if (!cellData[selectedSheet][rowId]) {
          cellData[selectedSheet][rowId] = {};
        }

        if (!cellData[selectedSheet][rowId][colId]) {
          cellData[selectedSheet][rowId][colId] = { ...defaultProperties };
        }

        cellData[selectedSheet][rowId][colId][property] = value;

        if (defaultPossible && JSON.stringify(cellData[selectedSheet][rowId][colId]) === JSON.stringify(defaultProperties)) {
          delete cellData[selectedSheet][rowId][colId];
          if (Object.keys(cellData[selectedSheet][rowId]).length === 0) {
            delete cellData[selectedSheet][rowId];
          }
        }
      }
    });
  }

  boldIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell("font-weight", "", true);
    } else {
      updateCell("font-weight", "bold", false);
    }
  });

  italicIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell("font-style", "", true);
    } else {
      updateCell("font-style", "italic", false);
    }
  });

  underLIneIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell("text-decoration", "", true);
    } else {
      updateCell("text-decoration", "underline", false);
    }
  });

  alignCenterIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell(" text-align", "", true);
    } else {
      updateCell("text-align", "center", false);
    }
  });
  alignLeftIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell(" text-align", "", true);
    } else {
      updateCell("text-align", "left", false);
    }
  });
  alignRightIcon[0].addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      updateCell(" text-align", "", true);
    } else {
      updateCell("text-align", "right", false);
    }
  });

  backgroundColorPicker[0].addEventListener("change", function () {
    updateCell("background-color", this.value, false);
  })
  textColorPicker[0].addEventListener("change", function () {
    updateCell("color", this.value, false);
  })

  fontFamily.addEventListener("change", function () {
    updateCell("font-family", this.value);
  })

  fontSize.addEventListener("change", function () {
    updateCell("font-size", this.value);
  })

});


//For Cut Icon Response
const iconCutElement = document.querySelector('.icon-cut');
iconCutElement.addEventListener('click', cutSelectedCellContent);

// Function to cut the content of the selected cell
function cutSelectedCellContent() {
  const selectedCell = document.querySelector('.input-cell.selected');

  if (selectedCell) {
    const contentToCut = selectedCell.textContent;
    navigator.clipboard.writeText(contentToCut).then(() => {
      // Clear the content of the selected cell
      selectedCell.textContent = '';
    });
  }
}


//For Copy Icon Response
const iconCopyElement = document.querySelector('.icon-copy');
iconCopyElement.addEventListener('click', copySelectedCellContent);

// Function to copy the content of the selected cell
function copySelectedCellContent() {
  const selectedCell = document.querySelector('.input-cell.selected');

  if (selectedCell) {
    const contentToCopy = selectedCell.textContent;
    navigator.clipboard.writeText(contentToCopy).then(() => {
    });
  }
}


//For Paste Icon Response
const iconPasteElement = document.querySelector('.icon-paste');
iconPasteElement.addEventListener('click', pasteClipboardContent);

// Function to paste the content from the clipboard into the selected cell
function pasteClipboardContent() {
  const selectedCell = document.querySelector('.input-cell.selected');

  if (selectedCell) {
    // Read the content from the clipboard
    navigator.clipboard.readText().then((clipboardContent) => {
      // Paste the clipboard content into the selected cell
      selectedCell.textContent = clipboardContent;
    });
  }
}

// For Download and upload
let downloadBtn = document.querySelector(".download");
let importBtn = document.querySelector(".import");

downloadBtn.addEventListener("click", (e) => {
  let jsonData = JSON.stringify(cellData);
  let file = new Blob([jsonData], { type: "application/json" });

  let a = document.createElement("a");
  a.href = URL.createObjectURL(file);
  a.download = "SheetData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

importBtn.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let fr = new FileReader();
    let files = input.files;
    let fileObj = files[0];

    fr.readAsText(fileObj);
    fr.addEventListener("load", (e) => {
      let readSheetData = JSON.parse(fr.result);

      // Basic Sheet Created
      addSheetBtn.click();

      sheetDB = readSheetData[0];
      graphComponentMatrix = readSheetData[1];
      collectedSheetDB[collectedSheetDB.length - 1] = sheetDB;
      collectedGraphComponent[collectedGraphComponent.length - 1] = graphComponentMatrix;

      handleSheetProperties();
    });
  });
});

//For Formula 
const formulaInput = document.querySelector(".formula-input");

formulaInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    // Get the formula from the formula input
    const formula = formulaInput.textContent;

    // Get the active cell (selected cell) or the first cell by default
    const activeCell = document.querySelector(".input-cell.selected") || document.querySelector(".input-cell");

    // Calculate the result of the formula
    const result = evaluateFormula(formula);

    // Set the result in the active cell
    activeCell.textContent = result;
  }
});

// Function to evaluate a formula
function evaluateFormula(formula) {
  try {
    return eval(formula);
  } catch (error) {
    console.error("Error evaluating the formula:", error);
    return "Error";
  }
}

// For new sheet adding event
addSheetBtn.addEventListener("click", function (e) {
  // console.log("Button clicked!");
  let sheetName = 'Sheet ' + (lastlyAddedSheet + 1);
  lastlyAddedSheet += 1;
  createNewSheet(sheetName);

  // Create a new sheet tab
  let sheetTab = document.createElement("div");
  sheetTab.textContent = sheetName;
  sheetTab.classList.add("sheet-folder");
  sheetTab.id = `sheet-${lastlyAddedSheet}`; // Assign a unique id

  sheetTab.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      selectSheet(this);
    }
  });

  sheetsFolderCont.appendChild(sheetTab); // Add new sheet tab to folder container
  selectSheet(sheetTab); // Select the newly added sheet
});

document.querySelectorAll(".sheet-content").forEach(function (sheetContent) {
  sheetContent.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      selectSheet(this.parentElement);
    }
  });
});

// Create a data structure to store data for each sheet
let sheetData = {};

// Function to create a new sheet and initialize its data
function createNewSheet(sheetName) {
  sheetData[sheetName] = {};
}

function emptySheet(sheetName) {
  let sheetInfo = cellData[sheetName];
  if (sheetInfo) { // Check if sheetInfo is defined
    for (let i of Object.keys(sheetInfo)) {
      for (let j of Object.keys(sheetInfo[i])) {
        let cellId = `row-${i}-col-${j}`;
        let cell = document.getElementById(cellId);
        cell.textContent = '';
        cell.style.backgroundColor = defaultProperties["background-color"];
        cell.style.color = defaultProperties["color"];
        cell.style.textAlign = defaultProperties["text-align"];
        cell.style.fontWeight = defaultProperties["font-weight"];
        cell.style.fontStyle = defaultProperties["font-style"];
        cell.style.textDecoration = defaultProperties["text-decoration"];
        cell.style.fontFamily = defaultProperties["font-family"];
        cell.style.fontSize = defaultProperties["font-size"];
      }
    }
  }
}


function loadSheet(sheetName) {
  let sheetInfo = sheetData[sheetName];
  if (sheetInfo) { // Check if sheetInfo is defined
    for (let i of Object.keys(sheetInfo)) {
      for (let j of Object.keys(sheetInfo[i])) {
        let cellInfo = sheetInfo[i][j];
        let cellId = `row-${i}-col-${j}`;
        document.getElementById(cellId).textContent = cellInfo.text;
        document.getElementById(cellId).style.backgroundColor = cellInfo["background-color"];
        document.getElementById(cellId).style.color = cellInfo.color;
        document.getElementById(cellId).style.textAlign = cellInfo["text-align"];
        document.getElementById(cellId).style.fontWeight = cellInfo["font-weight"];
        document.getElementById(cellId).style.fontStyle = cellInfo["font-style"];
        document.getElementById(cellId).style.textDecoration = cellInfo["text-decoration"];
        document.getElementById(cellId).style.fontFamily = cellInfo["font-family"];
        document.getElementById(cellId).style.fontSize = cellInfo["font-size"];
      }
    }
  }
}


function selectSheet(sheetTab) {
  const sheetTabs = document.querySelectorAll(".sheet-folder");
  sheetTabs.forEach((sheet) => {
    sheet.classList.remove("selected");
  });

  sheetTab.classList.add("selected");
  const selectedSheetName = sheetTab.textContent;
  const cells = document.querySelectorAll(".input-cell");
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = defaultProperties["background-color"];
    cell.style.color = defaultProperties["color"];
    cell.style.textAlign = defaultProperties["text-align"];
    cell.style.fontWeight = defaultProperties["font-weight"];
    cell.style.fontStyle = defaultProperties["font-style"];
    cell.style.textDecoration = defaultProperties["text-decoration"];
    cell.style.fontFamily = defaultProperties["font-family"];
    cell.style.fontSize = defaultProperties["font-size"];
  });
  // Load data for the selected sheet
  loadSheet(selectedSheetName);
}

function saveSheetData(sheetName) {
  // Get the data for the active sheet
  const activeSheetData = {};

  const cells = document.querySelectorAll(".input-cell");
  cells.forEach((cell) => {
    const [rowId, colId] = getRowCol(cell);
    const cellData = {
      text: cell.textContent,
      "font-weight": cell.style.fontWeight,
      "font-style": cell.style.fontStyle,
      "text-decoration": cell.style.textDecoration,
      "text-align": cell.style.textAlign,
      "background-color": cell.style.backgroundColor,
      color: cell.style.color,
      "font-family": cell.style.fontFamily,
      "font-size": cell.style.fontSize,
    };

    if (!activeSheetData[rowId]) {
      activeSheetData[rowId] = {};
    }

    activeSheetData[rowId][colId] = cellData;
  });

  // Save the data for the active sheet
  cellData[sheetName] = activeSheetData;
}

