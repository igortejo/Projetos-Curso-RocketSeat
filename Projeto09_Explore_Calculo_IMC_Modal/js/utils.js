//fazer validação se é um número ou nao
export function notANumber(value) {
    return isNaN(value) || value == "" //considera o vazio como um numero nao sei pq
}

export function calculateIMC(weight, height) {
    return (weight / ((height / 100) ** 2)).toFixed(2)
}