"use strict";

const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createListItem();
  input.value = "";
});

function createListItem() {
  const li = document.createElement("li");
  li.textContent = input.value;
  const label = document.createElement("label");
  label.textContent = "Confirmed";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  label.appendChild(checkbox);
  li.appendChild(label);
  addButtonToElement("Edit", li);
  addButtonToElement("Remove", li);
  ul.appendChild(li);
}

/**
 * Adds a button to an element
 * @param {string} type - Text of the button
 * @param {element} element - element were the button will be appended
 * @returns the button element
 */
function addButtonToElement(type, element) {
  const btn = document.createElement("button");
  btn.textContent = type;
  btn.className = "js-" + type.toLowerCase();
  element.appendChild(btn);
  return btn;
}

// to handle the event of the change - confirmed checkbox-
ul.addEventListener("change", (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode; // first parent is the label, seconf parent is the Li
  checked ? (listItem.className = "responded") : (listItem.className = "");
  //e.target.tagName == "INPUT"
});

//handle click bubbled up from the remove button
ul.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.className == "js-remove") {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});
