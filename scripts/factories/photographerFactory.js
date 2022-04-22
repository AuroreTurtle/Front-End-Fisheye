/* Creating a function that will create a photographer object. */
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");

        const a = document.createElement("a");
        a.setAttribute("href", `photographer.html?id=${id}`);
        a.setAttribute("aria-label", `Vers la page de ${name}`);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const h2 = document.createElement("h2");
        h2.textContent = name;

        const h3 = document.createElement("h3");
        h3.textContent = `${city}, ${country}`;

        const pTag = document.createElement("p");
        pTag.className = "tag";
        pTag.textContent = tagline;

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
