let rightButton = document.createElement("div");
rightButton.id = "next";
rightButton.className = "btn";
let rightButtonText = document.createTextNode(">");
rightButton.appendChild(rightButtonText);

let leftButton = document.createElement("div");
leftButton.id = "prev";
leftButton.className = "btn";
let leftButtonText = document.createTextNode("<");
leftButton.appendChild(leftButtonText);

let container = document.querySelector(".container");
let wrapper = document.querySelector(".wrapper");

wrapper.prepend(leftButton);
wrapper.prepend(rightButton);

let bulletsContainer = document.createElement("div");
bulletsContainer.id = "bullets-container";
container.append(bulletsContainer);

// Slides Array
let slidesCount = Array.from(document.querySelectorAll(".img"));

for (let i = 0; i < slidesCount.length; i++) {
  let bullet = document.createElement("span");
  bullet.className = `bullet ${i + 1}`;

  bulletsContainer.append(bullet);
}

// New Section Of Scripting

const sliderElement = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".wrapper .btn");
const nextArrow = document.querySelector("#next");
const prevArrow = document.querySelector("#prev");
let slideWidth;
let currentSlide = 1;
let timeOutId;

// - Update the bullet possition

const checkMobile = () => {
  if (window.innerWidth <= 1199) {
    let scrollTimeout;

    sliderElement.addEventListener("scroll", () => {
      slideWidth = sliderElement.offsetWidth;

      // Clear the previous timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout
      scrollTimeout = setTimeout(() => {
        const index = Math.round(sliderElement.scrollLeft / (slideWidth + 15));
        currentSlide = index;
        bullets.forEach((bullet, index) => {
          bullet.classList.remove("active");

          if (bullet.classList.contains(currentSlide)) {
            if (currentSlide == slidesCount.length) {
              currentSlide = 1;
            }
            bullet.classList.add("active");
          }
        });
      }, 10);
    });
  } else {
    let scrollTimeout;

    sliderElement.addEventListener("scroll", () => {
      slideWidth = sliderElement.offsetWidth;

      // Clear the previous timeout
      clearTimeout(scrollTimeout);

      // Set a new timeout
      scrollTimeout = setTimeout(() => {
        let index = Math.round(
          sliderElement.scrollLeft / ((slideWidth + 15) / 2)
        );

        if (index == 1) {
          index = slidesCount.length + 1;
        }

        currentSlide = index - 1;
        bullets.forEach((bullet, index) => {
          bullet.classList.remove("active");

          if (bullet.classList.contains(currentSlide)) {
            if (currentSlide == slidesCount.length) {
              currentSlide = 1;
            }
            bullet.classList.add("active");
          }
        });
      }, 50);
    });
  }
};

checkMobile();

// - Autoplay Slider

// function autoPlay() {
//   slideWidth = sliderElement.offsetWidth;
//   if (window.innerWidth <= 1199) {
//     timeOutId = setTimeout(() => {
//       sliderElement.scrollLeft += +slideWidth;
//     }, 2500);
//   } else {
//     timeOutId = setTimeout(() => {
//       sliderElement.scrollLeft += +(slideWidth / 2);
//     }, 2000);
//   }
// }

// autoPlay();

// - Arrow Buttons Script

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    slideWidth = document.querySelector(".slider .img").offsetWidth;
    if (btn.id == "next") {
      sliderElement.scrollLeft += +(slideWidth + 15);
    } else {
      sliderElement.scrollLeft += -(slideWidth + 15);
    }
  });
});

// - Slider Script

let isDragging = false;
let startX;
let startScrollLeft;

const dragStart = (ele) => {
  isDragging = true;
  sliderElement.classList.add("dragging");

  //Records the initial cursor and scroll position
  startX = ele.pageX;
  startScrollLeft = sliderElement.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  e.preventDefault();
  sliderElement.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  sliderElement.classList.remove("dragging");
};

const infiniteScroll = () => {
  const totalWidth = sliderElement.scrollWidth;
  const sliderWidth = sliderElement.offsetWidth;

  if (sliderElement.scrollLeft === 0) {
    sliderElement.classList.add("no-transition");
    sliderElement.scrollLeft =
      sliderElement.scrollWidth - 2 * sliderElement.offsetWidth;
    sliderElement.classList.remove("no-transition");
  } else if (Math.ceil(sliderElement.scrollLeft === totalWidth - sliderWidth)) {
    sliderElement.classList.add("no-transition");
    sliderElement.scrollLeft = sliderElement.offsetWidth;
    sliderElement.classList.remove("no-transition");
  }

  // clearTimeout(timeOutId);
  // if (!wrapper.matches(":hover")) autoPlay();
};

let bullets = document.querySelectorAll(".bullet");
bullets[0].classList.add("active");

// - Infinite Loop Slides Added

const slidesChildren = Array.from(document.querySelectorAll(".img"));
let singleSlineWidth = document.querySelector(".slider .img").offsetWidth;

let slidesNumber = Math.round(sliderElement.offsetWidth / singleSlineWidth);

slidesChildren
  .slice(-slidesNumber)
  .reverse()
  .forEach((slide) => {
    sliderElement.insertAdjacentHTML("afterbegin", slide.outerHTML);
  });

slidesChildren.slice(0, slidesNumber).forEach((slide) => {
  sliderElement.insertAdjacentHTML("beforeend", slide.outerHTML);
});

window.addEventListener("resize", checkMobile);
sliderElement.addEventListener("mousedown", dragStart);
sliderElement.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
sliderElement.addEventListener("scroll", infiniteScroll);
// wrapper.addEventListener("mouseenter", () => {
//   clearTimeout(timeOutId);
// });
// wrapper.addEventListener("mouseleave", autoPlay);
