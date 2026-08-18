function createCart() {
    /* Función para crear el carrito si no hay uno ya existente */
    let cart = localStorage.getItem("cart");
    if (cart === null) {
        cart = JSON.stringify({ products: [] });
        localStorage.setItem("cart", cart);
    }
    updateCartBadge();
}

function showCartAlert() {
    /* Crea un elemento html para alertar al usuario que se añadió un elemento al carrito
    y remueve la alerta 3 segundos después */
    const container = document.getElementById("alert-container");
    const alert = document.createElement("div");

    alert.className = "alert alert-success alert-dismissible fade show";
    alert.setAttribute("role", "alert");
    alert.innerHTML = `
        <strong class="alertaAdd">¡Producto añadido!</strong>
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
    if (cartInfo === null) {
        localStorage.setItem("cart", JSON.stringify({ products: [] }));
        return [];
    }
    let cart = JSON.parse(cartInfo);
    if (cart === null || cart.products === undefined) {
        localStorage.setItem("cart", JSON.stringify({ products: [] }));
        return [];
    }
    return cart.products;
}

function saveCart(cart) {
    /* Recibe un parámetro cart de tipo Array para
        guardarlo como valor del carrito nuevo
    */
    localStorage.setItem("cart", JSON.stringify({ products: cart }));
    updateCartBadge();

    if (typeof renderCartSidebar === "function") {
        renderCartSidebar();
    }
}

function updateCartBadge() {
    const cartBadge = document.getElementById("cartBadge");

    if (cartBadge === null) {
        return;
    }

    const cartProducts = getCart();
    cartBadge.textContent = cartProducts.length;
}

function addToCart(item) {
    /* Recibe un item y lo añade al carrito, desplegando una alerta que se puede cambiar en showCartAlert() */
    let cartProducts = getCart();
    cartProducts.push(item);
    saveCart(cartProducts);
    showCartAlert();

    if (typeof pulseCart === "function") {
        pulseCart();
    }
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

function groupCartProducts(cartProducts) {
    const groupedProducts = [];

    for (let i = 0; i < cartProducts.length; i++) {
        const currentProduct = cartProducts[i];

        const existingProduct = groupedProducts.find((product) => {
            return product.id === currentProduct.id;
        });

        if (existingProduct === undefined) {
            groupedProducts.push({
                id: currentProduct.id,
                name: currentProduct.name,
                price: currentProduct.price,
                description: currentProduct.description,
                category: currentProduct.category,
                image: currentProduct.image,
                quantity: 1
            });
        } else {
            existingProduct.quantity++;
        }
    }

    return groupedProducts;
}

function renderCartSidebar() {
    const cartSidebarItems = document.getElementById("cartSidebarItems");
    const cartSidebarTotal = document.getElementById("cartSidebarTotal");

    if (cartSidebarItems === null || cartSidebarTotal === null) {
        return;
    }

    const cartProducts = getCart();
    const groupedProducts = groupCartProducts(cartProducts);

    cartSidebarItems.innerHTML = "";

    if (groupedProducts.length === 0) {
        cartSidebarItems.innerHTML = `
            <p class="cart-empty-message">Tu carrito está vacío.</p>
        `;
        cartSidebarTotal.textContent = "$0";
        return;
    }

    let total = 0;

    for (let i = 0; i < groupedProducts.length; i++) {
        const product = groupedProducts[i];
        const subtotal = product.price * product.quantity;

        total += subtotal;

        cartSidebarItems.innerHTML += `
            <article class="cart-sidebar-item">
                <img src="${product.image}" alt="${product.name}">

                <div class="cart-sidebar-info">
                    <h3>${product.name}</h3>
                    <p>Cantidad: ${product.quantity}</p>
                    <p class="cart-sidebar-price">$${product.price} c/u</p>
                    <p>Subtotal: $${subtotal}</p>

                    <div class="cart-sidebar-actions">
                        <button 
                            type="button" 
                            class="cart-remove-one" 
                            data-id="${product.id}">
                            Quitar 1
                        </button>

                        <button 
                            type="button" 
                            class="cart-remove-all" 
                            data-id="${product.id}">
                            Quitar todo
                        </button>
                    </div>
                </div>
            </article>
        `;
    }

    cartSidebarTotal.textContent = `$${total}`;
}

function openCartSidebar() {
    const cartSidebar = document.getElementById("cartSidebar");
    const cartSidebarOverlay = document.getElementById("cartSidebarOverlay");

    if (cartSidebar === null || cartSidebarOverlay === null) {
        return;
    }

    renderCartSidebar();

    cartSidebar.classList.add("active");
    cartSidebarOverlay.classList.add("active");
    cartSidebar.setAttribute("aria-hidden", "false");
}

function closeCartSidebar() {
    const cartSidebar = document.getElementById("cartSidebar");
    const cartSidebarOverlay = document.getElementById("cartSidebarOverlay");

    if (cartSidebar === null || cartSidebarOverlay === null) {
        return;
    }

    cartSidebar.classList.remove("active");
    cartSidebarOverlay.classList.remove("active");
    cartSidebar.setAttribute("aria-hidden", "true");
}

function clearCart() {
    saveCart([]);
    renderCartSidebar();
}

function initCartSidebar() {
    const cartLink = document.getElementById("cartLink");
    const closeCartSidebarButton = document.getElementById("closeCartSidebar");
    const cartSidebarOverlay = document.getElementById("cartSidebarOverlay");
    const clearCartButton = document.getElementById("clearCartButton");
    const cartSidebarItems = document.getElementById("cartSidebarItems");

    if (cartLink !== null) {
        cartLink.addEventListener("click", (event) => {
            event.preventDefault();
            openCartSidebar();
        });
    }

    if (closeCartSidebarButton !== null) {
        closeCartSidebarButton.addEventListener("click", closeCartSidebar);
    }

    if (cartSidebarOverlay !== null) {
        cartSidebarOverlay.addEventListener("click", closeCartSidebar);
    }

    if (clearCartButton !== null) {
        clearCartButton.addEventListener("click", clearCart);
    }

    if (cartSidebarItems !== null) {
        cartSidebarItems.addEventListener("click", (event) => {
            const removeOneButton = event.target.closest(".cart-remove-one");
            const removeAllButton = event.target.closest(".cart-remove-all");

            if (removeOneButton !== null) {
                const productId = Number(removeOneButton.dataset.id);
                removeOneFromCart(productId);
                renderCartSidebar();
            }

            if (removeAllButton !== null) {
                const productId = Number(removeAllButton.dataset.id);
                removeAllFromCart(productId);
                renderCartSidebar();
            }
        });
    }

    renderCartSidebar();
}

initCartSidebar();