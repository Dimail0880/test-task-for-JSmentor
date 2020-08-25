// TASK-3

import apiService from "../helpers/apiService.js";
import imageCard from "../helpers/image-card.js";
import renderForm from "../helpers/render-form.js";

class ImageSearch {
  constructor() {
    this.name = 0;
    this.root = document.querySelector("#root");
    this.galleryListAction = document.querySelector(".js-gallery");
  }
  renderMarkup() {
    this.root.insertAdjacentHTML("beforeBegin", renderForm());
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
    const infScroll = new InfiniteScroll(gallery, {
      responseType: "text",
      history: false,
      loadOnScroll: true,
      path: function () {
        return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${apiService.query}&page=${apiService.page}&per_page=20&key=${apiService.key}`;
      },
    });
    infScroll.on("load", (response) => {
      const data = JSON.parse(response);
      const list = data.hits;
      list.map((el) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.insertAdjacentHTML("beforeend", imageCard(el));
        gallery.append(li);
      });
    });
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
  }

  start() {
    this.renderMarkup();
    this.addListeners();
  }
}

const imageSearch = new ImageSearch();
imageSearch.start();
