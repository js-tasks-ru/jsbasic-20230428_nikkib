function initCarousel() {
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselInner = document.querySelector('.carousel__inner');
  let carouselSlideWidth = carouselInner.querySelector('img').offsetWidth;
  let translatePosition = 0;
  let slidePosition = 0;

  carouselArrowLeft.style.display = 'none';

  document.addEventListener('click', function(event) {

    if (event.target == carouselArrowRight) {
      translatePosition += carouselSlideWidth;
      carouselInner.style.transform = 'translateX(-' + translatePosition +'px)';
      slidePosition++;
    }
    
    if (event.target == carouselArrowLeft) {
      translatePosition -= carouselSlideWidth;
      carouselInner.style.transform = 'translateX(-' + translatePosition +'px)';
      slidePosition--;
    };

    if (slidePosition == 0) {
      carouselArrowLeft.style.display = 'none';
    } else if (slidePosition == 3) {
      carouselArrowRight.style.display = 'none';
    } else {
      carouselArrowLeft.style.display = '';
      carouselArrowRight.style.display = '';
    }
  });
}
