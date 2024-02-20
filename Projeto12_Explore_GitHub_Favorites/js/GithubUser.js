export class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)  //fetch é que vai buscar as coisas na internet
        .then(data => data.json())  //transforma os dados de fato em json
        .then((data) => {  //retorna um objeto com os seguintes atributos

            return {
                login: data.login,
                name: data.name,
                public_repos: data.public_repos,
                followers: data.followers
            }
        })
    }
}