function renderForm() {
  return `<form id="search-form">
      <input
         type="text"
         name="query"
         autocomplete="off"
         placeholder="Search images..."
         class="input"
       />
     </form>`;
}
export default renderForm;
