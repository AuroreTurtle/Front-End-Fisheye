/**
 * It takes a data object as an argument, and returns an object with two properties: id and
 * getProfileCardDOM
 * @param data - the data object that contains all the information about the photographer
 * @returns The function getProfileCardDOM() is being returned.
 */
// eslint-disable-next-line no-unused-vars
function profileFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getProfileCardDOM() {
    const profile = document.querySelector(".photograph-header");
    const button = document.querySelector(".contact_button");

    // Photographer's picture
    const divImage = document.createElement("div");
    divImage.className = "info-image";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("srcset", `assets/photographers/light/${portrait}`);

    const divProfile = document.createElement("div");
    divProfile.className = "info-profile";

    // Photographer's name
    const h1 = document.createElement("h1");
    h1.textContent = name;

    // Photographer's place
    const h2 = document.createElement("h2");
    h2.textContent = `${city}, ${country}`;

    // Tag
    const pTag = document.createElement("p");
    pTag.className = "tag";
    pTag.textContent = tagline;

    const divInfo = document.createElement("div");
    divInfo.className = "info";
    // Price
    const pPrix = document.createElement("p");
    pPrix.className = "info_price";
    pPrix.textContent = `${price}€/jour`;

    // Like
    const coeur = document.createElement("span");
    coeur.className = "info_like";
    coeur.setAttribute("data-id", id);
    const like = document.createElement("p");
    like.className = "like_total";

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
