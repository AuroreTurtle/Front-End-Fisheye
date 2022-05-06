function mediaFactory(data) {
    const { photographerId, image, video, likes, title, id } = data;

    function getMediaCardDOM() {
        const article = document.createElement("article");
        article.setAttribute("data-id", id);
        article.setAttribute("tabindex", "0");

        if (image) {
            const imageLien = `assets/photos/${photographerId}/${image}`;
            const photos = document.createElement("img");
            photos.setAttribute("src", imageLien);
            photos.setAttribute("alt", title);
            article.appendChild(photos);
        } else {
            const videoLien = `assets/photos/${photographerId}/${video}`;
            const videos = document.createElement("video");
            videos.setAttribute("title", title);
            videos.setAttribute("src", videoLien);
            article.appendChild(videos);
        }

        const div = document.createElement("div");
        div.className = "info-media";

        const titre = document.createElement("p");
        titre.className = "titre";
        titre.textContent = title;

        const coeur = document.createElement("span");
        coeur.className = "coeur";
        coeur.textContent = likes;

        const iconeCoeur = document.createElement("i");
        iconeCoeur.className = "fa-solid fa-heart";
        iconeCoeur.setAttribute("aria-label", "likes");

        article.appendChild(div);
        div.appendChild(titre);
        div.appendChild(coeur);
        coeur.appendChild(iconeCoeur);
        return article;
    }

    return { photographerId, getMediaCardDOM };
}
