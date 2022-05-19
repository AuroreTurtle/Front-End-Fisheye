/**
 * It fetches the JSON file, and returns the JSON data.
 * @returns a promise.
 */
async function getPhotographers() {
  // utilisation de await car fonction async
  const photographers = await fetch("./data/photographers.json");
  return photographers.json();
}

/**
 * It takes an array of photographer objects, loops through them, creates a photographer model for each
 * one, and then appends the DOM element for each photographer model to the DOM
 * @param photographers - an array of photographer objects
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * It fetches the data from the API, then displays it on the page
 */
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
