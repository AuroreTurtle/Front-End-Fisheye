const listbox = document.querySelector("#listbox");
const listboxBtn = listbox.querySelector(".listbox_btn");

const options = listbox.querySelector(".options");
const choices = ["Popularité", "Date", "Titre"];

listboxBtn.addEventListener("click", () => {
  listbox.classList.toggle("active");
});
listboxBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    listbox.classList.toggle("active");
  }
});

/**
 * It takes a selected choice, clears the options list, loops through the choices array, and adds a
 * list item for each choice
 * @param selectedChoice - The selected choice from the dropdown.
 */
function addChoice(selectedChoice) {
  options.innerText = "";
  choices.forEach((choice) => {
    const isSelected = choice === selectedChoice ? "selected" : "";
    const li = `<li onclick="updateName(this)" class="${isSelected}" role="option" tabindex="0" data-sort="${choice}">${choice}</li>`;
    options.insertAdjacentHTML("beforeend", li);
  });
}

/**
 * When the user clicks on a list item, the text of the list item is added to the list of choices, the
 * listbox is closed, and the text of the listbox button is updated to match the text of the list item
 * @param selectedLi - The list item that was clicked.
 */
// eslint-disable-next-line no-unused-vars
function updateName(selectedLi) {
  addChoice(selectedLi.innerText);
  listbox.classList.remove("active");
  listboxBtn.firstElementChild.innerText = selectedLi.innerText;
}

addChoice();
