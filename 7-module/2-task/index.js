import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = '';
  title = '';
  node = '';

  constructor(title, node) {
    this.title = title;
    this.node = node;
    this.elem = this.#render();
  }

  #render() {
    //создаем верстку модального окна
    const modal = createElement(this.#template());
    return modal;
  }

  open() {
    //добавляем модальное окно на страницу
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    //назначаем событие по клику на кнопку Х
    let closeButton = this.elem.querySelector('.modal__close');
    closeButton.addEventListener('click', this.close);

    //отлавливаем событие по клавише Esc
    document.addEventListener('keydown', this.#escape);
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

        <h3 class="modal__title"></h3>
      </div>

      <div class="modal__body">
      
      </div>
    </div>
    `
  }

  setTitle = (title) => {
    //записываем title
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.textContent = title;
  }

  setBody = (node) => {
    //записываем body
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  close = () => {
    //метод close(), срабатывает также по кнопке Х
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.#escape);
  }

  #escape = (event) => {
    //закрывает окно по кнопке Esc
    if (event.code === 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.#escape);
    }
  }
}
