/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* global  Lightbox, mediaFactory, updateName, profileFactory */
/* eslint no-undef: "error" */

/**
 * It fetches the JSON file and returns the JSON data
 * @returns The data from the JSON file.
 */
async function getData() {
  const response = await fetch("./data/photographers.json");
  return response.json();
}

/**
 * It gets the photographer id from the URL
 * @returns The photographer's id.
 */
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
}

/**
 * It takes an array of media objects, loops through them, creates a media card for each one, and
 * appends it to the DOM
 * @param medias - an array of media objects
 */
async function displayMedia(medias) {
  const mediasSection = document.querySelector(".gallery");

  medias.forEach((media) => {
    const profile = getPhotographerId();
    if (media.photographerId === profile) {
      const mediaModel = mediaFactory(media);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      mediasSection.appendChild(mediaCardDOM);
    }
  });
}

/**
 * It displays the lightbox when the user clicks on a media
 * @param medias - the array of medias
 */
async function displayLightbox(medias) {
  const profile = getPhotographerId();

  const listItem = [];
  for (const element in medias) {
    if (medias[element].photographerId === profile) {
      listItem.push(medias[element]);
    }
  }

  const lightbox = new Lightbox(listItem);

  document.querySelectorAll(".gallery .gallery-media").forEach((mediaDom) => {
    mediaDom.addEventListener("click", (e) => {
      lightbox.show(e.currentTarget.dataset.id);
    });
  });

  document.querySelectorAll(".gallery .gallery-media").forEach((mediaDom) => {
    mediaDom.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        lightbox.show(e.currentTarget.dataset.id);
      }
    });
  });
}

// Like
/**
 * It adds an event listener to each like button, and when the button is clicked, it increments or
 * decrements the number of likes of the corresponding media
 * @param medias - an array of objects containing the data of the medias
 */
function countLike(medias) {
  const likes = document.querySelectorAll(".like");

  likes.forEach((element) => {
    element.addEventListener("click", (e) => {
      const numberLikes = element.querySelector(".like_number");
      const likesTotal = document.querySelector(".like_total");
      const mediaID = e.target
        .closest("article")
        .querySelector(".gallery-media")
        .getAttribute("data-id");
      const mediaLikes = medias.find((el) => el.id === parseInt(mediaID, 10));

      if (mediaLikes.like === "liked") {
        numberLikes.textContent = parseInt(numberLikes.textContent, 10) - 1;
        mediaLikes.likes -= 1;
        mediaLikes.like = "";
        likesTotal.textContent = parseInt(likesTotal.textContent, 10) - 1;
      } else {
        numberLikes.textContent = parseInt(numberLikes.textContent, 10) + 1;
        likesTotal.textContent = parseInt(likesTotal.textContent, 10) + 1;
        mediaLikes.likes += 1;
        mediaLikes.like = "liked";
      }
    });
  });

  likes.forEach((element) => {
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const numberLikes = element.querySelector(".like_number");
        const likesTotal = document.querySelector(".like_total");
        const mediaID = e.target
          .closest("article")
          .querySelector(".gallery-media")
          .getAttribute("data-id");
        const mediaLikes = medias.find((el) => el.id === parseInt(mediaID, 10));

        if (mediaLikes.like === "liked") {
          numberLikes.textContent = parseInt(numberLikes.textContent, 10) - 1;
          mediaLikes.likes -= 1;
          mediaLikes.like = "";
          likesTotal.textContent = parseInt(likesTotal.textContent, 10) - 1;
        } else {
          numberLikes.textContent = parseInt(numberLikes.textContent, 10) + 1;
          likesTotal.textContent = parseInt(likesTotal.textContent, 10) + 1;
          mediaLikes.likes += 1;
          mediaLikes.like = "liked";
        }
      }
    });
  });
}

/**
 * It takes in an array of media objects, finds the media objects that belong to the current user, and
 * then adds up the number of likes for those media objects
 * @param medias - the array of objects that contains all the media data
 */
function likeTotal(medias) {
  const profile = getPhotographerId();

  const likes = [];
  for (const element in medias) {
    if (medias[element].photographerId === profile) {
      likes.push(medias[element]);
    }
  }

  let totalLike = 0;
  likes.forEach((element) => {
    totalLike += parseInt(element.likes, 10);
  });

  document.querySelector(".like_total").textContent = totalLike;
}

// Tri
/**
 * It sorts the media array by likes in descending order, then it clears the gallery div, then it
 * displays the media, then it displays the lightbox, then it adds the like functionality
 * @param media - the array of media objects
 */
function sortPopular(media) {
  media.sort((a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }
    if (a.likes > b.likes) {
      return -1;
    }
    return 0;
  });
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  displayMedia(media);
  displayLightbox(media);
  countLike(media);
}

/**
 * It sorts the media array by date, then it displays the media, the lightbox and the like function
 * @param media - the array of objects that contains all the media
 */
function sortDate(media) {
  media.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  displayMedia(media);
  displayLightbox(media);
  countLike(media);
}

/**
 * It sorts the media array by title, then displays the media in the gallery, and adds the lightbox and
 * like functionality
 * @param media - the array of objects that we want to sort
 */
function sortTitle(media) {
  media.sort((a, b) => {
    if (a.title > b.title) {
      return 1;
    }
    if (a.title < b.title) {
      return -1;
    }
    return 0;
  });
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  displayMedia(media);
  displayLightbox(media);
  countLike(media);
}

/**
 * It sorts the media by popularity, date or title
 * @param media - the array of objects to sort
 */
function sortMedia(media) {
  const getSelection = document.getElementById("select_option");
  getSelection.addEventListener("click", (e) => {
    if (e.target.dataset.sort === "Popularité") {
      sortPopular(media);
    } else if (e.target.dataset.sort === "Date") {
      sortDate(media);
    } else if (e.target.dataset.sort === "Titre") {
      sortTitle(media);
    } else {
      console.log("Not found");
    }
  });

  getSelection.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (e.target.dataset.sort === "Popularité") {
        e.target.classList.add("selected");
        updateName(e.target);
        sortPopular(media);
      } else if (e.target.dataset.sort === "Date") {
        e.target.classList.add("selected");
        updateName(e.target);
        sortDate(media);
      } else if (e.target.dataset.sort === "Titre") {
        e.target.classList.add("selected");
        updateName(e.target);
        sortTitle(media);
      } else {
        console.log("Not found");
      }
    }
  });
}

// Display profile
/**
 * It takes an array of photographer objects, loops through them, and displays the profile of the
 * photographer whose id matches the id in the url
 * @param photographers - an array of photographer objects
 */
async function displayProfile(photographers) {
  photographers.forEach((photographer) => {
    const profile = getPhotographerId();
    if (photographer.id === profile) {
      const profileModel = profileFactory(photographer);
      profileModel.getProfileCardDOM();
    }
  });
}

/**
 * The function is an async function that calls the getData function. The function then calls the
 * displayProfile, displayMedia, displayLightbox, countLike, likeTotal, and sortMedia functions, passing
 * in the media array as an argument
 */
async function init() {
  const { media, photographers } = await getData();
  displayProfile(photographers);
  displayMedia(media);
  displayLightbox(media);
  countLike(media);
  likeTotal(media);
  sortMedia(media);
}

init();
