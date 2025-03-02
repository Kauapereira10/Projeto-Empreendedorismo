let carrinhoCount = 0;

// Adiciona ao carrinho
function adicionarAoCarrinho() {
    carrinhoCount++;
    document.getElementById('carrinhoButton').innerText = `Carrinho (${carrinhoCount})`;
}

// Abre o modal
function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

// Fecha o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Filtra os produtos por categoria
function filterProducts(category) {
    const products = document.querySelectorAll('.produto');
    
    products.forEach(product => {
        if (category === 'todos' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Alternar tema e salvar no localStorage
function toggleTheme() {
    const body = document.body;
    const themeToggleButton = document.getElementById("themeToggle");

    body.classList.toggle("dark-theme");
    
    if (body.classList.contains("dark-theme")) {
        themeToggleButton.innerText = "🌕";  // Modo claro
        localStorage.setItem("theme", "dark");
    } else {
        themeToggleButton.innerText = "🌙";  // Modo escuro
        localStorage.setItem("theme", "light");
    }
}

// Mantém o tema ao recarregar a página
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        document.getElementById("themeToggle").innerText = "🌕";
    }
});
