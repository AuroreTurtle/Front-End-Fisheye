/* eslint-disable no-console */
const modal = document.getElementById("contact_modal");
const title = document.querySelector("#Contact");

// Elements focusables
const focusableSelector = "input, textarea, button";
let focusables = [];
// Element previously focus
let previousFocusElement = null;

// For the firstname
const inputFirstname = document.forms.contact.elements.firstname;
const errorFirstname = inputFirstname.nextElementSibling;

// For the lastname
const inputLastname = document.forms.contact.elements.lastname;
const errorLastname = inputLastname.nextElementSibling;

// For the email
const inputEmail = document.forms.contact.elements.email;
const errorEmail = inputEmail.nextElementSibling;

// For the message
const { message } = document.forms.contact.elements;
const errorMessage = message.nextElementSibling;

/// //////////////////////////////////////////////////////////////////

/**
 * It fetches the JSON file, and returns the JSON data
 * @returns The response.json() is being returned.
 */
async function getDataPhoto() {
  const response = await fetch("./data/photographers.json");
  return response.json();
}

/**
 * It gets the id of the photographer from the URL
 * @returns The id of the photographer
 */
function getPhotographeId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
}

/**
 * The function is an asynchronous function that gets the data from the API and
 * then loops through the photographers array to find the photographer with the same id as the one in
 * the URL. Once the photographer is found, the function sets the aria-labelledby attribute of the
 * modal to the photographer's name and the id of the title to the photographer's name
 */
async function getNamePhotograph() {
  const { photographers } = await getDataPhoto();

  photographers.forEach((photographer) => {
    const profile = getPhotographeId();
    if (photographer.id === profile) {
      const divModal = document.querySelector(".modal");
      divModal.setAttribute(
        "aria-labelledby",
        `Contact me ${photographer.name}`
      );

      title.setAttribute("id", `Contact me ${photographer.name}`);

      document.getElementById("nom-photographe").innerHTML = photographer.name;
    }
  });
}

/// ////////////////////////////////////////////////////////

// Focus modal
/**
 * If the user presses the tab key while the modal is open, the focus will be moved to the first
 * focusable element in the modal. If the user presses the shift + tab keys, the focus will be moved to
 * the last focusable element in the modal
 * @param e - the event object
 */
function focusInModal(e) {
  e.preventDefault();
  let index = focusables.findIndex(
    (element) => element === modal.querySelector(":focus")
  );
  modal.querySelectorAll(focusableSelector)[0].focus();
  if (e.shiftKey === true) {
    index -= 1;
  } else {
    index += 1;
  }

  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
}

/// //////////////////////////////////////////////////////////////////

/**
 * If the user presses the Escape key, close the modal. If the user presses the Tab key, focus on the
 * first element in the modal
 * @param e - the event object
 */
function navigationModal(e) {
  if (e.key === "Escape" || e.key === "Esc") {
    // eslint-disable-next-line no-use-before-define
    closeModal(e);
  }
  if (e.key === "Tab") {
    focusInModal(e);
  }
}

/**
 * The function displays the modal, hides the main content, sets the focus on the first focusable
 * element in the modal, and adds an event listener to the document to handle keyboard navigation.
 */
// eslint-disable-next-line no-unused-vars
function displayModal() {
  getNamePhotograph();
  document.querySelector("main").setAttribute("aria-hidden", true);
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", false);
  modal.setAttribute("aria-modal", true);

  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previousFocusElement = document.querySelector(":focus");
  focusables[0].focus();
  document.addEventListener("keydown", navigationModal);
}

/**
 * It closes the modal by setting the display property to none, removing the aria-hidden and aria-modal
 * attributes, and setting the focus back to the element that was focused before the modal was opened
 */
function closeModal() {
  if (previousFocusElement !== null) {
    previousFocusElement.focus();
  }
  document.querySelector("main").setAttribute("aria-hidden", false);
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", true);
  modal.setAttribute("aria-modal", false);
  document.removeEventListener("keydown", navigationModal);
}

/// ////////////////////////////////////////////////////////

// Validate form
/**
 * It checks if the form is valid, and if it is, it returns true, otherwise it returns false
 * @param e - the event object
 * @returns the value of the variable formValidate.
 */
function validate(e) {
  e.preventDefault();

  let formValidate = true;

  // Regex
  const nameRegex = /^[A-Za-z\u00C0-\u00FF]+[ \-']?[[A-Za-z\u00C0-\u00FF]+$/;
  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (
    inputFirstname.value.length < 2 ||
    nameRegex.test(inputFirstname.value) === false
  ) {
    inputFirstname.style.border = "3px solid red";
    formValidate = false;
    errorFirstname.style.display = "block";
    inputFirstname.setAttribute("aria-invalid", true);
  } else {
    inputFirstname.style.border = "3px solid green";
    errorFirstname.style.display = "none";
    inputFirstname.setAttribute("aria-invalid", false);
  }

  if (
    inputLastname.value.length < 2 ||
    nameRegex.test(inputLastname.value) === false
  ) {
    inputLastname.style.border = "3px solid red";
    formValidate = false;
    errorLastname.style.display = "block";
    inputLastname.setAttribute("aria-invalid", true);
  } else {
    inputLastname.style.border = "3px solid green";
    errorLastname.style.display = "none";
    inputLastname.setAttribute("aria-invalid", false);
  }

  if (inputEmail.value === "" || mailRegex.test(inputEmail.value) === false) {
    inputEmail.style.border = "3px solid red";
    formValidate = false;
    errorEmail.style.display = "block";
    inputEmail.setAttribute("aria-invalid", true);
  } else {
    inputEmail.style.border = "3px solid green";
    errorEmail.style.display = "none";
    inputEmail.setAttribute("aria-invalid", false);
  }

  if (message.value.length < 10) {
    message.style.border = "3px solid red";
    formValidate = false;
    errorMessage.style.display = "block";
    message.setAttribute("aria-invalid", true);
  } else {
    message.style.border = "3px solid green";
    errorMessage.style.display = "none";
    message.setAttribute("aria-invalid", false);
  }

  return formValidate;
}

/**
 * It resets the form
 */
function initialise() {
  inputFirstname.value = "";
  inputFirstname.style.border = "none";

  inputLastname.value = "";
  inputLastname.style.border = "none";

  inputEmail.value = "";
  inputEmail.style.border = "none";

  message.value = "";
  message.style.border = "none";
}

// Display the values of the form
/* An event listener that listens for the submit event on the form. When the event is triggered,
the function calls the validate function, and if the form is valid, it logs the values of the form
fields to the console, calls the initialise function to reset the form, and closes the modal. */
document.querySelector("form").addEventListener("submit", (e) => {
  if (validate(e)) {
    console.log(`Prénom : ${inputFirstname.value}`);
    console.log(`Nom : ${inputLastname.value}`);
    console.log(`Mail : ${inputEmail.value}`);
    console.log(`Message : ${message.value}`);
    initialise();

    closeModal();
  }
});
