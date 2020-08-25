// function renderForm() {
//   return;
//   `<form id="search-form">
//       <input
//         type="text"
//         name="query"
//         autocomplete="off"
//         placeholder="Search images..."
//       />
//     </form>
// <ul class="gallery" id="gallery"></ul>
//   <button type="button" disabled="true" class="load-more-btn" data-action="Load more">Load more</button>`;
// }
// export default renderForm;

function renderForm() {
  return `<form id="search-form">
      <input
         type="text"
         name="query"
         autocomplete="off"
         placeholder="Search images..."
         class="input"
       />
       <button type="button" class ="load-more-btn" data-action="Load more">Load more</button>
     </form>`;
}
export default renderForm;
