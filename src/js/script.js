const estoqueBaixo = 5

const vinhos = []

let vinhoIdade
let categoria
let nomeVinho
let tipo
let safra
let quantidade

let totalVinhosEstoqueBaixo = 0

let anoAtual = new Date().getFullYear()

let safraAntiga = anoAtual
let vinhoAntigo = ""

let resposta = true


function validaEntrada(entrada){
    return String(entrada).trim() == ""
}


function validaInteiro(numero){
    numero = Number(numero)

    return Number.isInteger(numero) && numero >= 0
}


function validaAno(ano){
    return ano.length !== 4
}


function verificaAntiguidade(vinho){

    if(vinho.safra < safraAntiga){

        safraAntiga = vinho.safra
        vinhoAntigo = vinho.nome

    }

    vinhoIdade = anoAtual - vinho.safra

    if(vinhoIdade <= 3){

        categoria = "Jovem"

    }else if(vinhoIdade <= 10){

        categoria = "Amadurecido"

    }else{

        categoria = "Antigo"

    }

    console.log(`O vinho ${vinho.nome} é considerado ${categoria}`)
}


function verificaEstoque(vinho){

    if(vinho.estoque <= estoqueBaixo){

        totalVinhosEstoqueBaixo++

        console.log(`O vinho ${vinho.nome} está com estoque baixo!`)
    }
}


function adicionarVinho(nome, tipo, safra, quantidade){

    const vinho = {

        nome: nome,
        tipo: tipo,
        safra: safra,
        estoque: quantidade

    }

    vinhos.push(vinho)

    console.log(`O vinho ${nome} foi adicionado com sucesso!`)
}


function listarVinhos(){

    console.log("========== LISTA DE VINHOS ==========")

    vinhos.forEach(function(vinho){

        console.log(`
Nome: ${vinho.nome}
Tipo: ${vinho.tipo}
Safra: ${vinho.safra}
Estoque: ${vinho.estoque}
        `)

    })

}


function mostrarVinhosEstoqueBaixo(){

    const vinhosBaixoEstoque = vinhos.filter(function(vinho){

        return vinho.estoque < estoqueBaixo

    })

    console.log("========== VINHOS COM ESTOQUE BAIXO ==========")

    vinhosBaixoEstoque.forEach(function(vinho){

        console.log(`${vinho.nome} - Estoque: ${vinho.estoque}`)

    })

}


function calcularEstoqueTotal(){

    const estoqueTotal = vinhos.reduce(function(acumulador, vinho){

        return acumulador + vinho.estoque

    }, 0)

    console.log(`Estoque total da vinícola: ${estoqueTotal}`)
}


function mostrarNomesMaiusculos(){

    const nomesMaiusculos = vinhos.map(function(vinho){

        return vinho.nome.toUpperCase()

    })

    console.log("========== NOMES EM MAIÚSCULO ==========")

    console.log(nomesMaiusculos)
}


function mostrarDados(){

    console.log(`
Você tem ${vinhos.length} vinhos cadastrados

Você tem ${totalVinhosEstoqueBaixo} vinhos com estoque baixo

O vinho com a safra mais antiga é ${vinhoAntigo}
    `)

    alert("Verifique os dados dos vinhos cadastrados no console!")
}



while(resposta == true){

    do{

        nomeVinho = prompt("Digite o nome do vinho:")

    }while(validaEntrada(nomeVinho))


    do{

        tipo = prompt("Digite o tipo do vinho (Tinto, Branco, Rosé):")

    }while(validaEntrada(tipo))


    do{

        safra = prompt("Digite a safra do vinho (YYYY):")

    }while(!validaInteiro(safra) || validaAno(safra) || validaEntrada(safra))

    safra = Number(safra)


    do{

        quantidade = prompt("Digite a quantidade em estoque:")

        if(!validaInteiro(quantidade)){

            alert("Digite um número inteiro válido!")

        }

    }while(!validaInteiro(quantidade) || validaEntrada(quantidade))

    quantidade = Number(quantidade)


    adicionarVinho(nomeVinho, tipo, safra, quantidade)


    resposta = prompt(`
Deseja cadastrar mais um vinho?

1 - Sim
2 - Não
    `)

    if(resposta == "2"){

        resposta = false

    }

}


listarVinhos()


vinhos.forEach(function(vinho){

    verificaAntiguidade(vinho)

    verificaEstoque(vinho)

})


mostrarVinhosEstoqueBaixo()


calcularEstoqueTotal()


mostrarNomesMaiusculos()


mostrarDados()