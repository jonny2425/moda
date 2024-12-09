const cart = [];
const cartBtn = document.getElementById('view-cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElem = document.getElementById('total-price');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const productName = productElement.dataset.name;
        const productPrice = parseFloat(productElement.dataset.price);
        
        addToCart(productId, productName, productPrice);
    });
});

function addToCart(id, name, price) {
    // Buscar si el producto ya está en el carrito
    const productInCart = cart.find(item => item.id === id);
    
    if (productInCart) {
        // Si ya está, incrementamos la cantidad
        productInCart.quantity++;
    } else {
        // Si no está, lo agregamos con cantidad 1
        cart.push({ id, name, price, quantity: 1 });
    }
    
    // Actualizamos la vista del carrito
    updateCart();
}

function updateCart() {
    // Actualizamos el número de productos en el botón del carrito
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBtn.textContent = `Ver Carrito (${totalItems})`;
    
    // Actualizamos el contenido del carrito
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });

    // Actualizamos el total
    totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

cartBtn.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
});




