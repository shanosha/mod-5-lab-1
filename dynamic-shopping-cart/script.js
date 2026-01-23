const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

let cartItems = [];

// Function to add an item
function addItem(name, price, qty = 1) {
  cartItems.push({
    name: String(name),
    price: Number(price)
  });
  renderCart();
}

// Event listener when "add Product" button is clicked
addProductButton.addEventListener("click", function () {
  let name = productNameInput.value;
  let price = productPriceInput.value;

  if((name=="")||(price<0.01)){
      alert("Please fill out all fields. Price cannot be less than 0.")
  }
  else {
    addItem(name, price);
  }
});

// Event listener when remove item button is clicked
cart.addEventListener("click",function(event){
  let element = event.target;
  if(element.classList.contains("remove")){
    cartItems.splice(element.dataset.id,1);
    renderCart();
  }
});

// Renders the cart items from the array and recalculates the total
function renderCart() {
  cart.innerHTML = "";

  let fragment = document.createDocumentFragment();
  let totalPrice = 0;

  for( let [key,item] of cartItems.entries()){
    let cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `<div class="product-name">${item.name}</div><div class="product-price">$${item.price}</div><button class="remove" data-id="${key}">Remove</div>`;
    fragment.appendChild(cartItem);

    totalPrice += item.price;
  }
  cart.appendChild(fragment);
  totalPriceSpan.innerText = Math.round(totalPrice*100)/100;

}
