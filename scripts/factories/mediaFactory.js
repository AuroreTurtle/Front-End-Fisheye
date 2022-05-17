function mediaFactory(data) {
    const { photographerId, image, video, likes, title, id } = data;

    function getMediaCardDOM() {
        const article = document.createElement("article");
        article.setAttribute("data-id", id);

        if (image) {
            const imageLien = `assets/photos/${photographerId}/${image}`;
            const photos = document.createElement("img");
            photos.setAttribute("src", imageLien);
            photos.setAttribute("alt", title);
            photos.className = "galery-media";
            photos.setAttribute("data-id", id);
            photos.setAttribute("tabindex", "0");
            article.appendChild(photos);
        } else {
            const videoLien = `assets/photos/${photographerId}/${video}`;
            const videos = document.createElement("video");
            videos.setAttribute("title", title);
            videos.setAttribute("src", videoLien);
            videos.className = "galery-media";
            videos.setAttribute("data-id", id);
            videos.setAttribute("tabindex", "0");
            article.appendChild(videos);
        }

        const div = document.createElement("div");
        div.className = "info-media";

        const titre = document.createElement("p");
        titre.className = "title";
        titre.setAttribute("tabindex", "0");
        titre.textContent = title;

        const coeur = document.createElement("span");
        coeur.className = "like";
        coeur.setAttribute("data-id", id);
        coeur.setAttribute("tabindex", "0");
        const like = document.createElement("p");
        like.className = "like_number";
        like.setAttribute("data-id", id);

        like.textContent = likes;

        const iconeCoeur = document.createElement("i");
        iconeCoeur.className = "fa-solid fa-heart";
        iconeCoeur.setAttribute("aria-label", "likes");

        article.appendChild(div);
        div.appendChild(titre);
        div.appendChild(coeur);
        coeur.appendChild(like);
        coeur.appendChild(iconeCoeur);
        return article;
    }

    return { photographerId, getMediaCardDOM };
}
