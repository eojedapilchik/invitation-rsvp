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
  for (const invitee of listInvitees) {
    if (isChecked) {
      if (invitee.className === "responded") {
        invitee.style.display = "";
      } else {
        invitee.style.display = "none";
      }
    } else {
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
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }

  function createAndAppendElement(parent, elementName, property, value) {
    const element = createElement(elementName, property, value);
    parent.appendChild(element);
    return element;
  }

  const li = document.createElement("li");
  createAndAppendElement(li, "span", "textContent", input.value);
  const label = createAndAppendElement(li, "label", "textContent", "Confirmed");
  createAndAppendElement(label, "input", "type", "checkbox");
  createAndAppendElement(li, "button", "textContent", "Edit");
  createAndAppendElement(li, "button", "textContent", "Remove");
  ul.appendChild(li);
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
    const action = button.textContent.toLowerCase();
    const inviteeActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = "Save";
      },
      save: () => {
        const span = document.createElement("span");
        const input = li.firstElementChild;
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = "Edit";
      },
    };

    inviteeActions[action]();
    /*
    if (button.textContent == "Remove") {
      inviteeActions.remove();
    } else if (button.textContent === "Edit") {
      inviteeActions.edit(li, button);
    } else {
      inviteeActions.save(li, button);
    }*/
  }
});
