// TASK-1

class StringBuilder {
  constructor(baseString = "") {
    this.value = baseString;
  }

  append(str) {
    this.value = this.value += str;
  }
  prepend(str) {
    this.value = `${str}${this.value}`;
  }
  pad(str) {
    this.value = `${str}${this.value}${str}`;
  }
}

const builder = new StringBuilder(".");
builder.append("^");
builder.prepend("^");
builder.pad("=");

console.log(builder); // '=^.^='

// TASK-2

const createBtn = document.querySelector("[data-action=create]");
const destroyBtn = document.querySelector("[data-action=destroy]");
const jsAmount = document.querySelector(".js-input");
const boxes = document.querySelector("#boxes");

function createBoxes(amount) {
  amount = Number(jsAmount.value);
  function createOneBox(count) {
    let div = document.createElement("div");
    function get_rand_color() {
      var color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);
      while (color.length < 6) {
        color = "0" + color;
      }
      return "#" + color;
    }
    div.style.background = get_rand_color();
    div.style.width = `${30 + count * 10}px`;
    div.style.height = `${30 + count * 10}px`;
    return div;
  }

  for (let i = 0; i < amount; i++) {
    let div = createOneBox(i);
    boxes.append(div);
  }
}

function destroyBoxes() {
  boxes.innerHTML = " ";
  jsAmount.value = null;
}
createBtn.addEventListener("click", createBoxes);
destroyBtn.addEventListener("click", destroyBoxes);

// TASK-3

import apiService from "./apiService.js";
import imageCard from "./image-card.js";
import renderForm from "./render-form.js";

class ImageSearch {
  constructor() {
    this.name = 0;
    this.root = document.querySelector("#root");
    this.galleryListAction = document.querySelector(".js-gallery");
  }
  renderMarkup() {
    this.root.insertAdjacentHTML("beforeend", renderForm());
    this.searchForm = document.querySelector("#search-form");
    this.input = document.querySelector(".input");
  }

  startSearch(e) {
    e.preventDefault();
    const gallery = document.querySelector("#gallery");
    const form = e.target.children;
    const input = form.query;
    const loadMoreBtn = document.querySelector(
      'button[data-action="Load more"]'
    );

    this.name = input.value;
    gallery.innerHTML = "";
    apiService.resetPage();
    apiService.searchQuery = this.name;
    apiService.fetchItem().then((data) => {
      const list = data.hits;
      list.map((el) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.insertAdjacentHTML("beforeend", imageCard(el));
        gallery.append(li);
      });
    });
    input.value = "";
  }

  loadMore() {
    apiService.fetchItem().then((data) => {
      const list = data.hits;
      list.map((el) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.insertAdjacentHTML("beforeend", imageCard(el));
        gallery.append(li);
      });
    });
  }

  openModal(e) {
    e.preventDefault();
    let url;
    url = e.target.dataset.source;
    const modal = basicLightbox.create(`
    <div class="modal">
        <img width="800"  src="${url}">
    </div>
`);
    modal.show();
  }

  addListeners() {
    const searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", this.startSearch);
    this.galleryListAction.addEventListener("click", this.openModal);

    window.addEventListener("scroll", () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = document.documentElement;

      if (clientHeight + scrollTop >= scrollHeight - 5) {
        let top = window.scrollY + 700;
        window.scrollTo({
          top: top,
          behavior: "smooth",
        });
        setTimeout(() => {
          this.loadMore();
        }, 2000);
      }
    });
  }

  start() {
    this.renderMarkup();
    this.addListeners();
  }
}

const imageSearch = new ImageSearch();
imageSearch.start();
