// https://pixabay.com/api/
// ?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ

// Your API key: 15648239-f04327e653c12632b027fe07a

const URL =
  "https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal";

export default {
  page: 1,
  query: "",
  per_page: 20,
  key: "15648239-f04327e653c12632b027fe07a",
  fetchItem() {
    const key = "15648239-f04327e653c12632b027fe07a";
    return fetch(
      `${URL}&q=${this.query}&page=${this.page}&per_page=${this.per_page}&key=${key}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.page += 1;
        return data;
      })
      .catch((err) => console.log(err));
  },
  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },

  resetPage() {
    this.page = 1;
  },
};
