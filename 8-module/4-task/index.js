import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    //создаем объект товара, добавляемого в корзину 
    let cartItem = {
      product,
      count: 1
    }

    //проверяем, есть ли такой товар в корзине
    if (this.cartItems.length == 0) {
      this.cartItems.push(cartItem);
    } else {
      let index = this.cartItems.findIndex(item => item.product.id == product.id);

      if (index == -1) {//совпадения не найдены
        this.cartItems.push(cartItem);
      } else {
        this.cartItems[index].count++;
      }
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    //ищем товар в корзине
    let index = this.cartItems.findIndex(item => item.product.id == productId);
    let cartItem = this.cartItems[index];

    if (cartItem) {
      if (amount == 1) {
        cartItem.count++;
      } else if (amount == -1) {
        cartItem.count--;
      }
    } else {
      console.log('нет товара');
    }
    

    //удаляем элемент из массива
    if (cartItem.count == 0) {
      this.cartItems.splice(index, 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let totalCount = this.cartItems.reduce((total, item) => total + item.count, 0);
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    //создаем верстку для всех продуктов в корзине
    let node = document.createElement('div');
    for (let cartItem of this.cartItems) {
      let cartItemElem = this.renderProduct(cartItem.product, cartItem.count);
      node.append(cartItemElem);
    }

    //добавляем обработчики добавления/удаления товаров
    let buttonsPlus = node.querySelectorAll('.cart-counter__button_plus');
    let buttonsMinus = node.querySelectorAll('.cart-counter__button_minus');

    buttonsPlus.forEach(item => {item.addEventListener('click', this.buttonAddItem)});
    buttonsMinus.forEach(item => {item.addEventListener('click', this.buttonDeleteItem)});

    let orderForm = this.renderOrderForm();
    orderForm.onsubmit = (event) => this.onSubmit(event);

    node.append(orderForm);

    this.modal.setBody(node);
    this.modal.open();
  }

  buttonAddItem = (event) => {
    let id = event.target.closest('[data-product-id]').dataset.productId;
    
    this.updateProductCount(id, 1);
  }

  buttonDeleteItem = (event) => {
    let id = event.target.closest('[data-product-id]').dataset.productId;

    this.updateProductCount(id, -1);
  }


  onProductUpdate(cartItem) {

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id;
      let modalBody = document.querySelector('.modal__body');

      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
      infoPrice.innerHTML = `€${(this.getTotalPrice()).toFixed(2)}`;

      if (this.isEmpty()) {
        this.modal.close();
      };
    }

    this.cartIcon.update(this);
  }

  onSubmit = (event) => {
    event.preventDefault();

    let form = document.forms[0];
    let formData = new FormData(form);
    let buttonSubmit = form.querySelector('button[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    const result = fetch('https://httpbin.org/post', {
      body: formData,
      method: 'POST'
    });

    result.then((response) => {
      this.modal.setTitle('Success!');
      this.cartItems.length = 0;
      let node = `<div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>`
      document.querySelector('.modal__body').innerHTML = node;
    })
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

