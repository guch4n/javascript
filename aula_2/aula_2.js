function calcularMedia(botao) {
    const linha = botao.closest('tr');
    // console.log(linha);
    const nota1 = Number(linha.querySelector(".nota_1").value);
    const nota2 = Number(linha.querySelector(".nota_2").value);
    const resultado = (nota1 + nota2)/2; 
    // console.log(resultado);
    const colunaMedia = linha.querySelector(".media");
    colunaMedia.textContent = resultado.toFixed(2); //definir numero maximo de casas decimais após a virgula

    // const status = resultado >= 7 ? "Aprovado":"Reprovado";
    let badge = "";
    if(resultado >= 7) {
        badge = `<span class="badge text-bg-success">Aprovado</span>`
    }else {
        badge = `<span class="badge text-bg-danger">Reprovado</span>`
    }

    const colunaStatus = linha.querySelector(".status");
    colunaStatus.innerHTML = badge;

}