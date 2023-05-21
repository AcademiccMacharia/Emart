function toggleCart() {
    let cartCard = document.querySelector('.cart-card');
    cartCard.classList.toggle('open');
}

function toggleSearch() {
    var searchBox = document.querySelector('.search-box');
    searchBox.classList.toggle('open');
}



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
    } else {
        navbar.classList.remove('scrolled');
    }
});

let cartCount = 0;
let cartCountElement = document.querySelector('.cart-count');

function addToCart(count) {
    cartCount = count;
    cartCountElement.innerHTML = cartCount;
}
// List all products

const products_container = document.querySelector(".products-content");

function createProductCard(product) {
    const img = document.createElement("img");
    img.setAttribute("src", product.image)

    const title_product = document.createElement("h3");
    title_product.innerText = product.title;

    const category = document.createElement("p");
    title_product.innerText = product.category;

    const price = document.createElement("p");
    price.innerHTML = `Price: <span>$${product.price}</span>`;

    const button = document.createElement("button")
    button.innerText = "Add to cart"

    // button.addEventListener("click", () => {
    //     addToCart(product)
    // })

    const product_card = document.createElement("div");
    product_card.classList.add("product");



    product_card.append(img, title_product, category, price, button);

    return product_card
}
//list all products
const product_url = "https://fakestoreapi.com/products";

async function getAllProducts() {
    try {
        let result = await fetch(product_url);
        let products = await result.json();
        return products
    } catch (error) {
        console.log(error);
    }
}

async function mountProducts() {
    let products = await getAllProducts()

    if (products && products.length > 0) {
        let product_cards = products.map(product => createProductCard(product))
        product_cards.forEach((card) => products_container.appendChild(card));
    } else {
        const errorElement = document.createElement("h4")
        errorElement.innerText = "Something went wrong with the products";
        errorElement.style.color = "red"
        products_container.appendChild(errorElement)
    }
}

mountProducts()

