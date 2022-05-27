/**
 * It takes a data object as an argument, and returns an object with two properties: photographerId and
 * getMediaCardDOM
 * @param data - the data object that contains all the information about the media
 * @returns The function mediaFactory is being returned.
 */
// eslint-disable-next-line no-unused-vars
function mediaFactory(data) {
  const { photographerId, image, video, likes, title, id } = data;

  function getMediaCardDOM() {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);

    if (image) {
      // Create image
      const imageLien = `assets/photos/${photographerId}/${image}`;
      const photos = document.createElement("img");
      photos.setAttribute("src", imageLien);
      photos.setAttribute("alt", title);
      photos.setAttribute("loading", "lazy");
      photos.className = "gallery-media";
      photos.setAttribute("data-id", id);
      photos.setAttribute("tabindex", "0");
      article.appendChild(photos);
    } else {
      // Create video
      const videoLien = `assets/photos/${photographerId}/${video}`;
      const videos = document.createElement("video");
      videos.setAttribute("title", title);
      videos.setAttribute("src", videoLien);
      videos.className = "gallery-media";
      videos.setAttribute("data-id", id);
      videos.setAttribute("tabindex", "0");
      article.appendChild(videos);
    }

    const div = document.createElement("div");
    div.className = "info-media";

    // Title
    const titre = document.createElement("p");
    titre.className = "title";
    titre.setAttribute("tabindex", "0");
    titre.textContent = title;

    // Like
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
    iconeCoeur.setAttribute("role", "button");

    article.appendChild(div);
    div.appendChild(titre);
    div.appendChild(coeur);
    coeur.appendChild(like);
    coeur.appendChild(iconeCoeur);
    return article;
  }

  return { photographerId, getMediaCardDOM };
}
