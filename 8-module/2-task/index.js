import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {

  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
  }

  #render = () => {
    //начальная отрисовка списка продуктов
    let productGrid = createElement(this.#template());

    let productGridInner = productGrid.querySelector('.products-grid__inner');

    for (let product of this.products) {
      let productCard = new ProductCard(product);
      productGridInner.append(productCard.elem);
    }

    return productGrid;
  }

  #template() {
    return `
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>
    `
  }

  //подсмотрела реализацию в интернете...
  updateFilter = (filters) => {
    //обновляем список фильтров, если фильтр с каким-то именем свойства есть, он будет перезаписан, если нет - добавлен
    Object.assign(this.filters, filters);

    //очищаем список продуктов
    let productGridInner = this.elem.querySelector('.products-grid__inner');
    productGridInner.innerHTML = '';

    //формируем новый список, соответствующий фильтрам
    for (let product of this.products) {
      //если есть фильтр "без орехов" и продукт содержит орехи, пропускаем продукт и переходим к следующему
      if (this.filters.noNuts && product.nuts) {
        continue;
      }
      //если есть фильтр "вегетарианское" и не указано, что продукт вегетарианский, пропускаем его и переходим к следующему
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }
      //если есть фильтр "максимальная острота" и острота продукта больше требуемой, пропускаем продукт
      if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
        continue;
      }
      //если есть фильтр "категория" и продукт не соответствует этой категории, пропускаем его
      if (this.filters.category && product.category !== this.filters.category) {
        continue;
      }

      //добавляем продукт в грид
      let productCard = new ProductCard(product);
      productGridInner.append(productCard.elem);
    }
  }
}
