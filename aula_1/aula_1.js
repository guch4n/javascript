// console.log("Olá mundo!");
// const nome = prompt("Digite seu nome:");
// alert("Bem vindo " + nome);

function somar() {
  const n1 = Number(prompt("Digite o primeiro numero: "));
  const n2 = Number(prompt("Digite o segundo numero: "));
  const resultado = n1 + n2;
  alert(`O resultado é de: ${resultado}`);
}

function multiplicar() {
    const n1 = Number(prompt("Digite o 1º numero:"));
    const n2 = Number(prompt("Digite o 2º numero:"));
    const resultado = n1 * n2;
    alert(`O resultado da multiplicação é: ${resultado}`);
}

function somarInputs() {
    const n1 = Number(document.querySelector("#n1_soma").value);
    const n2 = Number(document.querySelector("#n2_soma").value);
    console.log(n1, n2);
    const resultado = n1 + n2;
    document.querySelector("#resultado_soma").textContent = `O resultado da soma é ${resultado}`;
}

function multiplicarInputs() {
    const n1 = Number(document.querySelector("#n1_multiplicacao").value);
    const n2 = Number(document.querySelector("#n2_multiplicacao").value);
    console.log(n1, n2);
    const resultado = n1 * n2;
    document.querySelector("#resultado_multiplicacao").textContent = `O resultado da multiplicação é ${resultado}`;
}

// somar();

