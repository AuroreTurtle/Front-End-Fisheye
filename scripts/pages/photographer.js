//Mettre le code JavaScript lié à la page photographer.html

async function getData() {
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

async function displayLightbox(medias) {
    const profile = getPhotographerId();

    let listeElement = [];
    for (const element in medias) {
        if (medias[element].photographerId === profile) {
            listeElement.push(medias[element]);
            // console.log(listeElement);
        }
    }

    let lightbox = new Lightbox(listeElement);

    document.querySelectorAll(".galery article").forEach((mediaDom) => {
        mediaDom.addEventListener("click", (e) => {
            lightbox.show(e.currentTarget.dataset.id);
        });
    });
}

async function displayProfile(photographers) {
    // a améliorer
    photographers.forEach((photographer) => {
        const profileModel = profileFactory(photographer);
        // console.log(profileModel.id);
        const profile = getPhotographerId();
        if (profileModel.id === profile) {
            profileModel.getProfileCardDOM();
        }
    });
}

async function init() {
    const { media, photographers } = await getData();
    displayMedia(media);
    displayLightbox(media);
    displayProfile(photographers);
}

init();
