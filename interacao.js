function calculaDatas() {
    var hoje = document.getElementById("hoje").value
    var vencimento = document.getElementById("vencimento").value
    hoje = new Date(hoje)
    vencimento = new Date(vencimento)

    var diffInTime = Math.abs(hoje - vencimento)
    var timeInOnDay = 1000 * 60 * 60 * 24
    var diffInDays = diffInTime / timeInOnDay

    return diffInDays

}

function atualizar() {
    var exibicao = document.getElementById("exibir")
    var valor = Number(document.getElementById("valor").value)
    var juros = ajuste((valor * 0.33) / 100, 2)
    var multa = ajuste((valor * 2) /100, 2)
    var credito = document.getElementById('credito')
    var taxa = document.getElementById('taxa')
    var atraso = calculaDatas()


    if(atraso <= 0){
        var resultado = valor
        exibicao.innerHTML = `R$ ${resultado}`
        credito.innerHTML = `R$ ${ajuste(resultado + (resultado * 4 /100),2)}`
        taxa.innerHTML = `R$ ${ajuste(resultado * 4 / 100, 2)}`
    }else{
        var resultado = juros * atraso + multa + valor
        exibicao.innerHTML = `R$ ${ajuste(resultado,2)}`
        credito.innerHTML = `R$ ${ajuste(resultado + (resultado * 4 /100),2)}`
        taxa.innerHTML = `R$ ${ajuste(resultado * 4 / 100, 2)}`
    }
  
    negociar()
}

function negociar() {
    var exibicao = document.getElementById("totalJuros15dias")
    var valor = Number(document.getElementById("valor").value)
    var juros = ajuste((valor * 0.33) / 100, 2)
    var multa = ajuste((valor * 2) /100, 2)
    var atraso = calculaDatas()
    var diasDeUso15 = valor / 2
    var juros15credito = document.getElementById("juros15credito")
    var juros15taxa = document.getElementById("juros15taxa")

    var resultado = juros * atraso + multa + valor + diasDeUso15
    exibicao.innerHTML = `R$ ${ajuste(resultado,2)}`
    juros15credito.innerHTML = `R$ ${ajuste(resultado + (resultado * 4 / 100),2)}`
    juros15taxa.innerHTML = `R$ ${ajuste(resultado * 4 / 100,2)}`

    proporcional()
    descricao(valor/30,juros,atraso,multa,diasDeUso15)
}

function proporcional() {
    var exibicao = document.getElementById("exibirproporcional")
    var valor = Number(document.getElementById("valor").value)
    var proporcional = Number(document.getElementById('proporcional').value)
    var juros = ajuste((valor * 0.33) / 100, 2)
    var multa = ajuste((valor * 2) /100, 2)
    var atraso = calculaDatas()
    var diasDeUso15 = valor / 2
    var creditoproporcional = document.getElementById("creditoproporcional")
    var taxaproporcional = document.getElementById("taxaproporcional")

    var resultado = juros * atraso + multa + valor + diasDeUso15 + proporcional * ajuste(valor / 30,2)
    exibicao.innerHTML = `R$ ${ajuste(resultado,2)}`
    creditoproporcional.innerHTML = `R$ ${ajuste(resultado + (resultado * 4 / 100),2)}`
    taxaproporcional.innerHTML = `R$ ${ajuste(resultado * 4 / 100,2)}`
}

function descricao(parametro1,parametro2,parametro3,parametro4,parametro5) {
    document.getElementById('valorDiaDeUso').innerHTML = ajuste(parametro1, 2)
    document.getElementById('jurosAoDia').innerHTML = ajuste(parametro2, 2)
    document.getElementById('diasDeAtraso').innerHTML = parametro3
    document.getElementById('juros').innerHTML = ajuste(parametro2 * parametro3, 2)
    document.getElementById('multa').innerHTML = ajuste(parametro4, 2)
    document.getElementById('diasDeConsumo15').innerHTML = ajuste(parametro5, 2)
}


function multaRescisoria(){
    var valorPlanoMulta = document.getElementById("valorPlano").value
    var parcelasRestantes = document.getElementById("parcelasRes").value
    var resultadoMulta = ((valorPlanoMulta/100) * 30) * parcelasRestantes

    var exibicao = document.getElementById("exibir").innerHTML = `R$ ${ajuste(resultadoMulta,2)}`
    var credito = document.getElementById('credito').innerHTML = `R$ ${ajuste((resultadoMulta * 0.04)+resultadoMulta,2)}`
    var taxa = document.getElementById('taxa').innerHTML = `R$ ${ajuste(resultadoMulta * 0.04,2)}`


    var diasDeUso = document.getElementById("diasDeUso").value
    var exibicaoDiasDeUso = document.getElementById("valosDiasDeUso")
    var valorDiasDeUso = (valorPlanoMulta/30)*diasDeUso
    exibicaoDiasDeUso.innerHTML = `R$ ${ajuste(valorDiasDeUso,2)}`
    var diasDeUsoCredito = document.getElementById('diasDeUsoCredito')
    diasDeUsoCredito.innerHTML = `R$ ${ajuste((valorDiasDeUso*0.04)+valorDiasDeUso,2)}`
    document.getElementById('taxaDiasDeUso').innerHTML = `R$ ${ajuste(valorDiasDeUso*0.04,2)}`
    
    var valorTotal = resultadoMulta+valorDiasDeUso
    document.getElementById('exibirTotal').innerHTML = `R$ ${ajuste(valorTotal,2)}`
    document.getElementById('creditoTotal').innerHTML = `R$ ${ajuste((valorTotal*0.04)+valorTotal,2)}`
    document.getElementById('taxaTotal').innerHTML = `R$ ${ajuste(valorTotal*0.04,2)}`

    var valor3Mensalidades = valorPlanoMulta * 3
    document.getElementById('valor3Mensalidades').innerHTML = `R$ ${ajuste(valor3Mensalidades,2)}`
    document.getElementById('valor3MensalidadesCredito').innerHTML = `R$ ${ajuste((valor3Mensalidades*0.04)+valor3Mensalidades,2)}`
    document.getElementById('valor3MensalidadesTaxa').innerHTML = `R$ ${ajuste(valor3Mensalidades*0.04,2)}`

}
function ajuste(num,casas) {
    const og = Math.pow(10,casas)
    return Math.floor(num * og) / og
}
