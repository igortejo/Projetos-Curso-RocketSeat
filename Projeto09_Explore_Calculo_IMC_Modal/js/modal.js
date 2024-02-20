
//passei as variaveis abaixo pra dentro do objeto Modal

// const modalWrapper = document.querySelector(".modal-wrapper")
// const modalMessage = document.querySelector(".modal .title span")
// const modalButtonClose = document.querySelector(".modal button ")

//object literals (cria um objeto no qual seus atributos recebem funções)

export const Modal = {
    wrapper:document.querySelector(".modal-wrapper"),
    message:document.querySelector(".modal .title span"),
    buttonClose:document.querySelector(".modal button "),

    open: function() {Modal.wrapper.classList.add("open")},
    close: function() {Modal.wrapper.classList.remove("open")}
}

Modal.buttonClose.onclick = function() {
    //modalWrapper.classList.remove("open")
    Modal.close()
}

//fechar o modal com a tecla esc (Escape)

window.addEventListener("keydown" , handleKeydown)

function handleKeydown(event) {
    if (event.key === 'Escape') {
        Modal.close()
    }
}