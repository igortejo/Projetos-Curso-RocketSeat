export const AlertError = {
    
    element: document.querySelector('.alert-error'),
    open: function(){
        AlertError.element.classList.add("open")
    },
    close: function(){
        AlertError.element.classList.remove("open")
    }

}