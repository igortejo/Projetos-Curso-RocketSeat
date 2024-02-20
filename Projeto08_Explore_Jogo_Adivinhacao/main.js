
// variáveis
const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const buttonTry = document.querySelector("#buttonTry") //capturando o botão
const buttonReset = document.querySelector("#buttonReset") //capturando o botão

const numeroMaquina = Math.round(Math.random() * 10) //valor randomico
let tentativas = 1;

// eventos

buttonTry.addEventListener('click', handleTryClick)
buttonReset.addEventListener('click', handleResetClick)

//funções callback

function handleTryClick(event) {
    event.preventDefault() // o padrao é assim que eu clicar ele submete o form,
                           // entao tou pedindo pra ele nao fazer o padrao (que é enviar), fique em tela

    const inputNumber = document.querySelector("#inputNumber")

    if (Number(inputNumber.value) == numeroMaquina) {
        toggleScreen()
        screen2.querySelector("h2").innerText = `Você acertou em ${tentativas} tentativas`
    
    }
    inputNumber.value = ""
    tentativas++
}

function handleResetClick() {
    toggleScreen()
    tentativas = 1
}

function toggleScreen() {
    screen1.classList.toggle("hide")  //se tiver o hide vai tirar, se nao tiver vai colocar ma screen1
    screen2.classList.toggle("hide")  //se tiver o hide vai tirar, se nao tiver vai colocar ma screen2
}