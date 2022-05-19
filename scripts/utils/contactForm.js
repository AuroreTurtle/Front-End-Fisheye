/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const modal = document.getElementById("contact_modal");
const titre = document.querySelector("#Contact");

// Elements focusables
const focusableSelector = "input, textarea, button";
let focusables = [];
// Element previously focus
let previousFocusElement = null;

// For the firstname
const prenom = document.forms.contact.elements.firstname;
const erreurPrenom = prenom.nextElementSibling;

// For the lastname
const nom = document.forms.contact.elements.lastname;
const erreurNom = nom.nextElementSibling;

// For the email
const mail = document.forms.contact.elements.email;
const erreurMail = mail.nextElementSibling;

// For the message
const { message } = document.forms.contact.elements;
const erreurMessage = message.nextElementSibling;

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

      titre.setAttribute("id", `Contact me ${photographer.name}`);

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
    index--;
  } else {
    index++;
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
  const newRegex = /^[A-Za-z\u00C0-\u00FF]+[ \-']?[[A-Za-z\u00C0-\u00FF]+$/;
  const mailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (prenom.value.length < 2 || newRegex.test(prenom.value) === false) {
    prenom.style.border = "3px solid red";
    formValidate = false;
    erreurPrenom.style.display = "block";
    prenom.setAttribute("aria-invalid", true);
  } else {
    prenom.style.border = "3px solid green";
    erreurPrenom.style.display = "none";
    prenom.setAttribute("aria-invalid", false);
  }

  if (nom.value.length < 2 || newRegex.test(nom.value) === false) {
    nom.style.border = "3px solid red";
    formValidate = false;
    erreurNom.style.display = "block";
    nom.setAttribute("aria-invalid", true);
  } else {
    nom.style.border = "3px solid green";
    erreurNom.style.display = "none";
    nom.setAttribute("aria-invalid", false);
  }

  if (mail.value === "" || mailRegex.test(mail.value) === false) {
    mail.style.border = "3px solid red";
    formValidate = false;
    erreurMail.style.display = "block";
    mail.setAttribute("aria-invalid", true);
  } else {
    mail.style.border = "3px solid green";
    erreurMail.style.display = "none";
    mail.setAttribute("aria-invalid", false);
  }

  if (message.value.length < 10) {
    message.style.border = "3px solid red";
    formValidate = false;
    erreurMessage.style.display = "block";
    message.setAttribute("aria-invalid", true);
  } else {
    message.style.border = "3px solid green";
    erreurMessage.style.display = "none";
    message.setAttribute("aria-invalid", false);
  }

  return formValidate;
}

/**
 * It resets the form
 */
function initialise() {
  prenom.value = "";
  prenom.style.border = "none";

  nom.value = "";
  nom.style.border = "none";

  mail.value = "";
  mail.style.border = "none";

  message.value = "";
  message.style.border = "none";
}

// Display the values of the form
/* An event listener that listens for the submit event on the form. When the event is triggered,
the function calls the validate function, and if the form is valid, it logs the values of the form
fields to the console, calls the initialise function to reset the form, and closes the modal. */
document.querySelector("form").addEventListener("submit", (e) => {
  if (validate(e)) {
    console.log(`Prénom : ${prenom.value}`);
    console.log(`Nom : ${nom.value}`);
    console.log(`Mail : ${mail.value}`);
    console.log(`Message : ${message.value}`);
    initialise();

    closeModal();
  }
});
