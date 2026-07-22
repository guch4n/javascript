const API_URL = "https://6a5fe634b1933e9d25fcc879.mockapi.io/produtos";

async function buscarProdutos() { //async e await são promisses
    try {
        const resposta = await fetch(API_URL); // faz requisições, sempre faça dentro de um try/catch
        const produtos = await resposta.json(); // extrai os dados da requisição (deserialização)

        popularTabela(produtos);
    } catch (error) {
        console.error(error);
    }
}

function popularTabela(produtos) {
    let html = ""; // precisa ser let pois a variavel será alterada multiplas vezes
    for(const produto of produtos) { // for pode ser utilizado pois produtos é um objeto nativo JS
        html += `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.preco}</td>
            <td>${produto.quantidade}</td>
            <td>${calcularTotal(produto.preco, produto.quantidade)}</td>
            <td>
            <button class="btn btn-danger" onclick="apagarProduto(${produto.id})">
                Remover
            </button>
            <button class="btn btn-primary">
                Atualizar
            </button>
            </td>
        </tr>
        `;
    }

    const tbody = document.querySelector('#table_produtos tbody'); //selecionando o tbody da tabela produtos, através da descida do document
    tbody.innerHTML = html; //atribui um texto, se estiver no formato html ele faz o parse de string para html, substituindo tudo
}

function calcularTotal(preco, quantidade) {
    const resultado = Number(preco) * Number(quantidade); // converte individualmente cada variavel em number
    return resultado.toFixed(2); // converte em duas casas decimais
}

async function apagarProduto(id) {
    if(!confirm("Realmente deseja apagar este produto?")){ //Gera uma caixa de dialogo perguntando se deseja cancelar
        return //Caso a pessoa marque NAO, o programa interrompe essa função
    }

    const url = `${API_URL}/${id}`; // Vai direto ao endpoint do ID
    try {
        await fetch(url, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(error); //somente mostra no debuger
        alert("Não foi possivel apagar o produto.");
    } finally { //Sempre faz, seja certo ou errado o retorno do try/catch
        buscarProdutos();
    }
}

async function criarProduto() {
    
}

async function atualizarProduto(id) {
    
}

buscarProdutos();