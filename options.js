const position = document.getElementById("position");
const formulas = document.getElementById("formulas");
const textAlignELements = document.getElementsByClassName("text-align");
const fontSizeSelector = document.getElementById("font-size-selector");

const fontFamilySelector = document.getElementById("font-selector");

//menuItems
const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const underline = document.getElementById("underline");

const activeOp = {
  sheet: {},
};

position.innerText = "";

let activeCell = null;
let previousCell = null;
let previousActiveOptionsState;
let copiedCell = null;

let activeOptionsState;

function onCellFocus(e) {
  highlightRowAndColumn(e);

  if (activeCell && activeCell.id === e.target.id) return;

  activeCell = e.target;
  position.innerText = activeCell.id;

  const computedStyle = getComputedStyle(activeCell);

  activeOptionsState = {
    fontFamily: computedStyle.fontFamily,
    isBoldSelected: computedStyle.fontWeight === "600",
    isItalicSelected: computedStyle.fontStyle === "italic",
    isUnderLineSelected:
      computedStyle.textDecoration === "underline solid rgb(0, 0, 0)",
    textAlign: computedStyle.textAlign,
    textColor: computedStyle.color,
    backgroundColor: computedStyle.backgroundColor,
    fontSize: computedStyle.fontSize,
    sheetName: currentActiveSheet,
    cellId: activeCell.id,
    textContent: activeCell.innerText,
  };

  activeOp[activeCell.id] = activeOptionsState;

  // console.log(activeOptionsState);
  manageButtonState(computedStyle);

  //handles previousCell style after focus is gone
  if (previousCell) {
    previousCell.style.border = "1px solid #e1e1e1";
    previousCell.style.borderRightWidth = "0px";
    previousCell.style.borderTopWidth = "0px";
  }
}

function highlightRowAndColumn(e) {
  const currentId = e.target;
  const ColumnId = e.target.parentNode.children[0];
  const parenNode = e.target.parentNode.parentNode;
  const rowId = currentId.id.replace(ColumnId.innerText, "");
  const num = rowId.charCodeAt(0) - 65;
  const rowElement = document.getElementById(rowId);

  const changeColumnColor = parenNode.children[0].children[num + 1];

  ColumnId.style.backgroundColor = "#D3E3FD";
  changeColumnColor.style.backgroundColor = "#D3E3FD";
  currentId.style.border = "none";
  currentId.style.border = "1px solid #135dd2";
  position.innerText = currentId.id;
  formulas.innerText = currentId.innerText.trim();
}

function onCellBlur(e) {
  const currentId = e.target;
  const ColumnId = e.target.parentNode.children[0];
  const parenNode = e.target.parentNode.parentNode;
  const rowId = currentId.id.replace(ColumnId.innerText, "");
  const num = rowId.charCodeAt(0) - 65;
  const rowElement = document.getElementById(rowId);

  const changeColumnColor = parenNode.children[0].children[num + 1];

  ColumnId.style.backgroundColor = "white";
  changeColumnColor.style.backgroundColor = "white";

  previousCell = e.target;
}

function onCellInput(e) {
  formulas.innerText = e.target.innerText;
}

function changeButtonState(button, selectedButton) {
  if (selectedButton) {
    button.classList.add("active-option");
  } else {
    button.classList.remove("active-option");
  }

  if (button.id === "font-selector") button.value = selectedButton;

  if (button.id === "font-size-selector")
    fontSizeSelector.value = selectedButton;
}


function manageButtonState(computedStyle) {
  //bold
  changeButtonState(bold, activeOptionsState.isBoldSelected);

  //italic
  changeButtonState(italic, activeOptionsState.isItalicSelected);

  //underline
  changeButtonState(underline, activeOptionsState.isUnderLineSelected);

  //fontFamily
  changeButtonState(fontFamilySelector, activeOptionsState.fontFamily);

  //fontSize
  changeButtonState(fontSizeSelector, activeOptionsState.fontSize);

  //textAlign
  highlightTextAlignButton(activeOptionsState.textAlign);
}

