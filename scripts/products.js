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
getCategories();

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
    displayCards(products);
  } catch (error) {
    console.log("error", error.message);
  }
}
getProducts();

function displayCards(products) {
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
seeDetailsButton.href = "product-details-page.html";
seeDetailsButton.textContent = "See Details";
seeDetailsButton.className = "btn btn-primary";

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardSubtitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(seeDetailsButton);
  cardContainer.appendChild(cardBody);

  productsList.appendChild(cardContainer);
}

function filterProducts() {
  let categoryId = categorySelect.values;

  let filterProducts = products.filter((product) => product.categoryId === categoryId);
  return filterProducts;
}
filterProducts();
