import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;
  #shiftX = 0;
  activeValue = 0;
  xCoord = 0;
  sliderThumb = null;
  sliderProgress = null;

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
    this.sliderProgress = slider.querySelector('.slider__progress');
    this.sliderProgress.style.width = 0;

    //отключаем встроенный обработчик перетаскивания
    this.sliderThumb = slider.querySelector('.slider__thumb');
    this.sliderThumb.ondragstart = () => false;

    //назначаем обработчик события при перемещении слайдера
    slider.addEventListener('pointerdown', this.#onPointerDown);

    return slider;
  }

  #onPointerDown = (event) => { 
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.#onPointerMove);
    document.addEventListener('pointerup', this.#onPointerUp);

    this.xCoord = event.pageX - this.elem.getBoundingClientRect().left;

    this.#getCoords();//отрисовка по координатам, в случае если был только клик, далее выполнится pointerup
  }

  #onPointerMove = (event) => {
    event.preventDefault();

    this.xCoord = event.pageX - this.elem.getBoundingClientRect().left;
    
    this.#getCoords(event);//отрисовка по координатам
  }

  #onPointerUp = () => {
    //после отпускания ползунка закрашиваемая ширина и сам ползунок перемещаются к ближайшему целому значению
    this.sliderProgress.style.width = this.activeValue / (this.#steps - 1) * 100 + '%';
    this.sliderThumb.style.left =  this.activeValue / (this.#steps - 1) * 100 + '%';

    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointermove', this.#onPointerMove);
    document.removeEventListener('pointerup', this.#onPointerUp);

    //генерируем событие при изменении слайдера
    let sliderChange = new CustomEvent('slider-change', {
      detail: this.activeValue,
      bubbles: true
    })
       
    this.elem.dispatchEvent(sliderChange);
  }

  #getCoords = () => {
    
    //перемещаем ползунок
    if (this.xCoord < 0) {
      this.xCoord = 0;
    }

    if (this.xCoord > this.elem.getBoundingClientRect().width) {
      this.xCoord = this.elem.getBoundingClientRect().width;
    }

    this.sliderThumb.style.left = this.xCoord / this.elem.getBoundingClientRect().width * 100 + '%';

    //определяем активное число шагов
    let xCoordRelative = this.xCoord / this.elem.getBoundingClientRect().width;
    if (xCoordRelative < 0) {
      xCoordRelative = 0;
    }

    if (xCoordRelative > 1) {
      xCoordRelative = 1;
    }

    //закрашиваем пройденные шаги
    let sliderProgressWidth = xCoordRelative * 100 ;
    this.sliderProgress.style.width = `${sliderProgressWidth}%`;

    //отображаем значение шага
    let approxValue = xCoordRelative * (this.#steps - 1);
    this.activeValue = Math.round(approxValue);
    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.activeValue;

    //убираем и назначаем активный класс
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let stepActive = sliderSteps.querySelector('.slider__step-active');
    stepActive.classList.remove('slider__step-active');
    stepActive = sliderSteps.querySelectorAll('span')[this.activeValue];
    stepActive.classList.add('slider__step-active');
  }
}
