import { GithubUser } from "./GithubUser.js"

//classe que vai conter a logica dos dados 

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()

        //GithubUser.search('igortejo').then(user => console.log(user)) //vai buscar esse user no github. Tenho que usar o then pra dar continuidade a promessa
    }

    load() { //carregamento dos dados

        this.entries = JSON.parse(localStorage.getItem('github-favorites:')) || []

        // this.entries = [
        //     {
        //         login: "igortejo",
        //         name: "Igor Tejo",
        //         public_repos: "76",
        //         followers: "120000"
        //     },
        //     {
        //         login: "maykbrito",
        //         name: "Mayk Brito",
        //         public_repos: "76",
        //         followers: "120000"
        //     }
        // ]
    }

    save() {   //salvar no local storage
        localStorage.setItem('github-favorites:', JSON.stringify(this.entries))
    }


    async add(username) {

        try {

            // nao permitir cadastrar duas vezes a mesma pessoa
            const userExists = this.entries.find(entry => entry.login === username) //retorna true ou false (higher order function)

            if(userExists) {
                throw new Error('Usuário já cadastrado')
            }


            const user = await GithubUser.search(username) //aguardar essa promessa ser terminada
            
            if (user.login === undefined) {
                throw new Error('Usuário não encontrado!')
            }

            this.entries = [user, ...this.entries] //cria um novo array, add o novo user e espalha (...) o array antigo nesse novo
            this.update()
            this.save()  //add e salvo pra ficar no localStorage

        } catch(error) {
            alert(error.message)
        }

    }

    delete(user) {
        //funçao que retorna verdadeiro ou falso (se falso ele deleta da filtragem se vdd ele deixa)
        const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

        this.entries = filteredEntries //atualizando entries com os novos valores filtrados
        this.update()
        this.save()  //deleto e salvo pra atualizar o localStorage

    }
}

// classe que vai criar a visualizacao e eventos no html

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.querySelector('table tbody')


        this.update()
        this.onadd()
    }

    onadd() { //pesquisando no input se determinado usuário existe
        const addButton = this.root.querySelector('.search button')
        addButton.onclick = () => {
            const input = this.root.querySelector('.search input')
            //console.log(input.value) //dentre as varias propriedades que o input retorna, pegue apenas o value
           // console.dir //dir mostra o html no console como objeto

           this.add(input.value)
        }
    }

    update() {
       this.removeAllTr()

        this.entries.forEach( user => {  //para cada objeto do array entries faça essa function
            const row = this.creatRow()

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.name}`
            row.querySelector(".user a").href = `https://github.com/${user.login}`
            row.querySelector(".user p").textContent = user.name
            row.querySelector(".user span").textContent = user.login
            row.querySelector(".repositories").textContent = user.public_repos
            row.querySelector(".followers").textContent = user.followers

            row.querySelector(".remove").onclick = () => {   //como so vou usar essa vez, posso usar o onclick no lugar do addEventeListener
                const isOk = confirm('Tem certeza que deseja deletar essa linha?')
                if(isOk) {
                    this.delete(user)
                }
            }

            this.tbody.append(row)
        })
    }

    creatRow() {
        
        const tr = document.createElement('tr') //o elemento tr tem que ser criado usando a DOM
        
        const content = `
        <td class="user">
        <img src="https://github.com/igortejo.png" alt="Foto Igor Tejo">
        <a href="https://github.com/igortejo" target="_blank">
        <p>Igor Tejo</p>
        <span>igortejo</span>
        </a>
        </td>
        <td class="repositories">
        76
        </td>
        <td class="followers">
        9589
        </td>
        <td>
        <button class="remove">&times;</button>
        </td>
        `
        tr.innerHTML = content //passando os dados da tr para dentro da tr

        return tr
    }


    removeAllTr() {

        this.tbody.querySelectorAll('tr').forEach(function(tr) {
            tr.remove()
        })
    }
}