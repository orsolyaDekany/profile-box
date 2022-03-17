import { Carousel } from "bootstrap";

export default class UserCarousel {
  constructor(root, carouselButtonEvent) {
    this.items = [];
    this.root = root;
    this.carouselButtonEvent = carouselButtonEvent;
    this.carousel = new Carousel(root);
  }

  addButtonEventListener(container) {
    container.addEventListener("click", (id) => {
      if (id.target.classList.contains("show-profile")) {
        this.carouselButtonEvent(id);
      }
    });
  }

  addItem(user) {
    this.items.push(user);
  }

  render(items) {
    this.items = items;

    for (let i = 0; i < items.length; i++) {
      let active = false;
      if (i === 0) {
        active = true;
      }
      this.renderItem(items[i], active);
    }
  }

  updateItem(item) {
    let userData = document.querySelector(
      ".card[data-id='" + item.getId() + "']"
    );

    userData.outerHTML = item.getTemplate();

    this.addButtonEventListener(userData);
  }

  removeItem(id) {
    this.items = this.items.filter(function (item, index, arr) {
      return item.id !== parseInt(id, 10);
    });

    let activeItem = document.querySelector(".active");
    let userData = document.querySelector(".card[data-id='" + id + "']");

    let nextSibling = userData.parentElement.nextElementSibling;

    if (activeItem !== null) {
      if (nextSibling) {
        nextSibling.classList.add("active");
      }
    }
    userData.parentElement.remove();
  }

  renderItem(user, active) {
    let mainDiv = document.getElementById("carouselInner");
    let div = document.createElement("div");
    div.classList.add("carousel-item");

    if (active) {
      div.classList.add("active");
    }

    div.innerHTML = user.getTemplate();

    mainDiv.append(div);

    this.addButtonEventListener(div);
  }

  to(index) {
    this.carousel.to(index);
  }

  toItem() {
    this.to(this.items.length - 1);
  }
}
