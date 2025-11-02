document.addEventListener('DOMContentLoaded', () => {
    fetchProdutos();
    exibirCesto();
    atualizaCesto();
    mostrarCesto();
});

function fetchProdutos() {
    fetch('https://deisishop.pythonanywhere.com/products/')
        .then(response => response.json())  
        .then(produtos => {
            const filtroPreco = document.querySelector('#preco').value;
            const termoPesquisa = document.querySelector('#pesquisa').value.toLowerCase();
            const categoria = document.querySelector('#categorias').value;

            let produtosFiltrados = produtos.filter(produto => {
                const correspondeCategoria = categoria === "todasCategorias" || produto.category === categoria;
                const correspondePesquisa = produto.title.toLowerCase().includes(termoPesquisa) || produto.description.toLowerCase().includes(termoPesquisa);

                return correspondeCategoria && correspondePesquisa;
            });
            
            if (filtroPreco === 'crescente') {
                produtosFiltrados.sort((a, b) => a.price - b.price);
            } else if (filtroPreco === 'decrescente') {
                produtosFiltrados.sort((a, b) => b.price - a.price);
            }

            carregarProdutos(produtosFiltrados); 
        })
        .catch(error => console.error('Erro ao buscar produtos:', error));  
}


function carregarProdutos(produtos) {
    const localProdutos = document.querySelector('#produtos');
    localProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const artigoProduto = criarProduto(produto);
        localProdutos.appendChild(artigoProduto);
    });
}

function criarProduto(produto) {
    const article = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;
    article.appendChild(titulo);

    const preco = document.createElement('p');
    preco.textContent = `Preço: ${produto.price}€`;
    article.appendChild(preco);

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;
    article.appendChild(descricao);

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.style.width = '150px';
    article.appendChild(imagem);

    const botaoAdicionar = document.createElement('button');
    botaoAdicionar.textContent = '+ Adicionar ao cesto';

    botaoAdicionar.addEventListener('click', () => {
        adicionarAoCesto(produto);
    });

    article.appendChild(botaoAdicionar);

    return article;
}


function adicionarAoCesto(produto) {
    let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    produtosSelecionados.push(produto);

    localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
    mostrarCesto();


}

function mostrarCesto() {
    const listaCesto = document.querySelector('#lista-cesto');
    listaCesto.innerHTML = '';

    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    produtosSelecionados.forEach(produto => {
        const li = document.createElement('li');
        li.classList.add('produto-cesto');

        const imagem = document.createElement('img');
        imagem.src = produto.image;
        imagem.style.width = '100px';
        li.appendChild(imagem);

        const titulo = document.createElement('span');
        titulo.textContent = produto.title;
        li.appendChild(titulo);

        const preco = document.createElement('span');
        preco.textContent = `${produto.price}€`;
        li.appendChild(preco);

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';

        botaoRemover.addEventListener('click', () => {
            const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

            let indice = produtosSelecionados.findIndex(item => item.title === produto.title && item.price === produto.price);

            if (indice !== -1) {
                produtosSelecionados.splice(indice, 1);

                localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

                mostrarCesto();
            }
        });

        li.appendChild(botaoRemover);

        listaCesto.appendChild(li);
    });

    exibirPrecoTotal(produtosSelecionados);
}

function exibirPrecoTotal(produtosSelecionados) {
    const precoTotalElement = document.querySelector('#precototal');
    const precoTotal = produtosSelecionados.reduce((total, produto) => total + parseFloat(produto.price), 0).toFixed(2);

    precoTotalElement.textContent = `Preço Total: ${precoTotal}€`;
}

function atualizaCesto() {
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    mostrarCesto();
}

document.querySelector('#pesquisa').addEventListener('input', function () {
    fetchProdutos();
});

document.querySelector('#preco').addEventListener('change', function () {
    fetchProdutos();
});

document.querySelector('#categorias').addEventListener('change', function() {
    fetchProdutos();  
});
