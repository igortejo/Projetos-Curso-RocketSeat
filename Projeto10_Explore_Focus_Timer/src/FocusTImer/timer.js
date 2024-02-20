import state from "./state.js";
import * as el from "./elements.js"
import { reset } from "./actions.js";


export function countDown() {
    if (!state.isRunning) {
        return
    }

    let minutes = Number(el.minutes.textContent)
    let seconds = Number(el.seconds.textContent)

    seconds--

    if (seconds < 0) {
        seconds = 59
        minutes--
    }

    if (minutes < 0) {
        reset()
        return
    }


    updateDisplay(minutes,seconds)

    setTimeout( () => countDown(), 1000) //funçao que chama outra funcao apos 1000 milisegundos

}


export function updateDisplay(minutes, seconds) {

    minutes = minutes ?? state.minutes // essa expressao se chama nullish coalesing operator
    seconds = seconds ?? state.seconds //se o valor passado de minutes for null, pega o que tem depois das ??

    el.minutes.textContent = String(minutes).padStart(2,"0")
    el.seconds.textContent = String(seconds).padStart(2,"0")
}