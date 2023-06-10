import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    //создаем карусель
    let carouselHolder = document.querySelector('[data-carousel-holder]');
    let carousel = new Carousel(slides);
    carouselHolder.append(carousel.elem);

    //создаем меню
    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    let menu = new RibbonMenu(categories);
    ribbonHolder.append(menu.elem);

    //создаем слайдер
    let sliderHolder = document.querySelector('[data-slider-holder]');
    let slider = new StepSlider({steps: 5, value: 3});
    sliderHolder.append(slider.elem);

    //создаем иконку корзины
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    let cartIcon = new CartIcon();
    cartIconHolder.append(cartIcon.elem);    

    //создаем корзину
    let cart = new Cart(cartIcon);     

    //показываем список товаров
    let response = await fetch('products.json');
    let products = await response.json();
    let productsGridHolder = document.querySelector('[data-products-grid-holder]');
    let productsGrid = new ProductsGrid(products);
    productsGridHolder.innerHTML = '';
    productsGridHolder.append(productsGrid.elem);

    //устанавливаем значения для фильтра
    productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: slider.value,
      category: menu.value
    });
    
    //отслеживаем событие добавления в корзину
    document.body.addEventListener('product-add', ({detail: id}) => {
      let productToAdd = products.find(item => item.id == id);
      cart.addProduct(productToAdd);
    });

    //отслеживаем событие изменения слайдера
    sliderHolder.addEventListener('slider-change', ({detail: stepActiveValue}) => {
      productsGrid.updateFilter({
        maxSpiciness: stepActiveValue
      });
    });

    //отслеживаем событие изменения меню
    ribbonHolder.addEventListener('ribbon-select', ({detail: id}) => {
      productsGrid.updateFilter({
        category: id
      });
    });

    //отслеживаем событие изменения чекбокса - выбор "без орехов"
    let checkNuts = document.getElementById('nuts-checkbox');
    checkNuts.addEventListener('change', (event) => {
      productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    //отслеживаем событие изменения чекбокса - выбор "вегетарианское"
    let checkVeg = document.getElementById('vegeterian-checkbox');
    checkVeg.addEventListener('change', (event) => {
      productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}
