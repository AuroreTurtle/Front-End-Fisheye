/* Creating a function that will create a photographer object. */
function profileFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getProfileCardDOM() {
        const profile = document.querySelector(".photograph-header");
        const button = document.querySelector(".contact_button");

        const divImage = document.createElement("div");
        divImage.className = "info-image";
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const divProfile = document.createElement("div");
        divProfile.className = "info-profile";

        const h1 = document.createElement("h1");
        h1.textContent = name;

        const h2 = document.createElement("h2");
        h2.textContent = `${city}, ${country}`;

        const pTag = document.createElement("p");
        pTag.className = "tag";
        pTag.textContent = tagline;

        const divInfo = document.createElement("div");
        divInfo.className = "info";
        const pPrix = document.createElement("p");
        pPrix.className = "info-prix";
        pPrix.textContent = `${price}€/jour`;

        const coeur = document.createElement("span");
        coeur.className = "info-like";
        coeur.setAttribute("data-id", id);
        const like = document.createElement("p");
        like.className = "like-tot";

        const iconeCoeur = document.createElement("i");
        iconeCoeur.className = "fa-solid fa-heart";

        divProfile.appendChild(h1);
        divProfile.appendChild(h2);
        divProfile.appendChild(pTag);
        divImage.appendChild(img);
        divInfo.appendChild(coeur);
        coeur.appendChild(like);
        coeur.appendChild(iconeCoeur);
        divInfo.appendChild(pPrix);
        profile.appendChild(divImage);
        profile.appendChild(divInfo);
        profile.insertBefore(divProfile, button);
    }

    return { id, getProfileCardDOM };
}
