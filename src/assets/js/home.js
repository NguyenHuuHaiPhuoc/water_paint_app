const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

let carouselVp = document.querySelector("#carousel-vp");

let cCarouselInner = document.querySelector("#cCarousel-inner");
let carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;

let leftValue = 0;
// let cCarouselItem = document.querySelectorAll(".cCarousel-item");
// console.log(cCarouselItem.length)

// Variable used to set the carousel movement value (card's width + gap)
const totalMovementSize =
  parseFloat(
    document.querySelector(".cCarousel-item").getBoundingClientRect().width,
    10
  ) +
  parseFloat(
    window.getComputedStyle(cCarouselInner).getPropertyValue("gap"),
    10
  );

document.addEventListener("DOMContentLoaded", ()=> {
  const prev = document.querySelector("#prev");
  if(prev) {
    prev.addEventListener('click', () => {
      // console.log(leftValue);
      if (!leftValue == 0) {
        leftValue -= -totalMovementSize;
        $("#cCarousel-inner").css('left',leftValue+'px');
      } 
      // else{
      //   leftValue = -770;
      //   $("#cCarousel-inner").css('left',leftValue+'px');
      // }
      
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const next = document.querySelector("#next");
  if (next) {
    next.addEventListener("click", () => {
      // let carouselVpWidth = carouselVp.getBoundingClientRect().width;
     
      if(carouselInnerWidth - Math.abs(leftValue) > 770){
        leftValue -= totalMovementSize;
        $("#cCarousel-inner").css('left',leftValue+'px');
      } else{
        leftValue = 0;
        $("#cCarousel-inner").css('left',leftValue+'px');
      }
    });
  } else {
    console.error("Phần tử 'next' không tồn tại.");
  }
});


const mediaQuery510 = window.matchMedia("(max-width: 510px)");
const mediaQuery770 = window.matchMedia("(max-width: 770px)");

mediaQuery510.addEventListener("change", mediaManagement);
mediaQuery770.addEventListener("change", mediaManagement);

let oldViewportWidth = window.innerWidth;

function mediaManagement() {
  const newViewportWidth = window.innerWidth;

  if (leftValue <= -totalMovementSize && oldViewportWidth < newViewportWidth) {
    leftValue += totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
    oldViewportWidth = newViewportWidth;
  } else if (
    leftValue <= -totalMovementSize &&
    oldViewportWidth > newViewportWidth
  ) {
    leftValue -= totalMovementSize;
    cCarouselInner.style.left = leftValue + "px";
    oldViewportWidth = newViewportWidth;
  }
}