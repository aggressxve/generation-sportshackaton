function createCart() {
    /* Función para crear el carrito si no hay uno ya existente */
    let cart = localStorage.getItem("cart");
    if (cart === null) {
        cart = JSON.stringify({ products: [] });
        localStorage.setItem("cart", cart);
    }
}

function showCartAlert() {
    /* Crea un elemento html para alertar al usuario que se añadió un elemento al carrito
    y remueve la alerta 3 segundos después */
    const container = document.getElementById("alert-container");
    const alert = document.createElement("div");

    alert.className = "alert alert-success alert-dismissible fade show";
    alert.setAttribute("role", "alert");
    alert.innerHTML = `
        <strong>¡Producto añadido!</strong>
        <button type="button" 
                class="btn-close" 
                data-bs-dismiss="alert" 
                aria-label="Close">
        </button>
    `;
    container.appendChild(alert);
    // Removerla despues de 3 segundos ?
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function getCart() {
    /* Obtiene el carrito desde local storage y  retorna un arreglo de productos de tipo Array */
    const cartInfo = localStorage.getItem("cart");
    let cart = JSON.parse(cartInfo);
    let cartProducts = cart["products"];
    return cartProducts;
}

function saveCart(cart) {
    /* Recibe un parámetro cart de tipo Array para
        guardarlo como valor del carrito nuevo
    */
    localStorage.setItem("cart", JSON.stringify({ products: cart }))
}

function addToCart(item) {
    /* Recibe un item y lo añade al carrito, desplegando una alerta que se puede cambiar en showCartAlert() */
    let cartProducts = getCart();
    cartProducts.push(item);
    saveCart(cartProducts);
    showCartAlert();
}

function removeOneFromCart(id) {
    /* Remueve una sola instancia del id proporcionado y guarda el cambio en el carrito */
    let cartProducts = getCart();
    let itemIndex = cartProducts.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        cartProducts.splice(itemIndex, 1);
    }
    saveCart(cartProducts);
}

function removeAllFromCart(id) {
    /* Remueve todas las instancias del id proporcionado y guarda el cambio en el carrito */
    let cartProducts = getCart();
    let newProducts = cartProducts.filter(item => item.id !== id);
    saveCart(newProducts);
}

createCart();