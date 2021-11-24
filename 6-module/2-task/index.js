'use strict';

const slides = [
  {
    id: 0,
    title: 'BEST LAPTOP DEALS',
    img: './assets/images/default-slide-img.jpg'
  },
  {
    id: 1,
    title: 'BEST HEADPHONES DEALS',
    img: './assets/images/default-slide-img.jpg'
  },
  {
    id: 2,
    title: 'BEST SPEAKERS DEALS',
    img: './assets/images/default-slide-img.jpg'
  }
];

class Carousel {
  constructor(element) {
    this.el = element;
    this.slides = slides;
    this.render();
    this.moveNextSlide();
    this.movePrevSlide();
    this.moveByIndicators();
  }

  render() {
    const carousel = this.slides.map(item => `
    <div class="carousel-item" data-id=${item.id}>
      <img src=${item.img} alt="Activelide">
      <div class="container">
        <div class="carousel-caption">
            <h3 class="h1">${item.title}</h3>
            <div>
                <a class="btn" href="#" role="button">
                    View all DEALS
                    <img src="assets/icons/icon-angle-white.svg" class="ml-3" alt="">
                </a>
            </div>
        </div>
      </div>
    </div>
    `).join('');

    this.el.innerHTML = `
    <div id="mainCarousel" class="main-carousel carousel slide">
    <ol class="carousel-indicators">
        <li data-target="#mainCarousel" data-slide-to="0" class="carousel-indicator"></li>
        <li data-target="#mainCarousel" data-slide-to="1" class="carousel-indicator"></li>
        <li data-target="#mainCarousel" data-slide-to="2" class="carousel-indicator"></li>
    </ol>
    <div class="carousel-inner">
    ${carousel}
    </div>
    <button class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </button>
    <button class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </button>
    </div>
    `;
    this.el.querySelector('.carousel-item').classList.add('active');
    this.el.querySelector('.carousel-indicator').classList.add('active');
  }


  moveNextSlide() {
    const nextButton = this.el.querySelector('.carousel-control-next');

    nextButton.addEventListener('click', event => {
      
      let activeSlide = this.el.querySelector('.carousel-item.active');
      let currentSlideIndex = +activeSlide.dataset.id;
     
      let nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex == this.slides.length) {
        nextSlideIndex = 0;
      }
      activeSlide.classList.remove('active');
      
      const slides = this.el.getElementsByClassName('carousel-item');
      for (let s of slides) {
        if (+s.dataset.id == nextSlideIndex) {
          s.classList.add('active');
        }
      }

      let activeIndicator = this.el.querySelector('.carousel-indicator.active');
      activeIndicator.classList.remove('active');

      const carouselIndicators = this.el.getElementsByClassName('carousel-indicator');
      for (let i of carouselIndicators) {
        if (+i.dataset.slideTo == nextSlideIndex) {
          i.classList.add('active');
        }
      }
    });
  }

  movePrevSlide() {
    const prevButton = this.el.querySelector('.carousel-control-prev');

    prevButton.addEventListener('click', event => {
      let activeSlide = this.el.querySelector('.carousel-item.active');
      let currentSlideIndex = +activeSlide.dataset.id;
      
      let prevSlideIndex = currentSlideIndex - 1;
      if (prevSlideIndex == -1) {
        prevSlideIndex = 2;
      }
      activeSlide.classList.remove('active');
     
      const slides = this.el.getElementsByClassName('carousel-item');
      for (let s of slides) {
        if (+s.dataset.id == prevSlideIndex) {
          s.classList.add('active');
        }
      }

      let activeIndicator = this.el.querySelector('.carousel-indicator.active');
      activeIndicator.classList.remove('active');

      const carouselIndicators = this.el.getElementsByClassName('carousel-indicator');
      for (let i of carouselIndicators) {
        if (+i.dataset.slideTo == prevSlideIndex) {
          i.classList.add('active');
        }
      }
    });
  }

  moveByIndicators() {
    const indicators = this.el.querySelector('.carousel-indicators');
  
    indicators.addEventListener('click', event => {
      const { target } = event;
      
      let currentSlideIndex = +target.dataset.slideTo;
      let activeIndicator = this.el.querySelector('.carousel-indicator.active');
      activeIndicator.classList.remove('active');

      const carouselIndicators = this.el.getElementsByClassName('carousel-indicator');
      for (let i of carouselIndicators) {
        if (+i.dataset.slideTo == currentSlideIndex) {
          i.classList.add('active');
        }
      }

      const slides = this.el.getElementsByClassName('carousel-item');
      let activeSlide = this.el.querySelector('.carousel-item.active');
      activeSlide.classList.remove('active');
      for (let s of slides) {
        if (+s.dataset.id == currentSlideIndex) {
          s.classList.add('active');
        }
      }
    });
  }
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.Carousel = Carousel;