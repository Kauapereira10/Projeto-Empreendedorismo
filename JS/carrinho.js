// Seleção dos elementos do DOM
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// Evento para abrir o carrinho quando clica no ícone
cartIcon.addEventListener("click", () => cart.classList.add("active"));

// Evento para fechar o carrinho ao clicar no botão de fechar
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Seleciona todos os botões de adicionar ao carrinho
const addCartButtons = document.querySelectorAll(".product-button-add");
const cartContent = document.querySelector(".cart-content");

// Adiciona evento de clique para cada botão de adicionar ao carrinho
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productCard = event.target.closest(".product-card"); // Encontra o card do produto clicado
        addToCart(productCard); // Chama a função para adicionar o produto ao carrinho
    });
}); 

// Função para adicionar produto ao carrinho
const addToCart = productBox => {
    // Pega a imagem, título e preço do produto
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".product-price").textContent;

    // Verifica se o produto já está no carrinho para não adicionar duplicado
    const cartItems = cartContent.querySelectorAll(".product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("Este item já está no carrinho.");
            return; // Sai da função se o produto já estiver adicionado
        }
    }

    // Cria um novo item no carrinho com os detalhes do produto
    const productCard = document.createElement("div");
    productCard.classList.add("cart-box");
    productCard.innerHTML = `
        <img src="${productImgSrc}" class="img" >
        <div class="cart-detail">
            <h2 class="product-title">${productTitle}</h2>
            <span class="product-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>`;

    cartContent.appendChild(productCard); // Adiciona o item criado ao conteúdo do carrinho

    // Adiciona funcionalidade para remover o item do carrinho
    productCard.querySelector(".cart-remove").addEventListener("click", () => {
        productCard.remove(); // Remove o produto do carrinho
        updateCartCount(-1); // Atualiza o contador do carrinho
        updateTotalPrice(); // Atualiza o preço total
    });

    // Controle da quantidade (aumentar/diminuir)
    productCard.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = productCard.querySelector(".number");
        let quantity = parseInt(numberElement.textContent);

        // Diminui a quantidade, mas impede de ficar menor que 1
        if (event.target.id === "decrement" && quantity > 1) quantity--;
        // Aumenta a quantidade
        else if (event.target.id === "increment") quantity++;

        numberElement.textContent = quantity; // Atualiza o número exibido
        updateTotalPrice(); // Atualiza o preço total com a nova quantidade
    });

    updateCartCount(1); // Atualiza o contador de itens no carrinho

    updateTotalPrice(); // Atualiza o preço total
};

// Função para calcular o preço total do carrinho
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    // Percorre cada item do carrinho e multiplica preço x quantidade
    cartBoxes.forEach(cartBox => {
        const price = parseFloat(cartBox.querySelector(".product-price").textContent.replace("R$", "").replace(",", "."));
        const quantity = parseInt(cartBox.querySelector(".number").textContent);
        total += price * quantity; // Soma ao total
    });

    // Atualiza o preço total formatado
    totalPriceElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
};

// Controle do contador de itens no carrinho
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change; // Atualiza o contador com o valor passado

    // Mostra ou esconde o contador dependendo da quantidade de itens
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
};

// Função para finalizar a compra
const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    // Se o carrinho estiver vazio, dá um alerta
    if (cartBoxes.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens ao seu carrinho antes de comprar.");
        return;
    }

    // Remove todos os itens do carrinho após a compra
    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0; // Reseta o contador de itens
    updateCartCount(0); // Atualiza o contador
    updateTotalPrice(); // Reseta o preço total

    alert("Obrigado pela sua compra!"); // Mensagem de agradecimento
});
