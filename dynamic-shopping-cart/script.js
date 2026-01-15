const productNameInput = document.getElementById("product-name");
const productPriceInput = document.getElementById("product-price");
const addProductButton = document.getElementById("add-product");
const cart = document.getElementById("cart");
const totalPriceSpan = document.getElementById("total-price");

let totalPrice = 0;

let cartItems = [];

// Function to update the total price
function updateTotalPrice(amount) {
  totalPrice += amount;
  totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
  const item = event.target.closest("li");
  const price = parseFloat(item.dataset.price);
  updateTotalPrice(-price);
  item.remove();
}

// Function to add an item
function addItem(name, price, qty = 1) {
  console.log(cartItems);
  cartItems.push({
    name: String(name),
    price: Number(price),
  });
  renderCart();
}

addProductButton.addEventListener("click", function () {
  let name = productNameInput.value;
  let price = productPriceInput.value;

  if((name=="")||(price<0.01)){
      try {
      // Perform operations that might naturally throw errors (e.g., API calls with 'await')
      // ...
      
      // Use 'if' to trigger a custom exception based on a specific condition
      if ((name=="")||(price<0.01)) {
        throw new ValidationError('Not enough credits to proceed'); // Manually throw an error
      }

      console.log('Proceeding with the operation.');
      // ... rest of the try block logic ...

    } catch (error) {
      // Check the caught error's properties (e.g., name, message) to handle conditions
      if (error.name === 'ValidationError') {
        console.error(`Caught Validation Error: ${error.message}`);
        // Handle the specific validation error
      } else {
        console.error(`Caught an unexpected error: ${error.message}`);
        // Re-throw if the error cannot be handled here
        // throw error; 
      }
    }
  }
  else {
    addItem(name, price);
  }

  
});

cart.addEventListener("click",function(event){
  let element = event.target;
  if(element.classList.contains("remove")){
    console.log("click");
    cartItems.splice(element.dataset.id,1);
  }
  renderCart();
});

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
  totalPriceSpan.innerText = totalPrice;

}
