"use strict";

const form = document.getElementById("registrar");
const input = form.querySelector("input");
const mainDiv = document.querySelector(".main");
const ul = document.getElementById("invitedList");

const div = document.createElement("div");
const filterLabel = document.createElement("label");
const filterCheckBox = document.createElement("input");

filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = "checkbox";
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);

filterCheckBox.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const listInvitees = ul.children;
  if (isChecked) {
    for (const invitee of listInvitees) {
      if (invitee.className === "responded") {
        invitee.style.display = "";
      } else {
        invitee.style.display = "none";
      }
    }
  } else {
    for (const invitee of listInvitees) {
      invitee.style.display = "";
    }
  }
});

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
        editStateListItem(li, button);
      } else {
        saveStateListItem(li, button);
      }
    }
  }
});

/**
 * Puts the list item into edit State
 *
 * @param {element} li - list item to put in edit state
 * @param {button} button - edit button
 */
function editStateListItem(li, button) {
  const span = li.firstElementChild;
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  li.insertBefore(input, span);
  li.removeChild(span);
  button.textContent = "Save";
}

/**
 * Puts the list item into de saved state
 *
 * @param {element} li - list item to put in edit state
 * @param {button} button - edit button
 */
function saveStateListItem(li, button) {
  const span = document.createElement("span");
  const input = li.firstElementChild;
  span.textContent = input.value;
  li.insertBefore(span, input);
  li.removeChild(input);
  button.textContent = "Edit";
}
