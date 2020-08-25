// function imageCard({ webformatURL, largeImageURL }) {
//   return;
//   ` <li class="photo-card">
//       <img
//         src="${webformatURL}"
//         class="card-list__image"
//         data-source="${largeImageURL}"
//       />
//   </li>`;
// }
// export default imageCard;

function imageCard(image) {
  //  <a href="${image.largeImageURL}"> </a>
  return ` <a href="${image.largeImageURL}"><img class="photo-card"
        src=${image.webformatURL}
        class="card-list__image"
        data-source="${image.largeImageURL}"
        
      />
     </a>
  `;
}
export default imageCard;

const modal = basicLightbox.create(`
    <div class="modal">
        <p>
            Your first lightbox with just a few lines of code.
            Yes, it's really that simple.
        </p>
    </div>
`);

// modal.show();
