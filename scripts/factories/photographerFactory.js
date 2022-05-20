/**
 * Function that create a photographer object and returns a new object with two properties: id and
 * getUserCardDOM
 * @param data - the data object that we get from the API
 * @returns An object with two properties: id and getUserCardDOM.
 */
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Link to the photographer's page
    const a = document.createElement("a");
    a.setAttribute("href", `photographer.html?id=${id}`);
    a.setAttribute("aria-label", `Vers la page de ${name}`);

    // Photographer's picture
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    // Photographer's name
    const h2 = document.createElement("h2");
    h2.textContent = name;

    // Photographer's place
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;

    // Tag
    const pTag = document.createElement("p");
    pTag.className = "tag";
    pTag.textContent = tagline;

    // Price
    const pPrix = document.createElement("p");
    pPrix.className = "prix";
    pPrix.textContent = `${price}€/jour`;

    article.appendChild(a);
    a.appendChild(img);
    a.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(pTag);
    article.appendChild(pPrix);
    return article;
  }

  return { id, getUserCardDOM };
}
