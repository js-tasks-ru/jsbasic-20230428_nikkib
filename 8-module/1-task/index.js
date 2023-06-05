import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  initialTopCoord = null;

  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    //проверяем, что иконка корзины видима
    if (!this.elem.offsetWidth) 
      return;

    //начальное положение корзины по вертикали
    if (!this.initialTopCoord) {
      this.initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    //определяем положение корзины по горизонтали
    let leftIndent = Math.min(
      document.querySelector('.container').getBoundingClientRect().right + 20,
      document.documentElement.clientWidth - this.elem.offsetWidth - 10
    ) + 'px'
    
    //определяем положение корзины относительно прокрутки
    if (window.pageYOffset > this.initialTopCoord) {
      this.elem.style = `position: fixed; top: 50px; zIndex: 9999; right: 10px; left: ${leftIndent}`;
    } else {
      this.elem.style = `position: ''; top: ''; zIndex: ''; left: ''`;
    }

    //если мобильный экран, обнуляем стили корзины
    if (document.documentElement.clientWidth <= 767) {
      this.elem.style = `position: ''; top: ''; zIndex: ''; left: ''`;
    }
  }
}
