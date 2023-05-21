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
let cartItems = [];

function addToCart(product) {
  cartCount++;
  cartCountElement.innerHTML = cartCount;

  // Add the product to the cart items array
  cartItems.push(product);

  // Update the cart card with the added product
  updateCartCard();
}

// List all products

const products_container = document.querySelector(".products-content");

function createProductCard(product) {
    const img = document.createElement("img");
    img.setAttribute("src", product.image)

    const title_product = document.createElement("h3");
    title_product.innerText = product.title;

    const category = document.createElement("p");
    category.innerText = product.category;

    const price = document.createElement("p");
    price.innerHTML = `Price: <span>$${product.price}</span>`;

    const viewButton = document.createElement("button");
    viewButton.innerText = "View Product";
    viewButton.addEventListener("click", () => {
        displayProduct(product);
    });

    const addButton = document.createElement("button");
    addButton.innerText = "Add to cart";
    addButton.addEventListener("click", () => {
        addToCart(product);
    });

    const product_card = document.createElement("div");
    product_card.classList.add("product");



    product_card.append(img, title_product, category, price, viewButton, addButton);

    return product_card
}



function displayProduct(product) {
    // Create the elements to display the product details
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-page");

    const productImage = document.createElement("img");
    productImage.setAttribute("src", product.image);

    const productTitle = document.createElement("h2");
    productTitle.innerText = product.title;

    const productCategory = document.createElement("p");
    productCategory.innerText = product.category;

    const productPrice = document.createElement("p");
    productPrice.innerHTML = `Price: <span>$${product.price}</span>`;

    const backButton = document.createElement("button");
    backButton.innerText = "Go back";
    backButton.addEventListener("click", () => {
        mountProducts();
        productContainer.innerHTML = "";
    });

    // Append the elements to the product container
    productContainer.append(productImage, productTitle, productCategory, productPrice, backButton);

    // Replace the products container with the product page
    products_container.innerHTML = "";
    products_container.appendChild(productContainer);
}

function updateCartCard(e) {
    e.preventDefault();
    const cartCard = document.querySelector(".cart-card");
    const cartContent = document.querySelector(".cart-card .content");
  
    // Clear existing items in the cart card
    cartContent.innerHTML = "";
  
    // Iterate through the cart items and add them to the cart card
    cartItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("box");
  
      const removeIcon = document.createElement("i");
      removeIcon.classList.add("fas", "fa-trash");
  
      const itemImage = document.createElement("img");
      itemImage.setAttribute("src", item.image);
  
      const itemContent = document.createElement("div");
      itemContent.classList.add("content");
  
      const itemTitle = document.createElement("h3");
      itemTitle.innerText = item.title;
  
      const itemPrice = document.createElement("span");
      itemPrice.classList.add("price");
      itemPrice.innerText = `Price: $${item.price}`;
  
      const itemQuantity = document.createElement("span");
      itemQuantity.classList.add("quantity");
      itemQuantity.innerText = "Quantity: 1";
  
      itemContent.append(itemTitle, itemPrice, itemQuantity);
      cartItem.append(removeIcon, itemImage, itemContent);
      cartContent.appendChild(cartItem);
    });
  }
  
  




//fetch api
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

