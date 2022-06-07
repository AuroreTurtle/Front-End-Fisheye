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
      (element) => element.id === this.currentElement.id
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
      (element) => element.id === this.currentElement.id
    );

    if (index === 0) {
      this.currentElement = this.listeElement[this.listeElement.length - 1];
    } else {
      this.currentElement = this.listeElement[index - 1];
    }
    this.display();
  }

  /**
   * When the close button is clicked, remove the class "show" from the lightbox and close the lightbox
   */
  // eslint-disable-next-line class-methods-use-this
  close() {
    document.querySelector(".lightbox").classList.remove("show");
    document.querySelector(".gallery-media").focus();
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
    return this.listeElement.find((element) => element.id === parseInt(id, 10));
  }

  /**
   * It displays the current element in the lightbox
   */
  display() {
    const image = document.querySelector(".lightbox_image");
    const video = document.querySelector(".lightbox_video");
    video.innerHTML = `<track default src="assets/photos/${this.currentElement.photographerId}/track.vtt" kind="captions" />`;
    const titleMedia = document.querySelector(".lightbox_title");

    if (this.currentElement.image) {
      video.style.display = "none";
      image.style.display = "block";
      image.focus({ preventScroll: true });
      image.setAttribute("tabindex", "0");
      image.src = `assets/photos/${this.currentElement.photographerId}/${this.currentElement.image}`;
      image.setAttribute("alt", this.currentElement.title);
      titleMedia.textContent = this.currentElement.title;
      titleMedia.setAttribute("tabindex", "0");
      document.querySelector(".lightbox").classList.add("show");
    } else {
      video.style.display = "block";
      image.style.display = "none";
      video.focus({ preventScroll: true });
      video.src = `assets/photos/${this.currentElement.photographerId}/${this.currentElement.video}`;
      titleMedia.textContent = this.currentElement.title;
      titleMedia.setAttribute("tabindex", "0");
      document.querySelector(".lightbox").classList.add("show");
    }
  }
}
