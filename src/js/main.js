var slider = document.querySelector(".slider");
var sliderDots = document.querySelectorAll(".slider__dot");
var slides = document.querySelectorAll(".slider__slide");
var sliderControls = document.querySelectorAll(".slider__control");

slider.classList.remove("slider--nojs");

var currentSlide = 0;

for (var i = 0; i < sliderDots.length; i++) {
  clickControl(sliderDots[i], slides[i]);
  sliderDots[i].setAttribute("data-num", i);
}

function clickControl(control, slide) {
  control.addEventListener("click", function (evt) {
    toggleSlide(control, slide);
  });
}

function toggleSlide(control, slide) {
  for (var i = 0; i < sliderDots.length; i++) {
    sliderDots[i].classList.remove("slider__dot--active");
    slides[i].classList.remove("slide--show");
  }

  currentSlide = +control.dataset.num;
  control.classList.add("slider__dot--active");
  slide.classList.add("slide--show");
}

for (var i = 0; i < sliderControls.length; i++) {
  sliderControls[i].addEventListener("click", function (evt) {
    swipeControl(evt.target);
  });
}

function swipeControl(control) {
  if (control.classList.contains("slider__control--prev")) {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = sliderDots.length - 1;
    }

    toggleSlide(sliderDots[currentSlide], slides[currentSlide]);
  }

  if (control.classList.contains("slider__control--next")) {
    currentSlide++;

    if (currentSlide > sliderDots.length - 1) {
      currentSlide = 0;
    }

    toggleSlide(sliderDots[currentSlide], slides[currentSlide]);
  }
}


