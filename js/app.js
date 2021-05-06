"use strict";

const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createListItem();
  input.value = "";
});

/**
 * Creates a List Item of a guest or invitee to the list of invitees.
 */
function createListItem() {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = input.value;
  li.appendChild(span);
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
  if (e.target.tagName === "BUTTON") {
    const button = e.target;
    const li = e.target.parentNode;
    const ul = li.parentNode;
    if (button.className == "js-remove") {
      ul.removeChild(li);
    } else if (button.className === "js-edit") {
      if (button.textContent === "Edit") {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = "Save";
      } else {
        console.log("save");
      }
    }
  }
});
