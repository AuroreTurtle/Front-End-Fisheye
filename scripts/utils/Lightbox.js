class Lightbox {
    constructor(listeElement) {
        this.currentElement = null;
        this.listeElement = listeElement;
        this.manageEvent();
    }

    show(id) {
        this.currentElement = this.getElementById(id);
        this.display();
    }

    next() {
        let index = this.listeElement.findIndex((element) => element.id == this.currentElement.id);
        if (index == this.listeElement.length - 1) {
            this.currentElement = this.listeElement[0];
        } else {
            this.currentElement = this.listeElement[index + 1];
        }
        this.display();
    }

    previous() {
        let index = this.listeElement.findIndex((element) => element.id == this.currentElement.id);

        if (index == 0) {
            this.currentElement = this.listeElement[this.listeElement.length - 1];
        } else {
            this.currentElement = this.listeElement[index - 1];
        }
        this.display();
    }

    close() {
        document.querySelector(".lightbox").classList.remove("show");
    }

    manageEvent() {
        document.querySelector(".lightbox__next").addEventListener("click", () => {
            this.next();
        });

        document.querySelector(".lightbox__prev").addEventListener("click", () => {
            this.previous();
        });

        document.querySelector(".lightbox__close").addEventListener("click", () => {
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
        return this.listeElement.find((element) => element.id == id);
    }

    display() {
        let image = document.querySelector(".lightbox__image");
        let video = document.querySelector(".lightbox__video");
        let titre = document.querySelector(".lightbox__titre");

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
                .querySelector(".lightbox__video track")
                .setAttribute("src", `assets/photos/${this.currentElement.photographerId}/track.vtt`);
            document.querySelector(".lightbox__video track").setAttribute("default", true);
            document.querySelector(".lightbox__video track").setAttribute("kind", "captions");
            titre.innerHTML = this.currentElement.title;
            document.querySelector(".lightbox").classList.add("show");
        }
    }
}
