export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

    if (amount == 1) {
      cartItem.count++
    } else if (amount == -1) {
      cartItem.count--
    }

    //удаляем элемент из массива
    if (!cartItem.count) {
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

