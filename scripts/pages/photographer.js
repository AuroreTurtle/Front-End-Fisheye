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

    document.querySelectorAll(".galery .galery-media").forEach((mediaDom) => {
        mediaDom.addEventListener("click", (e) => {
            lightbox.show(e.currentTarget.dataset.id);
        });
    });
    document.querySelectorAll(".galery .galery-media").forEach((mediaDom) => {
        mediaDom.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                lightbox.show(e.currentTarget.dataset.id);
            }
        });
    });
}

// Like
async function like(medias) {
    const likes = document.querySelectorAll(".coeur");

    likes.forEach((element) => {
        element.addEventListener("click", (e) => {
            let nbrLikes = element.querySelector(".coeur-nombre");
            let likestot = document.querySelector(".like-tot");
            const mediaID = e.target.closest("article").querySelector(".galery-media").getAttribute("data-id");
            const mediaLikes = medias.find((element) => element.id == mediaID);

            if (mediaLikes.like == "liked") {
                nbrLikes.textContent--;
                mediaLikes.likes--;
                mediaLikes.like = "";
                likestot.textContent--;
            } else {
                nbrLikes.textContent++;
                likestot.textContent++;
                mediaLikes.likes++;
                mediaLikes.like = "liked";
            }
        });
    });

    likes.forEach((element) => {
        element.addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                let nbrLikes = element.querySelector(".coeur-nombre");
                let likestot = document.querySelector(".like-tot");
                const mediaID = e.target.closest("article").querySelector(".galery-media").getAttribute("data-id");
                const mediaLikes = medias.find((element) => element.id == mediaID);

                if (mediaLikes.like == "liked") {
                    nbrLikes.textContent--;
                    mediaLikes.likes--;
                    mediaLikes.like = "";
                    likestot.textContent--;
                } else {
                    nbrLikes.textContent++;
                    likestot.textContent++;
                    mediaLikes.likes++;
                    mediaLikes.like = "liked";
                }
            }
        });
    });
}

async function likeTot(medias) {
    const profile = getPhotographerId();

    let like = [];
    for (const element in medias) {
        if (medias[element].photographerId === profile) {
            like.push(medias[element]);
            // console.log(like);
        }
    }

    let totalLike = 0;
    like.forEach((element) => {
        totalLike += parseInt(element.likes);
    });

    document.querySelector(".like-tot").textContent = totalLike;
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
    like(media);
    displayProfile(photographers);
    likeTot(media);
}

init();
