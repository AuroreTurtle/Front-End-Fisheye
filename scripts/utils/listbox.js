const listbox = document.querySelector("#listbox");
listboxBtn = listbox.querySelector(".listbox_btn");

listboxBtn.addEventListener("click", () => {
    listbox.classList.toggle("active");
});
listboxBtn.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        listbox.classList.toggle("active");
    }
});

options = listbox.querySelector(".options");
let choices = ["Popularité", "Date", "Titre"];

function addChoice(selectedChoice) {
    options.innerText = "";
    choices.forEach((choice) => {
        let isSelected = choice == selectedChoice ? "selected" : "";
        let li = `<li onclick="updateName(this)" class="${isSelected}" role="option" tabindex="0" data-sort="${choice}">${choice}</li>`;
        options.insertAdjacentHTML("beforeend", li);
    });
}

function updateName(selectedLi) {
    addChoice(selectedLi.innerText);
    listbox.classList.remove("active");
    listboxBtn.firstElementChild.innerText = selectedLi.innerText;
}

addChoice();
