/* It's a class that manages the lightbox : the display, navigation and close */
// eslint-disable-next-line no-unused-vars
class Lightbox {
  constructor(listeElement) {
    this.currentElement = null;
    this.listeElement = listeElement;
    this.manageEvent();
  }

  /**
   * The function takes an id as an argument and sets the currentElement to the element with
   * that id
   * @param id - The id of the element to show.
   */
  show(id) {
    this.currentElement = this.getElementById(id);
    this.display();
  }

  /**
   * It finds the index of the current element in the list of elements, and then sets the current
   * element to the next element in the list
   */
  next() {
    const index = this.listeElement.findIndex(
      // eslint-disable-next-line eqeqeq
      (element) => element.id == this.currentElement.id
    );
    if (index === this.listeElement.length - 1) {
      // eslint-disable-next-line prefer-destructuring
      this.currentElement = this.listeElement[0];
    } else {
      this.currentElement = this.listeElement[index + 1];
    }
    this.display();
  }

  /**
   * If the current element is the first element in the list, then the current element is the last
   * element in the list. Otherwise, the current element is the previous element in the list
   */
  previous() {
    const index = this.listeElement.findIndex(
      // eslint-disable-next-line eqeqeq
      (element) => element.id == this.currentElement.id
    );

    if (index === 0) {
      this.currentElement = this.listeElement[this.listeElement.length - 1];
    } else {
      this.currentElement = this.listeElement[index - 1];
    }
    this.display();
  }

  // eslint-disable-next-line class-methods-use-this
  close() {
    document.querySelector(".lightbox").classList.remove("show");
  }

  /**
   * It adds event listeners to the next, previous, and close buttons, as well as the escape key and
   * the arrow keys
   */
  manageEvent() {
    document.querySelector(".lightbox_next").addEventListener("click", () => {
      this.next();
    });

    document.querySelector(".lightbox_prev").addEventListener("click", () => {
      this.previous();
    });

    document.querySelector(".lightbox_close").addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        this.close();
      }

      if (e.key === "ArrowRight") {
        this.next();
      }

      if (e.key === "ArrowLeft") {
        this.previous();
      }
    });
  }

  getElementById(id) {
    // eslint-disable-next-line eqeqeq
    return this.listeElement.find((element) => element.id == id);
  }

  /**
   * It displays the current element in the lightbox
   */
  display() {
    const image = document.querySelector(".lightbox_image");
    const video = document.querySelector(".lightbox_video");
    const titre = document.querySelector(".lightbox_title");

    if (this.currentElement.image) {
      video.style.display = "none";
      image.style.display = "block";
      image.src = `assets/photos/${this.currentElement.photographerId}/${this.currentElement.image}`;
      image.setAttribute("alt", this.currentElement.title);
      titre.innerHTML = this.currentElement.title;
      document.querySelector(".lightbox").classList.add("show");
    } else {
      video.style.display = "block";
      image.style.display = "none";
      video.src = `assets/photos/${this.currentElement.photographerId}/${this.currentElement.video}`;
      document
        .querySelector(".lightbox_video track")
        .setAttribute(
          "src",
          `assets/photos/${this.currentElement.photographerId}/track.vtt`
        );
      document
        .querySelector(".lightbox_video track")
        .setAttribute("default", true);
      document
        .querySelector(".lightbox_video track")
        .setAttribute("kind", "captions");
      titre.innerHTML = this.currentElement.title;
      document.querySelector(".lightbox").classList.add("show");
    }
  }
}
