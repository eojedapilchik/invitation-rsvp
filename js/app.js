const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createListItem();
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
  ul.appendChild(li);
  input.value = "";
}

// to handle the event of the change - confirmed checkbox-
ul.addEventListener("change", (e) => {
  const checkbox = e.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode; // first parent is the label, seconf parent is the Li
  checked ? (listItem.className = "responded") : (listItem.className = "");
  //e.target.tagName == "INPUT"
});
