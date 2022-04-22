//Mettre le code JavaScript lié à la page photographer.html

// import { getData } from "index.js";
// const jsonData = getData();

async function getData() {
    // utilisation de await car fonction async
    const response = await fetch("./data/photographers.json");
    return await response.json();
}

function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get("id"));
}

async function displayMedia(medias) {
    const mediasSection = document.querySelector(".galery");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        // console.log(mediaModel.photographerId);
        const profile = getPhotographerId();
        if (mediaModel.photographerId === profile) {
            const mediaCardDOM = mediaModel.getMediaCardDOM();
            mediasSection.appendChild(mediaCardDOM);
        }
    });
}

async function displayProfile(photographers) {
    const profileSection = document.querySelector(".photograph-header");

    // message d'erreur avec forEach (mais fonctionne) chercher une autre méthode
    photographers.forEach((photographer) => {
        const profileModel = profileFactory(photographer);
        // console.log(profileModel.id);
        const profile = getPhotographerId();
        // console.log(profile);
        if (profileModel.id === profile) {
            const profileCardDOM = profileModel.getProfileCardDOM();
            profileSection.appendChild(profileCardDOM);
        }
    });
}

async function init() {
    const { media, photographers } = await getData();
    displayMedia(media);
    displayProfile(photographers);
}

init();
