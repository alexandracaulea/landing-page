// Navbar
const navbarButton = document.querySelector("button[aria-expanded]");
const menuVisible = document.getElementById("menu-content");

function toggleButton() {
  const isExpanded = this.getAttribute("aria-expanded") === "true" || false;
  navbarButton.setAttribute("aria-expanded", !isExpanded);
  menuVisible.classList.toggle("menu-visible");
}

// API request
const inputField = document.getElementById("navbar-search-input");
const searchForm = document.querySelector(".navbar-search-form");
const searchResult = document.querySelector(".search-result");

const endpoint =
  "https://gist.githubusercontent.com/alexandracaulea/799af943238420ed8722d7c01faf0d3c/raw/a0a6273060375cd71f058aa92772c9ea28976cc0/books.json";

const books = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => books.push(...data))
  .catch(err => console.log(err));

function displayData(e) {
  e.preventDefault();
  const inputValue = inputField.value;

  if (!inputValue) return;
  const filteredArray = books.filter(book => {
    const regex = new RegExp(inputValue, "gi");
    return book.title.match(regex);
  });

  const result = filteredArray
    .map(elem => {
      return `<li>${elem.title}</li>`;
    })
    .join("");
  searchResult.innerHTML = result;
}

// Timer
function padOneZero(number) {
  return number < 10 ? "0" + number : number;
}

function startCountDown() {
  const numberOfDays = document.querySelector(".display__time-days");
  const numberOfHours = document.querySelector(".display__time-hours");
  const numberOfMinutes = document.querySelector(".display__time-minutes");
  const numberOfSeconds = document.querySelector(".display__time-seconds");
  const countDownDate = new Date("January 31, 2020 19:00:00").getTime();

  const date = setInterval(() => {
    const currentDate = new Date().getTime();
    const remainder = countDownDate - currentDate;
    const days = Math.floor(remainder / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainder % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remainder % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainder % (1000 * 60)) / 1000);

    if (remainder < 0) {
      clearInterval(date);
      numberOfDays.textContent = padOneZero(0);
      numberOfHours.textContent = padOneZero(0);
      numberOfMinutes.textContent = padOneZero(0);
      numberOfSeconds.textContent = padOneZero(0);
    } else {
      numberOfDays.textContent = padOneZero(days);
      numberOfHours.textContent = padOneZero(hours);
      numberOfMinutes.textContent = padOneZero(minutes);
      numberOfSeconds.textContent = padOneZero(seconds);
    }
  }, 1000);
}

// Accordion
const readMoreButton = document.querySelector(".read-more");
const accordion = document.querySelector(".package-details-accordion");
function expandAccordion(e) {
  e.preventDefault();
  accordion.setAttribute(
    "style",
    `max-height: ${accordion.scrollHeight}px; mask-image: initial; -webkit-mask-image: initial`
  );
  readMoreButton.remove();
}

// Carousel 1
const carouselTrack = document.querySelector(".book-reviews-carousel");
const carouselSlides = [...carouselTrack.children];
const dotsNav = document.querySelector(".carousel-nav");
const dots = [...dotsNav.children];
const slideWidth = carouselSlides[0].getBoundingClientRect().width;
const setSlidePosition = (slide, i) => {
  slide.style.left = slideWidth * i + "px";
};

carouselSlides.forEach(setSlidePosition);

const moveSlide = (carouselTrack, currentSlide, targetSlide) => {
  carouselTrack.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, dotTarget) => {
  currentDot.classList.remove("current-slide");
  dotTarget.classList.add("current-slide");
};

dotsNav.addEventListener("click", e => {
  const dotTarget = e.target.closest("button");

  if (!dotTarget) return;
  const currentSlide = carouselTrack.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex(dot => dot === dotTarget);
  const targetSlide = carouselSlides[targetIndex];
  moveSlide(carouselTrack, currentSlide, targetSlide);
  updateDots(currentDot, dotTarget);
});

// Carousel 2
const carouselBooksTrack = document.querySelector(".carousel-books-track");
const carouselBooksSlide = [...carouselBooksTrack.children];
const prevButton = document.querySelector(".carousel-button-left");
const nextButton = document.querySelector(".carousel-button-right");
const carouselWidth = carouselBooksSlide[0].getBoundingClientRect().width;

carouselBooksSlide.forEach(setSlidePosition);

const moveSlidesCarousel = (carouselTrack, currentSlide, targetSlide) => {
  carouselTrack.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove("carousel-books-current-slide");
  targetSlide.classList.add("carousel-books-current-slide");
};

const hideShowButtons = (carouselBooksSlide, prevButton, nextButton, index) => {
  if (index === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (index === carouselBooksSlide.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};

prevButton.addEventListener("click", e => {
  const currentSlide = carouselBooksTrack.querySelector(
    ".carousel-books-current-slide"
  );
  const previousSlide = currentSlide.previousElementSibling;
  const previousIndex = carouselBooksSlide.findIndex(
    slide => slide === previousSlide
  );
  moveSlidesCarousel(carouselBooksTrack, currentSlide, previousSlide);
  hideShowButtons(carouselBooksSlide, prevButton, nextButton, previousIndex);
});

nextButton.addEventListener("click", e => {
  const currentSlide = carouselBooksTrack.querySelector(
    ".carousel-books-current-slide"
  );
  const nextSlide = currentSlide.nextElementSibling;
  const nextIndex = carouselBooksSlide.findIndex(slide => slide === nextSlide);
  moveSlidesCarousel(carouselBooksTrack, currentSlide, nextSlide);
  hideShowButtons(carouselBooksSlide, prevButton, nextButton, nextIndex);
});

// Listeners
window.addEventListener("DOMContentLoaded", startCountDown);
navbarButton.addEventListener("click", toggleButton);
readMoreButton.addEventListener("click", expandAccordion);
searchForm.addEventListener("submit", displayData);
document.onkeydown = function(e) {
  e = e || window.event;
  if (e.keyCode == 27) {
    searchResult.innerHTML = "";
  }
};
