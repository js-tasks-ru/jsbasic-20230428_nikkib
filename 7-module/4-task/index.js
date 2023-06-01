import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;
  #shiftX = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.elem = this.#render();
  }

  #template() {
    return `
      <div class="slider">

        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
        </div>

      </div>
    `
  }

  #render() {
    let slider = createElement(this.#template());

    //создаем шаги слайдера
    let sliderSteps = slider.querySelector('.slider__steps');
    for (let i = 0; i < this.#steps; i++) {
      let step = document.createElement('span');
      sliderSteps.append(step);
    }

    //записываем начальное активное значение слайдера и назначаем класс
    let sliderValue = slider.querySelector('.slider__value');
    sliderValue.textContent = 0;
    sliderSteps.querySelectorAll('span')[0].classList.add("slider__step-active");
    let sliderProgress = slider.querySelector('.slider__progress');
    sliderProgress.style.width = 0;

    //отключаем встроенный обработчик перетаскивания
    let sliderThumb = slider.querySelector('.slider__thumb');
    sliderThumb.ondragstart = () => false;
  ////  sliderThumb.pointerdown = () => false;
  ////  sliderThumb.pointerup = () => false;

    //назначаем обработчик события при клике на слайдер
    slider.addEventListener('pointerdown', this.#onPointerDown);

    return slider;
  }

  #onPointerDown = (event) => { 
    document.addEventListener('pointermove', this.#onPointerMove);
    document.addEventListener('pointerup', this.#onPointerUp, { once: true });

    let sliderThumb = this.elem.querySelector('.slider__thumb');

    //определяем смещение позиционирования под курсором
  //  this.#shiftX = event.clientX - sliderThumb.getBoundingClientRect().left;
  }

  #onPointerMove = (event) => {
    this.elem.classList.add('slider_dragging');

    let sliderThumb = this.elem.querySelector('.slider__thumb');

    //перемещаем ползунок
    let xCoord = event.pageX - this.elem.getBoundingClientRect().left;// - this.#shiftX;

    if (xCoord < 0) {
      xCoord = 0;
    }

    if (xCoord > this.elem.getBoundingClientRect().width) {
      xCoord = this.elem.getBoundingClientRect().width;
    }

    sliderThumb.style.left = xCoord + 'px';

    //определяем активное число шагов
    let xCoordRelative = xCoord / this.elem.getBoundingClientRect().width;
    if (xCoordRelative < 0) {
      xCoordRelative = 0;
    }

    if (xCoordRelative > 1) {
      xCoordRelative = 1;
    }

    //закрашиваем пройденные шаги
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderProgressWidth = xCoordRelative * 100 ;
    sliderProgress.style.width = `${sliderProgressWidth}%`;

    //отображаем значение шага
    let approxValue = xCoordRelative * (this.#steps - 1);
    let activeValue = Math.round(approxValue);
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = activeValue;

    //убираем и назначаем активный класс
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let stepActive = sliderSteps.querySelector('.slider__step-active');
    stepActive.classList.remove('slider__step-active');
    stepActive = sliderSteps.querySelectorAll('span')[activeValue];
    stepActive.classList.add("slider__step-active");

    //генерируем событие при изменении слайдера
    let sliderChange = new CustomEvent('slider-change', {
      detail: activeValue,
      bubbles: true
    })
       
    this.elem.dispatchEvent(sliderChange);
  }

  #onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#onPointerMove);
  }
}
