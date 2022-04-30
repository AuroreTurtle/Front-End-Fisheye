const modal = document.getElementById("contact_modal");
const titre = document.querySelector("#Contact");

// Elements focusables
const focusableSelector = "input, textarea, button";
let focusables = [];
// Element previously focus
let previousFocusElement = null;

// For the firstname
let prenom = document.forms["contact"].elements["firstname"];
const erreurPrenom = prenom.nextElementSibling;

// For the lastname
let nom = document.forms["contact"].elements["lastname"];
const erreurNom = nom.nextElementSibling;

// For the email
let mail = document.forms["contact"].elements["email"];
const erreurMail = mail.nextElementSibling;

//For the message
let message = document.forms["contact"].elements["message"];
const erreurMessage = message.nextElementSibling;
/////////////////////////////////////////////////////////////////////

async function getDataPhoto() {
    const response = await fetch("./data/photographers.json");
    return await response.json();
}

function getPhotographeId() {
    return parseInt(new URLSearchParams(window.location.search).get("id"));
}

async function getNamePhotograph() {
    const { photographers } = await getDataPhoto();

    photographers.forEach((photographer) => {
        const profile = getPhotographeId();
        if (photographer.id === profile) {
            const divModal = document.querySelector(".modal");
            divModal.setAttribute("aria-labelledby", `Contact me ${photographer.name}`);

            titre.setAttribute("id", `Contact me ${photographer.name}`);

            document.getElementById("nom-photographe").innerHTML = photographer.name;
        }
    });
}

/////////////////////////////////////////////////////////////////////

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

function navigationModal(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
    if (e.key === "Tab") {
        focusInModal(e);
    }
}
///////////////////////////////////////////////////////////

// Focus modal
function focusInModal(e) {
    e.preventDefault();
    let index = focusables.findIndex((element) => element === modal.querySelector(":focus"));
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
    console.log(index);
    console.log(focusables[index]);
}

///////////////////////////////////////////////////////////

// Validation du form
function validate(e) {
    e.preventDefault();

    let formValidate = true;

    // Regex
    const newRegex = /^[A-Za-z\u00C0-\u00FF]+[ \-']?[[A-Za-z\u00C0-\u00FF]+$/;
    const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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

// Affichage de l'envoie du form
document.querySelector("form").addEventListener("submit", function (e) {
    if (validate(e)) {
        console.log(`Prénom :${prenom.value}`);
        console.log(`Nom :${nom.value}`);
        console.log(`Mail :${mail.value}`);
        console.log(`Message :${message.value}`);
        initialise();

        closeModal();
    }
});
