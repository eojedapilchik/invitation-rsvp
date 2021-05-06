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

  const btnRemove = document.createElement("button");
  btnRemove.textContent = "Remove";
  btnRemove.className = "js-remove";
  li.appendChild(btnRemove);
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
  if (e.target.tagName === "BUTTON" && e.target.className == "js-remove") {
    const li = e.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
  }
});
