/**
 * It fetches the JSON file, and returns the JSON data.
 * @returns a promise.
 */
async function getPhotographers() {
  // utilisation de await car fonction async
  const photographers = await fetch("./data/photographers.json");
  // console.log(photographers);
  return photographers.json();
}

/* A function that takes the photographers array and displays it on the page. */
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * When the page loads, get the data from the API and display it on the page.
 */
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
