// Função para criar o botão com JS
function criarBotao() {
    // Verifique se o botão já foi criado para evitar duplicação
    if (document.querySelector('.meuBotao')) {
        return; // Se já existe um botão, não faz nada
    }

    // Criar o elemento do botão
    const botao = document.createElement('button');
    botao.classList.add('meuBotao'); // Adicionar a classe 'meuBotao'

    // Criar o ícone SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('class', 'bi bi-cart-check');
    svg.setAttribute('height', '24');
    svg.setAttribute('width', '24');
    svg.setAttribute('fill', '#fff');

    // Criar os paths do ícone SVG
    const path1 = document.createElement('path');
    path1.setAttribute('d', 'M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z');
    const path2 = document.createElement('path');
    path2.setAttribute('d', 'M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z');

    // Adicionar os paths ao SVG
    svg.appendChild(path1);
    svg.appendChild(path2);

    // Criar o texto do botão
    const texto = document.createElement('span');
    texto.classList.add('text');
    texto.textContent = 'Comprar';

    // Adicionar o SVG e o texto ao botão
    botao.appendChild(svg);
    botao.appendChild(texto);

    // Adicionar o botão ao container na página
    document.querySelector('.product-content').appendChild(botao);
}

// Chamar a função para criar o botão assim que a página for carregada
window.onload = criarBotao;
