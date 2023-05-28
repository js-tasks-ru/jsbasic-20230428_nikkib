import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;
  #slides = '';
  slideCount = 0;
  slidesCount = 0;
  translatePosition = 0;

  constructor(slides) {
    this.#slides = slides;
    this.elem = this.#render();
    this.slideCount = 1;
    this.slidesCount = this.#countSlides();
    this.translatePosition = 0;
  }

  #render() {
    let carousel = createElement(this.#carouselTemplate());
    let carouselInner = carousel.querySelector('.carousel__inner');
    let carouselArrowRight = carousel.querySelector('.carousel__arrow_right'); 
    let carouselArrowLeft = carousel.querySelector('.carousel__arrow_left');
    carouselArrowLeft.style.display = 'none';

    for (let item of this.#slides) {
      let slide = createElement(this.#slideTemplate);
      
      //добавляем id
      slide.dataset.id = item.id;

      //записываем имя
      let title = slide.querySelector('.carousel__title');
      title.textContent = item.name;

      //записываем цену
      let price = slide.querySelector('.carousel__price');
       price.textContent = '€' + item.price.toFixed(2);

      //записываем картинку
      let image = slide.querySelector('.carousel__img');
      image.setAttribute('src', '/assets/images/carousel/' + item.image);

      //назначаем событие при клике на кнопке
      let button = slide.querySelector('.carousel__button');
      button.addEventListener('click', this.#clickButton);
      
      //добавляем слайд к карусели
      carouselInner.append(slide);
      let iid = item.id;
    }

    //назначаем событие при клике на стрелки
    carouselArrowRight.addEventListener('click', this.#clickArowRight);
    carouselArrowLeft.addEventListener('click', this.#clickArowLeft);

    return carousel;
  }

  #clickButton = (event) => {
    let id = event.target.closest('.carousel__slide').getAttribute('data-id');

    let eventCustCarousel = new CustomEvent("product-add", {
      detail: id,
      bubbles: true
    })
  
    event.currentTarget.dispatchEvent(eventCustCarousel);
  }

  #countSlides = () => {
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let slidesCount = 0;
      for (let item of this.#slides) {
        slidesCount++;
      }
    return slidesCount;
  }

  #clickArowRight = () => {
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let carouselSlideWidth = this.elem.querySelector('.carousel__img').offsetWidth;
    this.translatePosition += carouselSlideWidth;
    carouselInner.style.transform = 'translateX(-' + this.translatePosition +'px)';
    this.slideCount++;
    this.#arrowsCheck();
  }

  #clickArowLeft = () => {
    let carouselInner = this.elem.querySelector('.carousel__inner');
    let carouselSlideWidth = this.elem.querySelector('.carousel__img').offsetWidth;
    this.translatePosition -= carouselSlideWidth;
    carouselInner.style.transform = 'translateX(-' + this.translatePosition +'px)';
    this.slideCount--;
    this.#arrowsCheck();
  }

  #arrowsCheck = () => {
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right'); 
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    if (this.slideCount == 1) {
      carouselArrowLeft.style.display = 'none';
    } else if (this.slideCount == this.slidesCount) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
  }

  #carouselTemplate() {
    return `
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      <div class="carousel__inner">
      </div>
    </div>
    `
  }

  #slideTemplate() {
    return `
      <div class="carousel__slide"  data-id="">
        <img class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price"></span>
          <div class="carousel__title"></div>
          <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
  }
}
