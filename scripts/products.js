"use strict";

let url = "http://localhost:8081/api/categories";

let shopByTypeSelect = document.querySelector("#shopByTypeSelect");
let categorySelect = document.querySelector("#categorySelect");
let productsList = document.querySelector("#productsList");

async function getCategories() {
  try {
    let response = await fetch(url);
    let categories = await response.json();
    console.log("categories", categories);
    populateCategorySelect(categories);
  } catch (error) {
    console.log("error", error.message);
  }
}

function populateCategorySelect(categories) {
  for (const category of categories) {
    let option = document.createElement("option");
    option.value = category.categoryId;
    option.innerText = category.name;
    categorySelect.appendChild(option);
  }
}

async function getProducts() {
  try {
    let url = "http://localhost:8081/api/products";
    let response = await fetch(url);
    let products = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.log("error", error.message);
  }
}


function displayCards(products) {
  productsList.innerHTML = "";
  for (const product of products) {
    createProductCard(product);
  }
}

function createProductCard(product) {
  const cardContainer = document.createElement("div");


  cardContainer.className = "card";
  cardContainer.style.width = "18rem";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = product.productName;

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
  cardSubtitle.textContent = "Product ID: " + product.productId + ", Price: $" + product.unitPrice;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = product.supplier;

  const seeDetailsButton = document.createElement("a");
  seeDetailsButton.href = `http://127.0.0.1:5500/product-details-page.html?productId=${product.productId}`;
  seeDetailsButton.textContent = "See Details";
  seeDetailsButton.className = "btn btn-primary";

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(seeDetailsButton);
  cardContainer.appendChild(cardBody);

  productsList.appendChild(cardContainer);
}

async function filterProducts() {
  let selectedCategoryId = categorySelect.value;
  let products = await getProducts();
  let filteredProducts = products.filter((product) => product.categoryId == selectedCategoryId);
  displayCards(filteredProducts);
}

async function initializePage() {
  getCategories();
}
initializePage();

//in case its not working , change onclick function in HTML
async function selectHandler() {
    if (shopByTypeSelect.value === 'all') {
        let products = await getProducts()
        displayCards(products)
    } else if (shopByTypeSelect.value === 'category') {
        filterProducts()
    } else {
        null
    }
}
