import state from "./state.js"
import { controls } from "./elements.js";
import * as actions from './actions.js';
import * as el from "./elements.js"
import {updateDisplay} from "./timer.js"

// capturando os eventos de click

export function registerControls() {
    controls.addEventListener('click', function(event){
        const action = event.target.dataset.action

        if(typeof actions[action] != "function") {
            return
        }

        actions[action]()
    })
}


// quando minutes tiver em focus faça isso (apague automaticamente os minutos)
export function setMinutes() {
    el.minutes.addEventListener('focus', () => {
        el.minutes.textContent = ""
    }) 

    el.minutes.onkeypress = (event) => /\d/.test(event.key)  //funcao para aceitar apenas números

    el.minutes.addEventListener('blur', (event) => {
        let time = event.currentTarget.textContent
        time = time > 60 ? 60 : time

        state.minutes = time
        state.seconds = 0

        updateDisplay()
        el.minutes.removeAttribute('contenteditable')  //nao permitir mais editar apos sair do focus
    })
}