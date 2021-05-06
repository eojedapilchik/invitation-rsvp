const form = document.getElementById("registrar");
const input = form.querySelector("input");
const ul = document.getElementById("invitedList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createListItem();
  //Clears the input text
  //   console.log(input.value);
});

function createListItem() {
  const li = document.createElement("li");
  li.textContent = input.value;
  ul.appendChild(li);
  input.value = "";
}
