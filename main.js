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
let slideWidth;
let currentSlide = 1;

// - Infinite Loop
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
  sliderElement.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  sliderElement.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (sliderElement.scrollLeft === 0) {
    sliderElement.classList.add("no-transition");
    sliderElement.scrollLeft =
      sliderElement.scrollWidth - 2 * sliderElement.offsetWidth;
    sliderElement.classList.remove("no-transition");
  } else if (
    Math.ceil(
      sliderElement.scrollLeft ==
        sliderElement.scrollWidth - sliderElement.offsetWidth
    )
  ) {
    sliderElement.classList.add("no-transition");
    sliderElement.scrollLeft = sliderElement.offsetWidth;
    sliderElement.classList.remove("no-transition");
  }
};

sliderElement.addEventListener("mousedown", dragStart);
sliderElement.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
sliderElement.addEventListener("scroll", infiniteScroll);

// - Arrow Buttons Script

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    slideWidth = document.querySelector(".slider .img").offsetWidth;
    sliderElement.scrollLeft +=
      btn.id == "next" ? +(slideWidth + 15) : -(slideWidth + 15);

    if (btn.id == "next") {
      if (currentSlide == slidesCount.length) {
        currentSlide = 1;
        return;
      }
      currentSlide += 1;
    } else {
      if (currentSlide == 1) {
        currentSlide = slidesCount.length;
        return;
      }
      currentSlide -= 1;
    }
  });
});

let bullets = document.querySelectorAll(".bullet");
bullets[0].classList.add("active");

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let i = 0; i < bullets.length; i++) {
      bullets[i].classList.remove("active");
    }
    for (let i = 0; i < bullets.length; i++) {
      if (bullets[i].classList.contains(currentSlide)) {
        bullets[i].classList.add("active");
      }
    }
  });
});
