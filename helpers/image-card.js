function imageCard(image) {
  return ` <a href="${image.largeImageURL}"><img class="photo-card"
        src=${image.webformatURL}
        class="card-list__image"
        data-source="${image.largeImageURL}"
        
      />
     </a>
  `;
}
export default imageCard;
