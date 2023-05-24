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

    const description = document.createElement("p");
    description.innerText = product.description;

    const button = document.createElement("button")
    button.innerText = "Add to cart"

    const product_card = document.createElement("div");
    product_card.classList.add("product");



    product_card.append(img, title_product, category, price, description, button);

    return product_card
}
//list all products
const product_url = "https://fakestoreapi.com/products";

async function getWomenProducts() {
    try {
        let result = await fetch(`${product_url}/category/women's clothing`);
        let products = await result.json();
        return products
    } catch (error) {
        console.log(error);
    }
}

async function mountProducts() {
    let products = await getWomenProducts()

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