import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  elem = null;
  #steps = 0;
  #value = 0;

  constructor({ steps, value = 0 }) {
    this.#steps = steps;
    this.#value = value;
    this.elem = this.#render();
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

    //назначаем обработчик события при клике на слайдер
    slider.addEventListener('click', this.#onClick);

    return slider;
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

  #onClick = (event) => { 
    //определяем координату клика по слайдеру
    let activeCoord = event.clientX - this.elem.getBoundingClientRect().left;
    let relativeActiveCoord = activeCoord / this.elem.getBoundingClientRect().width;
    let approxCoord = relativeActiveCoord * (this.#steps - 1);
    let stepActiveValue = Math.round(approxCoord);
    
    //убираем и назначаем активный класс
    let sliderSteps = this.elem.querySelector('.slider__steps');
    let stepActive = sliderSteps.querySelector('.slider__step-active');
    stepActive.classList.remove('slider__step-active');
    stepActive = sliderSteps.querySelectorAll('span')[stepActiveValue];
    stepActive.classList.add("slider__step-active");

    //перемещаем ползунок
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderProgressWidth = stepActiveValue / (this.#steps - 1) * 100 ;
    sliderProgress.style.width = `${sliderProgressWidth}%`;

    let sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = stepActiveValue;

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.style.left = `${sliderProgressWidth}%`;

    //генерируем событие при изменении слайдера
    let sliderChange = new CustomEvent('slider-change', {
      detail: stepActiveValue,
      bubbles: true
    })
    
    this.elem.dispatchEvent(sliderChange);
  }
}
