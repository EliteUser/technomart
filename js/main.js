var slider = document.querySelector(".slider");
var sliderDots = document.querySelectorAll(".slider__dot");
var slides = document.querySelectorAll(".slider__slide");
var sliderControls = document.querySelectorAll(".slider__control");
var catalog = document.querySelector("#catalog");
var serviceBtns = document.querySelectorAll(".services__btn");
var serviceSlides = document.querySelectorAll(".services__item");
var mapModal = document.querySelector("#map-modal");
var mapOpen = document.querySelector("#map-open");
var mapClose = document.querySelector("#map-close");
var map = document.querySelector("#map-modal__frame");
var formModal = document.querySelector("#form-modal");
var formOpen = document.querySelector("#form-open");
var formClose = document.querySelector("#form-close");
var formModalInner = document.querySelector(".form-modal");
var form = document.querySelector(".form-modal__form");
var buyBtns = document.querySelectorAll(".product__buy-btn");
var cartModal = document.querySelector("#cart-modal");
var cartClose = document.querySelector("#cart-close");
var cartContinue = document.querySelector(".cart-modal__continue");
var rangeSlider = document.querySelector("#range-slider");
/* Слайдер на главной */

if (slider) {
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
}
/* Ховеры карточек по TAB`у */


if (catalog) {
  catalog.addEventListener("focus", function (event) {
    var target = event.target;

    if (target.classList.contains("button")) {
      target.parentNode.classList.add("product__hover--show");
    }
  }, true);
  catalog.addEventListener("blur", function (event) {
    var target = event.target;

    if (target.classList.contains("button")) {
      target.parentNode.classList.remove("product__hover--show");
    }
  }, true);
}
/* Сервисы */


for (var i = 0; i < serviceBtns.length; i++) {
  clickService(serviceBtns[i], serviceSlides[i]);
}

function clickService(control, slide) {
  control.addEventListener("click", function (evt) {
    toggleService(control, slide);
  });
}

function toggleService(control, slide) {
  for (var i = 0; i < serviceBtns.length; i++) {
    serviceBtns[i].classList.remove("services__btn--active");
    serviceSlides[i].classList.remove("services__item--active");
  }

  control.classList.add("services__btn--active");
  slide.classList.add("services__item--active");
}
/* Всплывающая карта */


if (map) {
  map.onload = function () {
    map.style.zIndex = 2;
  };
}

if (mapModal) {
  mapOpen.addEventListener("click", function (event) {
    event.preventDefault();
    mapModal.classList.remove("modal__inner--appear");
    mapModal.classList.add("modal--show");
    mapModal.classList.add("modal__inner--appear");
    mapClose.focus();
  });
}

if (mapModal) {
  mapClose.addEventListener("click", function (event) {
    event.preventDefault();
    mapModal.classList.remove("modal--show");
  });
}
/* Всплывающая форма */


if (formModal) {
  formOpen.addEventListener("click", function (event) {
    event.preventDefault();
    formModal.classList.remove("modal__inner--appear");
    formModalInner.classList.remove("form-modal--invalid");
    formModal.classList.add("modal--show");
    formModal.classList.add("modal__inner--appear");
    formClose.focus();
  });
}

if (formModal) {
  formClose.addEventListener("click", function (event) {
    event.preventDefault();
    formModal.classList.remove("modal--show");
  });
}

if (formModal) {
  form.addEventListener("submit", function (event) {
    var inputs = [form.elements.name, form.elements.email];

    for (var i = 0; i < inputs.length; i++) {
      if (!inputs[i].value || !inputs[i].validity.valid) {
        event.preventDefault();
        inputs[i].classList.add("form-modal__input--invalid");
        formModalInner.classList.remove("form-modal--invalid");
        void formModalInner.offsetWidth;
        formModalInner.classList.add("form-modal--invalid");
      } else {
        inputs[i].classList.remove("form-modal__input--invalid");
      }
    }
  });
}
/* Добавление в корзину */


if (buyBtns) {
  for (var i = 0; i < buyBtns.length; i++) {
    buyBtns[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      cartModal.classList.add("modal--show");
    });
  }
}

cartClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  cartModal.classList.remove("modal--show");
});
cartContinue.addEventListener("click", function (evt) {
  evt.preventDefault();
  cartModal.classList.remove("modal--show");
});
/* Range slider */

if (rangeSlider) {
  var dragElemLeft = document.querySelector(".range-slider__control--left");
  var dragElemRight = document.querySelector(".range-slider__control--right");
  var selectedArea = document.querySelector(".range-slider__selected");

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right + pageXOffset
    };
  }

  dragElemRight.onmousedown = function (e) {
    var dragCoords = getCoords(dragElemRight);
    var shiftX = e.pageX - dragCoords.left;
    var sliderCoords = getCoords(rangeSlider);

    document.onmousemove = function (e) {
      var newLeft = e.pageX - shiftX - sliderCoords.left;
      var dragLeftRightCoord = getCoords(dragElemLeft).right - sliderCoords.left;

      if (newLeft < dragLeftRightCoord) {
        newLeft = dragLeftRightCoord;
      }

      var rightEdge = rangeSlider.offsetWidth - dragElemRight.offsetWidth / 2;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      selectedArea.style.left = dragLeftRightCoord - dragElemLeft.offsetWidth / 2 + "px";
      selectedArea.style.width = newLeft - dragLeftRightCoord + dragElemLeft.offsetWidth + "px";
      dragElemRight.style.left = newLeft + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  dragElemRight.ondragstart = function () {
    return false;
  }; //////////////////////////////////////////////////////////////////////


  dragElemLeft.onmousedown = function (e) {
    var dragCoords = getCoords(dragElemLeft);
    var shiftX = e.pageX - dragCoords.left;
    var sliderCoords = getCoords(rangeSlider);

    document.onmousemove = function (e) {
      var newLeft = e.pageX - shiftX - sliderCoords.left;

      if (newLeft < -(dragElemLeft.offsetWidth / 2)) {
        newLeft = -(dragElemLeft.offsetWidth / 2);
      }

      var dragRightLeftCoord = getCoords(dragElemRight).left - sliderCoords.left - dragElemRight.offsetWidth;

      if (newLeft > dragRightLeftCoord) {
        newLeft = dragRightLeftCoord;
      }

      selectedArea.style.left = newLeft + dragElemLeft.offsetWidth / 2 + "px";
      selectedArea.style.width = dragRightLeftCoord - newLeft + dragElemLeft.offsetWidth + "px";
      dragElemLeft.style.left = newLeft + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  dragElemLeft.ondragstart = function () {
    return false;
  };
}