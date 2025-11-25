// ======== CART LOGIC ========

// Load cart from localStorage (or empty if none)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(foodName, price) {
    // Check if item already exists
    let existing = cart.find(item => item.food === foodName);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ food: foodName, amount: price, quantity: 1 });
    }
    saveCart();
    updateCartDisplay();
}

// Increase / Decrease quantity
function increaseQty(index) {
    cart[index].quantity++;
    saveCart();
    updateCartDisplay();
}

function decreaseQty(index) {
    cart[index].quantity--;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // remove item if quantity = 0
    }
    saveCart();
    updateCartDisplay();
}

// Remove item completely
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartDisplay();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update the cart display on the page
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");

    if (!cartList || !totalSpan) return; // skip if cart container not on this page

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.amount * item.quantity;
        cartList.innerHTML += `
            <li>
                ${item.food} – ₦${item.amount} x ${item.quantity}
                <button onclick="decreaseQty(${index})">-</button>
                <button onclick="increaseQty(${index})">+</button>
                <button onclick="removeItem(${index})">Remove</button>
            </li>
        `;
    });

    totalSpan.textContent = total;
}

// ======== INITIALIZE CART ON PAGE LOAD ========
window.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
});

// Update cart if user navigates back to the page
window.addEventListener('pageshow', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
});
