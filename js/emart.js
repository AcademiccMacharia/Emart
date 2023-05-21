function toggleCart() {
    var cartCard = document.querySelector('.cart-card');
    cartCard.classList.toggle('open');
  }
  

let cartCount = 0;
let cartCountElement = document.querySelector('.cart-count');

function addToCart(count) {
    cartCount = count;
    cartCountElement.innerHTML = cartCount;
}

let res = prompt("Enter any number");
addToCart(res);

window.addEventListener("scroll", animateCards);

function animateCards() {
  const section = document.querySelector(".section-2");
  const features = document.querySelectorAll(".featured");

  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight) {
    section.classList.add("in-view");
    features.forEach((feature, index) => {
      setTimeout(() => {
        feature.style.transitionDelay = `${index * 0.2}s`;
      }, 200);
    });
  }
}


window.addEventListener('scroll', () => {
    let navbar = document.querySelector('.nav-bar');
    let scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        navbar.classList.add('scrolled');
    }else{
        navbar.classList.remove('scrolled');
    }
});