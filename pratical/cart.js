// ======== CART LOGIC ========

// Load cart from localStorage (or empty if none)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add item to cart
function addToCart(foodName, price) {
    cart.push({ food: foodName, amount: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Remove item by index
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

// Update the cart display on the page
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");

    if (!cartList || !totalSpan) return; // skip if cart container not on this page

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.amount;
        cartList.innerHTML += `
            <li>
                ${item.food} - ₦${item.amount}
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
