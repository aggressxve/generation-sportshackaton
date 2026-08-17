const products = [
    {
        id: 1,
        name: "Balón de Basketball",
        price: 899,
        description: "Balón ideal para entrenamientos y partidos de basketball.",
        category: "Basketball",
        image: "img/productos/balonBasketball.jpg"
    },
    {
        id: 2,
        name: "Camiseta Basketball",
        price: 1199,
        description: "Camiseta deportiva estilo basketball, cómoda y ligera.",
        category: "Basketball",
        image: "img/productos/CamisetaBasketball.jpg"
    },
    {
        id: 3,
        name: "Tenis Basketball",
        price: 1899,
        description: "Tenis diseñados para brindar soporte y agarre en cancha.",
        category: "Basketball",
        image: "img/productos/TenisBasketball.jpg"
    },
    {
        id: 4,
        name: "Balón de Fútbol",
        price: 699,
        description: "Balón resistente para entrenamientos y partidos recreativos.",
        category: "Futbol",
        image: "img/productos/BalonDeFutbol.jpg"
    },
    {
        id: 5,
        name: "Camiseta Fútbol México",
        price: 1299,
        description: "Camiseta deportiva inspirada en la selección mexicana.",
        category: "Futbol",
        image: "img/productos/CamisetaFutbolMexico.jpg"
    },
    {
        id: 6,
        name: "Tenis Pirma Fútbol",
        price: 1499,
        description: "Calzado para fútbol con buen agarre y diseño deportivo.",
        category: "Futbol",
        image: "img/productos/TenisPirmaFutbol.jpg"
    },
    {
        id: 7,
        name: "Calcetas para Running",
        price: 199,
        description: "Calcetas cómodas para correr y entrenar diariamente.",
        category: "Running",
        image: "img/productos/CalcetaParaRunning.jpg"
    },
    {
        id: 8,
        name: "Riñonera Running",
        price: 399,
        description: "Riñonera práctica para llevar celular, llaves y botella.",
        category: "Running",
        image: "img/productos/RinoneraRunning.jpg"
    },
    {
        id: 9,
        name: "Tenis para Running",
        price: 1699,
        description: "Tenis ligeros para correr con comodidad y amortiguación.",
        category: "Running",
        image: "img/productos/TenisParaRunning.jpg"
    },
    {
        id: 10,
        name: "Mancuernas 10 LB",
        price: 799,
        description: "Par de mancuernas para rutinas de fuerza en casa o gimnasio.",
        category: "Gym",
        image: "img/productos/Mancuernas10LB.jpg"
    },
    {
        id: 11,
        name: "Rack para Mancuernas",
        price: 999,
        description: "Soporte compacto para organizar mancuernas de forma segura.",
        category: "Gym",
        image: "img/productos/RackParaMancuernas.jpg"
    },
    {
        id: 12,
        name: "Straps de Cuero",
        price: 299,
        description: "Straps para mejorar el agarre en ejercicios de levantamiento.",
        category: "Gym",
        image: "img/productos/StrapsDeCuero.jpg"
    }
];

const productsContainer = document.getElementById("products-container");

const showProducts = (productList) =>{
    productsContainer.innerHTML = "";

    for (let i = 0; i < productList.length; i++) {
        productsContainer.innerHTML += `
        <article class="product-card">
            <div class="product-image">
                <img src="${productList[i].image}" alt="${productList[i].name}">
            </div>
            <div class="product-info">
                <h3>${productList[i].name}</h3>
                <p class="product-price">$${productList[i].price}</p>
                <p class="product-description">
                    ${productList[i].description}
                </p>
            </div>
            <button type="button" class="add-product-button" data-id="${productList[i].id}">+</button>
        </article>
        `;
        
    }
};

showProducts(products);

const filterButtons = document.querySelectorAll(".sport-button");

let selectedCategory = ""; //Guarda la categoría

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", () =>{
        const buttonCategory = filterButtons[i].dataset.category;

        if (selectedCategory === buttonCategory) { //Para des-seleccionar la categoría seleccionada
            selectedCategory = "";
            filterButtons[i].classList.remove("active-filter");
            showProducts(products);
            return;
        }

        selectedCategory = buttonCategory;

        for (let j = 0; j < filterButtons.length; j++) { //Quitar el selector al anterior filtro
            filterButtons[j].classList.remove("active-filter");
        }

        filterButtons[i].classList.add("active-filter"); //Añadir estilo

        const filterProducts = products.filter((product) => {
            return product.category === selectedCategory;
        });
        showProducts(filterProducts);

    });
    
}

productsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-product-button")) {
        const productId = Number(event.target.dataset.id);

        const selectedProduct = products.find((product) => {
            return product.id === productId;
        });

        console.log("Producto agregado:", selectedProduct);
    }
});