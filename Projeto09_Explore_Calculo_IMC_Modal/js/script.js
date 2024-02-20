import { Modal } from './modal.js'
import {AlertError} from "./alert-error.js"
import { calculateIMC, notANumber } from './utils.js'

// variáveis

const form = document.querySelector("form")
const inputWeight = document.querySelector("#weight")
const inputHeight = document.querySelector("#height")


form.onsubmit = function(event) {
    event.preventDefault()

    const weight = inputWeight.value
    const height = inputHeight.value

    const weightOrHeightIsNotANumber = notANumber(weight) || notANumber(height)

    if (weightOrHeightIsNotANumber) {
        AlertError.open()
        return;
    }

    AlertError.close()

    const result = calculateIMC(weight, height)
    const message = `Seu IMC é de ${result}`

    // so vai abrir o modal quando eu clicar no botao pra calcular

    //modalWrapper.classList.add("open")
    Modal.open()
    Modal.message.innerText = message

}

