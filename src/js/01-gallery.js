import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items.js';

//get HTML ELEMENT
const gallery = document.querySelector('.gallery');

//gallery markup from gallery items Array of image objects
const galleryMarkup = galleryItems
  .map(
    image =>
      `<li class="gallery__item">
        <a class="gallery__item" href=${image.original}>
            <img class="gallery__image" src=${image.preview} alt="${image.description}" />
        </a>
    </li>`
  )
  .join('');

//add gallery html into DOM
gallery.insertAdjacentHTML('beforeEnd', galleryMarkup);

// initialize simple lightbox image library
//https://simplelightbox.com/
//var lightbox = new SimpleLightbox('.gallery a', { /* options */ });
let imageModal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
