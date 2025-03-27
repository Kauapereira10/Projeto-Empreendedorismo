// Seleciona o input de busca
const searchInput = document.getElementById('search-input');

// Quando o usuário interagir com o input, esta função será executada
searchInput.addEventListener('input', (event) => {
    const value = formatString(event.target.value); // Armazena e formata o valor do input

    const items = document.querySelectorAll('.product-content .product-card')
    const noResults = document.getElementById('no_results'); // Seleciona o elemento da mensagem "nenhum resultado"
    let hasResults = false; // Indica se há resultados correspondentes

    // Se existir valor no input
    if (value !== '') {
        items.forEach(item => {
            const itemTitle = item.querySelector('.product-title').textContent; // Obtém o texto do título do item
            const itemDescription = item.querySelector('.product-description').textContent; // Obtém o texto da descrição do item
            const itemPrice = item.querySelector('.product-price').textContent; // Obtém o preço do produto
            const addToCartButton = item.querySelector('.product-button-add'); // Obtém o botão de adicionar ao carrinho

            // Se o valor digitado está contido nesse texto
            if (formatString(itemTitle).indexOf(value) !== -1 ||
                formatString(itemDescription).indexOf(value) !== -1
            ) {
                // Exibe o item e mantém todas as informações visíveis
                item.style.display = 'flex';
                item.style.flexDirection = 'column';
                item.style.alignItems = 'center';

                hasResults = true;
            } else {
                // Oculta o item
                item.style.display = 'none';
            }
        });

        // Exibe ou oculta a mensagem "nenhum resultado"
        if (hasResults) {
            noResults.style.display = 'none'; // Esconde a mensagem
        } else {
            noResults.style.display = 'block'; // Mostra a mensagem
        }

    } else {
        // Sempre exibe todos os itens quando o input está vazio
        items.forEach(item => {
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.alignItems = 'center';
        });
        noResults.style.display = 'none'; // Oculta a mensagem "nenhum resultado"
    }
});

// Função para formatar strings: remove espaços em branco, transforma em lowercase e remove acentos
function formatString(value) {
    return value
        .trim() // Remove espaços em branco
        .toUpperCase() // Transforma em lowercase
        .normalize('NFD') // Normaliza para separar os acentos
        .replace(/[̀-ͯ]/g, ''); // Remove os acentos
}
