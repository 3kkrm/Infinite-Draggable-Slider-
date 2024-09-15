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
};

sliderElement.addEventListener("mousedown", dragStart);
sliderElement.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
sliderElement.addEventListener("scroll", infiniteScroll);

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

let bullets = document.querySelectorAll(".bullet");
bullets[0].classList.add("active");

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
  }, 50);
});

// nextArrow.onclick = () => {
//   setTimeout(() => {
//     if (currentSlide == slidesCount.length) {
//       currentSlide = 1;
//       for (let i = 0; i < bullets.length; i++) {
//         bullets[i].classList.remove("active");
//       }
//       for (let i = 0; i < bullets.length; i++) {
//         if (bullets[i].classList.contains(currentSlide)) {
//           bullets[i].classList.add("active");
//         }
//       }
//       return;
//     }
//     currentSlide += 1;
//     for (let i = 0; i < bullets.length; i++) {
//       bullets[i].classList.remove("active");
//     }
//     for (let i = 0; i < bullets.length; i++) {
//       if (bullets[i].classList.contains(currentSlide)) {
//         bullets[i].classList.add("active");
//       }
//     }
//   }, 350);
// };

// prevArrow.onclick = () => {
//   setTimeout(() => {
//     if (currentSlide == 1) {
//       currentSlide = slidesCount.length;
//       for (let i = 0; i < bullets.length; i++) {
//         bullets[i].classList.remove("active");
//       }
//       for (let i = 0; i < bullets.length; i++) {
//         if (bullets[i].classList.contains(currentSlide)) {
//           bullets[i].classList.add("active");
//         }
//       }
//       return;
//     }
//     currentSlide -= 1;
//     for (let i = 0; i < bullets.length; i++) {
//       bullets[i].classList.remove("active");
//     }
//     for (let i = 0; i < bullets.length; i++) {
//       if (bullets[i].classList.contains(currentSlide)) {
//         bullets[i].classList.add("active");
//       }
//     }
//   }, 350);
// };

// arrowBtns.forEach((btn) => {
//   setTimeout(() => {
//     btn.addEventListener("click", () => {
//       console.log("after 2 sec");
//     });
//   }, 2000);
// });

// arrowBtns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     for (let i = 0; i < bullets.length; i++) {
//       bullets[i].classList.remove("active");
//     }
//     for (let i = 0; i < bullets.length; i++) {
//       if (bullets[i].classList.contains(currentSlide)) {
//         bullets[i].classList.add("active");
//       }
//     }
//   });
// });

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
