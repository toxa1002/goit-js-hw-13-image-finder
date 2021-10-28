import './sass/main.scss';
import './js/apiService.js';
import  { renderCardMarkup } from './js/card-render.js';
import { error, alert } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
// import { debounce } from "debounce";
// import { fetchGetCards } from './js/apiService';
import ApiService from './js/apiService';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';


const refs = {
 loadBtn: document.querySelector('[data-action="load-more"]'),
 search: document.querySelector('#search-form'),
 gallery: document.querySelector('.gallery'),
};

const apiService = new ApiService();

refs.search.addEventListener('submit', onSubmit);
refs.loadBtn.addEventListener('click', onLoadMore);
refs.loadBtn.hidden = true;
refs.gallery.addEventListener('click',onImgClick);


function onImgClick(evt) {
    
   const src = evt.target.dataset.src; 
   if (src) {
    const instance = basicLightbox.create(`
    <img class = “imgModal” src=${src} width=“1024” height=“768">`);
     instance.show();
   };
   

}

function resetMarkup () {
    refs.gallery.innerHTML = '';  
    
}

function onSubmit (event) {
   
    event.preventDefault();
    apiService.resetPage();
    resetMarkup ();
    apiService.value = event.currentTarget.elements.query.value;
    fetchValue();
    
};
 
async function fetchValue () {
    try {
      await apiService.fetchGetCards().then(hits => {
            if (hits.length > 0) {
        renderCardMarkup(hits,(refs.gallery));
        refs.loadBtn.disabled = false;
        refs.loadBtn.hidden = false;        
            } else {
                refs.loadBtn.hidden = true;
                errorMessage('По вашему запросу ничего не найдено')
            }
      });
      scrollTo();
    } catch  {
        refs.loadBtn.hidden = true;
        errorMessage("Попробуйте позже или обратитесь к администратору");
    }
};

function errorMessage (message) {
    const myError = error({
    text: message,
    hide: false,
    delay:1500,
    });
    setTimeout(() => {
        myError.hide = true;
    }, 200);
};

function onLoadMore(evt) {
    fetchValue();
};

function scrollTo () {
    const height = window.screen.height;
    const scrollHeight = window.pageYOffset;
    scroll = height + scrollHeight;
    window.scrollTo({
        top: scroll,
        behavior: "smooth",
    });
}
