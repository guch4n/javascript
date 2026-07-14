async function buscarCep() {
 const cepDigitado = document.querySelector("#cep").value;
 const url = `https://viacep.com.br/ws/${cepDigitado}/json/`;

 const resposta = await fetch(url);
 const dados = await resposta.json();

 popularLogradouro(dados);
 popularBairro(dados);
 popularCidade(dados);
 popularSigla(dados);
 popularRegiao(dados);
}

function popularLogradouro(dados) {
    document.querySelector("#logradouro").value = dados.logradouro;
}

function popularBairro(dados) {
    document.querySelector("#bairro").value = dados.bairro;
}

function popularCidade(dados) {
    document.querySelector("#cidade").value = dados.localidade;
}

function popularSigla(dados) {
    document.querySelector("#sigla").value = dados.uf;
}

function popularRegiao(dados) {
    document.querySelector("#regiao").value = dados.regiao;
}