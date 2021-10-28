import cardMarkup from '../templates/templ-card.hbs';

export function renderCardMarkup(data, selector) {
    const markup = cardMarkup(data);
    selector.insertAdjacentHTML('beforeend', markup);   
    
}