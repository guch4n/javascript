// const alunos = [
//     "Gustavo",
//     "Nilson",
//     "Alex"
// ]

// alert(alunos[0]);
// for(const aluno of alunos) {
//     console.log(aluno)
// }

const carros = [
    {
    placa: "ABC1234",
    marca: "VW",
    modelo: "Fusca",
    cor: "Azul",
    tetoSolar: false,
    chassi: "AA12345678"
    },
    {
    placa: "ads1245",
    marca: "Chevrolet",
    modelo: "Chevette",
    cor: "Vermelho",
    tetoSolar: true,
    chassi: "AA133345678"
    }
];

// alert(`O carro é : ${carro.marca} ${carro.modelo} - ${carro.placa}`);
// console.log(carros[0].placa);
// console.log(carros[1].placa);

// for(const carro of carros) {
//     console.log(carro.modelo);
// }

function popularTabela(){
    const tbody = document.querySelector("#tabela_carros tbody");
    let html = "";
    for (const carro of carros){
        html += `
            <tr>
                <td>${carro.marca}</td>
                <td>${carro.modelo}</td>
                <td>${carro.cor}</td>
                <td>${carro.placa}</td>
                <td>${carro.chassi}</td>
                <td>${carro.tetoSolar ? "Sim" : "Não"}</td>
            </tr>
        `;
    }

    tbody.innerHTML = html;
}

popularTabela();