function onClickBold(boldButton) {
  boldButton.classList.toggle("active-option");

  if (activeCell) {
    activeCell.classList.toggle("bold");
    console.log(activeCell);
    activeOptionsState.isBoldSelected = !activeOptionsState.isBoldSelected;
  }
}

function onClickItalic(italicButton) {
  italicButton.classList.toggle("active-option");
  if (activeCell) {
    activeCell.classList.toggle("italic");
    activeOptionsState.isItalicSelected = !activeOptionsState.isItalicSelected;
  }
}

function onClickUnderline(underlineButton) {
  underlineButton.classList.toggle("active-option");

  if (activeCell) {
    activeCell.classList.toggle("underline");
    activeOptionsState.isUnderLineSelected =
      !activeOptionsState.isUnderLineSelected;
  }
}

function onClickCopy(copyButton) {
  // copiedCell = { ...activeCell };
  copiedCell = document.createElement("div");
  copiedCell.className = activeCell.className;
  copiedCell.style = activeCell.style.cssText;
  console.log(copiedCell.style.backgroundColor);
  copiedCell.innerText = activeCell.innerText;

  // console.log(copiedCell);
}
function onClickCut() {
  copiedCell = document.createElement("div");
  copiedCell.className = activeCell.className;
  copiedCell.style = activeCell.style.cssText;
  console.log(copiedCell.style.backgroundColor);
  copiedCell.innerText = activeCell.innerText;
  console.log(activeCell.style);
  activeCell.style = document.createElement("div").cssText;

  activeCell.style.fontWeight = "400";
  activeCell.style.fontStyle = "normal";
  activeCell.style.textDecoration = "none";
  activeCell.innerText = "";
  // console.log(copiedCell);
  // console.log(activeCell.style);
}

function onClickPaste(pasteButton) {
  if (copiedCell) {
    copiedCell.id = activeCell.id;
    // copiedCell = document.createElement("div");
    activeCell.className = copiedCell.className;
    activeCell.style = copiedCell.style.cssText;
    // console.log(copiedCell.style, activeCell.style);
    activeCell.innerText = copiedCell.innerText;
  }
  // copiedCell = null;

  manageButtonState();
}

formulas.addEventListener("input", () => {
  if (activeCell) activeCell.innerText = formulas.innerText;
});

fontSizeSelector.addEventListener("change", () => {
  if (activeCell) {
    activeCell.style.fontSize = fontSizeSelector.value;
    // console.log(fontSizeSelector.value, activeCell.fontSize);
  }
});

fontFamilySelector.addEventListener("change", () => {
  if (activeCell) {
    activeCell.style.fontFamily = fontFamilySelector.value;
    console.log(fontFamilySelector.value, activeCell.fontFamily);
  }
});

function highlightTextAlignButton(textAlignValue) {
  for (let i = 0; i < textAlignELements.length; i++) {
    if (textAlignELements[i].getAttribute("data-value") === textAlignValue) {
      textAlignELements[i].classList.add("active-option");
    } else {
      textAlignELements[i].classList.remove("active-option");
    }
  }
}

function onClickTextAlign(textAlignButton) {
  let selectedValue = textAlignButton.getAttribute("data-value");

  highlightTextAlignButton(selectedValue);

  if (activeCell) {
    activeCell.style.textAlign = selectedValue;
    activeOptionsState.textAlign = selectedValue;
  }
}

function onChangeTextColor(textColorInput) {
  if (activeCell) {
    activeCell.style.color = textColorInput.value;
    activeOptionsState.textColor = textColorInput.value;
  }
}

function onChangeBackgroundColor(textColorInput) {
  if (activeCell) {
    activeCell.style.backgroundColor = textColorInput.value;
    activeOptionsState.backgroundColor = textColorInput.value;
  }
}