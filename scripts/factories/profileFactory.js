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

        const divPrix = document.createElement("div");
        divPrix.className = "info-prix";
        const pPrix = document.createElement("p");
        pPrix.className = "prix";
        pPrix.textContent = `${price}€/jour`;

        const iconeCoeur = document.createElement("i");
        iconeCoeur.className = "fa-solid fa-heart";

        divProfile.appendChild(h1);
        divProfile.appendChild(h2);
        divProfile.appendChild(pTag);
        divImage.appendChild(img);
        divPrix.appendChild(iconeCoeur);
        divPrix.appendChild(pPrix);
        profile.appendChild(divImage);
        profile.appendChild(divPrix);
        profile.insertBefore(divProfile, button);
    }

    return { id, getProfileCardDOM };
}
