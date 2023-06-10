import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  elem = null;
  #product = '';
  title = '';
  price = 0;
  src = '';

  constructor(product) {
    this.#product = product;
    this.elem = this.#render();
  }

  #render() {
    this.title = this.#product.name;
    this.price = '€' + this.#product.price.toFixed(2);
    this.src = '/assets/images/products/' + this.#product.image;

    const table = createElement(this.#template());

    //записываем имя -- без переменной
    //let title = table.querySelector('.card__title');
    //title.textContent = this.#product.name;

    //записываем цену -- без переменной
    //let price = table.querySelector('.card__price');
    //price.textContent = '€' + this.#product.price.toFixed(2);

    //записываем картинку -- без переменной
    //let image = table.querySelector('.card__image');
   // image.setAttribute('src', '/assets/images/products/' + this.#product.image);

    //вариант добавления события на кнопку без свойства со стрелочной функцией
    /*let button = table.querySelector('.card__button');
    let id = this.#product.id
    
    button.addEventListener('click', function(event) {
      let addEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      })

      this.dispatchEvent(addEvent);
    });*/

    //добавляем событие на кнопку
    let button = table.querySelector('.card__button');
    button.addEventListener('click', this.#addEvent);

    return table;
  }

  #template = () => {
    
    return `
      <div class="card 2">
      <div class="card__top">
        <img class="card__image" alt="product" src="${this.src}">
        <span class="card__price">${this.price}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.title}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
  }

  #addEvent = (event) => {
    let id = this.#product.id;

    let eventCust = new CustomEvent("product-add", {
      detail: id,
      bubbles: true
    })

    event.target.dispatchEvent(eventCust);

  }

}


