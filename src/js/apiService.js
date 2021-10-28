const KEY = '23968448-11f2d292972b337bbc3d525d1';
const URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';


export default class ApiService {
    constructor () {
        this.searchValue = '';
        this.page = 1;
    }
    async fetchGetCards () {
        return fetch(`${URL}${this.searchValue}&page=${this.page}&per_page=12&key=${KEY}`)
        .then(response =>response.json())
        .then(({hits}) =>{
            this.page+=1;
            return hits;
        });
    
    }
    get value () {
        return this.searchValue;

    }
    set value (newValue) {
        this.searchValue = newValue;
    }
    resetPage(){
        this.page = 1;
    }
}



 

