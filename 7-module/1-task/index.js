import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #categories = '';
  elem = '';

  constructor(categories) {
    this.#categories = categories;
    this.elem = this.#render();
  }

  #render() {
    //без хэлпера createElement потренироваться
    //создаем корневой элемент меню
    const ribbon = document.createElement('div');
    ribbon.classList.add('ribbon');
  
    //создаем левую стрелку
    const arrowLeft = document.createElement('button');
    arrowLeft.className = 'ribbon__arrow ribbon__arrow_left';
    arrowLeft.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    ribbon.append(arrowLeft);

    //создаем ссылки меню
    const categoriesList = this.#categories.map(item => `<a href="http://www.say7.info" class="ribbon__item" data-id=${item.id}>${item.name}</a>`).join('');
    const ribbonInner = document.createElement('nav');
    ribbonInner.classList.add('ribbon__inner');
    ribbonInner.innerHTML = categoriesList;
    ribbonInner.firstElementChild.classList.add('ribbon__item_active');
    ribbon.append(ribbonInner);

    //создаем правую стрелку
    const arrowRight = document.createElement('button');
    arrowRight.className = 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
    arrowRight.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    ribbon.append(arrowRight);

    //назначаем события при клике на стрелки, меню и прокрутке
    arrowRight.addEventListener('click', this.#clickArrowRight);
    arrowLeft.addEventListener('click', this.#clickArrowLeft);
    ribbonInner.addEventListener('scroll', this.#scrollRibbon);
    for (let i = 0; i <= ribbonInner.querySelectorAll('.ribbon__item').length - 1; i++) {
      ribbonInner.querySelectorAll('.ribbon__item')[i].onclick = this.#clickMenu;
    }

    return ribbon;
  }

  #clickMenu = (event) => {
    //отменяем событие по умолчанию
    event.preventDefault();

    //выделяем активную ссылку
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let activeMenuItem = ribbonInner.querySelector('.ribbon__item_active');

    activeMenuItem.classList.remove('ribbon__item_active');
    activeMenuItem = event.target;
    activeMenuItem.classList.add('ribbon__item_active');

    //создаем пользовательское событие
    let id = event.target.getAttribute('data-id');

    let selectMenu = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    })

    event.target.dispatchEvent(selectMenu);
  }

  #clickArrowLeft = () => {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(-350, 0);
  }

  #clickArrowRight = () => {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);
  }

  #scrollRibbon = () => {
    let ribbon = this.elem.querySelector('.ribbon');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft == 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }
  }
}