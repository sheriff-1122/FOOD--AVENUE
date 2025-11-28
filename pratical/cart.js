 // ======== CART LOGIC ========

// Load cart from localStorage (or empty if none)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Format currency as ₦8,500
function formatNaira(amount) {
    return "₦" + Number(amount).toLocaleString();
}

// Add item to cart
function addToCart(foodName, price) {
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
        cart.splice(index, 1);
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

// Update the cart display
function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalSpan = document.getElementById("cart-total");

    // If this page doesn't have a cart UI, stop
    if (!cartList || !totalSpan) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.amount * item.quantity;
        total += itemTotal;

        cartList.innerHTML += `
            <li class="cart-row">
                <span class="item-name">${item.food} – ${formatNaira(item.amount)}</span>

                <div class="item-controls">
                    <button onclick="decreaseQty(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQty(${index})">+</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </li>
        `;
    });

    totalSpan.textContent = formatNaira(total);
}

// ======== INITIALIZE CART ========
window.addEventListener('DOMContentLoaded', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
});

window.addEventListener('pageshow', () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();
});
