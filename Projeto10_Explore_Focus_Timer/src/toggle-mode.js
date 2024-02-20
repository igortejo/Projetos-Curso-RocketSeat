let darkMode = true
const buttonToggle = document.getElementById('toggle-mode')

buttonToggle.addEventListener('click', function(event){

    document.documentElement.classList.toggle("light") //esse documentElement se refere ao HTML

    const mode = darkMode ? 'light' : 'dark'
    event.currentTarget.querySelector('span').textContent = `${mode} mode ativado!`

    darkMode = !darkMode //inverter de true pra falso apos o click
})