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
            <button class="btn btn-primary" onclick="editarProduto(${produto.id})">
                Editar
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

function modalNovoProduto() {
    limparFormulario();
    abrirModal();
}

async function editarProduto(id) {
    const url = `${API_URL}/${id}`;

    try { //Sempre que for dados externos é obrigatorio chamar um trycatch
        const resposta = await fetch(url); //puxa os dados externos
        const produto = await resposta.json(); //converte para um arquivo javascript
        popularFormulario(produto);
        abrirModal();
    } catch (error) {
        alert("Não foi possivel editar este produto.");
    }
}

function salvarProduto(){
    const id = Number(document.querySelector("#id").value) || 0;
    const nome = document.querySelector("#nome").value;
    const preco = document.querySelector("#preco").value;
    const quantidade = document.querySelector("#quantidade").value;

    // Não permitir campos vazios - validação
    if(nome == "" || preco == "" || quantidade == ""
    ) {
        alert("Todos os campos são obrigatórios.")
        return;
    }

    // Não permitir valores não numéricos preco e quantidade - validação
    if (!Number(preco) || !Number(quantidade)) {
        alert("Campo preço e quantidade devem ser numéricos");
        return;
    }

    if(id) {
        atualizarProduto(id);
        return;
    }

    criarProduto();
}

function criarObjetoProduto() {
    return { //pega os dados dos campos nome, preco e quantidade
        nome: document.querySelector("#nome").value,
        preco: document.querySelector("#preco").value,
        quantidade: document.querySelector("#quantidade").value
    }
}

async function criarProduto() {
    const produto = criarObjetoProduto();

    try {
        await fetch(API_URL, { //envia para a API, padrão para metodos POST
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(produto)
        });
        limparFormulario();
        fecharModal();
        buscarProdutos();
    } catch (error) {
        alert("Não foi possivel adicionar o produto");
    }


}

async function atualizarProduto(id) {   
    const produto = criarObjetoProduto();
    const url = `${API_URL}/${id}`;

    try {
        await fetch(url, { //envia para a API, padrão para metodos POST
            method: "PUT", //Verbo utilizado para atualizar
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(produto)
        });
        limparFormulario();
        fecharModal();
        buscarProdutos();
    } catch (error) {
        alert("Não foi possivel editar o produto.");
    }
}

function popularFormulario(produto) {
    document.querySelector("#id").value = produto.id;
    document.querySelector("#nome").value = produto.nome;
    document.querySelector("#preco").value = produto.preco;
    document.querySelector("#quantidade").value = produto.quantidade;
}
function limparFormulario(){
    document.querySelector("#id").value = "";
    document.querySelector("#nome").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#quantidade").value = "";
}

function abrirModal(){ //
    const modalHtml = document.querySelector("#modalProduto");
    const modal = bootstrap.Modal.getOrCreateInstance(modalHtml);
    modal.show();
}
function fecharModal(){ //obrigatorio fazer essa solicitação toda vez que for abrir e fechar um modal
    const modalHtml = document.querySelector("#modalProduto");
    const modal = bootstrap.Modal.getOrCreateInstance(modalHtml);
    modal.hide();
}



buscarProdutos();