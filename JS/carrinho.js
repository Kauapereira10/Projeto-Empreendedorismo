const cartIcon = document.querySelector("#cart-icon");
    const cart = document.querySelector(".cart");
    const cartClose = document.querySelector("#cart-close");
    cartIcon.addEventListener("click", () => cart.classList.add("active"));
    cartClose.addEventListener("click", () => cart.classList.remove("active"));

    const addCartButtons = document.querySelectorAll(".product-button-add");
    const cartContent = document.querySelector(".cart-content");

    addCartButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productCard = event.target.closest(".product-card");
            addToCart(productCard);
        });
    });

    
    const addToCart = productBox => {
        const productImgSrc = productBox.querySelector("img").src;
        const productTitle = productBox.querySelector(".product-title").textContent;
        const productPrice = productBox.querySelector(".product-price").textContent;

        const cartItems = cartContent.querySelectorAll(".product-title");
        for (let item of cartItems) {
            if (item.textContent === productTitle) {
                alert("Este item já está no carrinho.");
                return;
            }
        }

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

        cartContent.appendChild(productCard);

        productCard.querySelector(".cart-remove").addEventListener("click", () => {
            productCard.remove();

            updateCartCount(-1); 

            updateTotalPrice();
        });

        productCard.querySelector(".cart-quantity").addEventListener("click", event => {
            const numberElement = productCard.querySelector(".number");
            let quantity = parseInt(numberElement.textContent);

            if (event.target.id === "decrement" && quantity > 1) quantity--;
            else if (event.target.id === "increment") quantity++;

            numberElement.textContent = quantity;
            updateTotalPrice();
        });

        updateCartCount(1);

        updateTotalPrice();
    };

    const updateTotalPrice = () => {
        const totalPriceElement = document.querySelector(".total-price");
        const cartBoxes = document.querySelectorAll(".cart-box");
        let total = 0;
        cartBoxes.forEach(cartBox => {
            const price = parseFloat(cartBox.querySelector(".product-price").textContent.replace("R$", "").replace(",", "."));
            const quantity = parseInt(cartBox.querySelector(".number").textContent);
            total += price * quantity;
        });
        totalPriceElement.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
    };

    let cartItemCount = 0;
    const updateCartCount = change => {
        const cartItemCountBadge = document.querySelector(".cart-item-count");
        cartItemCount += change;
        if (cartItemCount > 0) {
            cartItemCountBadge.style.visiblity = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visiblity = "hidden";
            cartItemCountBadge.textContent = "";
        }
    };

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert("Seu carrinho está vazio. Adicione itens ao seu carrinho antes de comprar.");
            return;
        }

        cartBoxes.forEach(cartBox => cartBox.remove());

        cartItemCount = 0; 
        updateCartCount(0);

        updateTotalPrice();

        alert("Obrigado pela sua compra!");
    });