
# Aula 07 - Refatorando o Sorteio do Número Secreto

## ✅ Conteúdos abordados

* [X] Refatoração de funções existentes
* [X] Boas práticas para deixar o código mais legível e eficiente
* [X] Melhoria no sorteio de números aleatórios
* [X] Evitar repetição de valores em sorteios
* [X] Garantir robustez e clareza no código

---

## 💡 Descrição da aula

Nesta aula, aprendemos a  **melhorar o código existente** , tornando-o mais  **eficiente e legível** .

O foco foi na refatoração da função responsável por  **sortear o número secreto** , de forma a  **evitar que o mesmo número seja repetido em sorteios consecutivos** .

Discutimos a importância de escrever funções mais  **robustas** , que além de cumprirem sua tarefa, também tratem situações que podem causar problemas na experiência do usuário.

Exemplo do código refatorado:

```javascript
// Lista para armazenar números já sorteados
let numerosSorteados = [];

// Função que sorteia número secreto sem repetição
function gerarNumeroAleatorio(max) {
    let numeroEscolhido;

    do {
        numeroEscolhido = parseInt(Math.random() * max + 1);
    } while (numerosSorteados.includes(numeroEscolhido));

    numerosSorteados.push(numeroEscolhido);

    return numeroEscolhido;
}
```
Testando:

```javascript
let numero = gerarNumeroAleatorio(10);
console.log(`Número sorteado: ${numero}`);
```
---

## 🧩 Desafios realizados

* Criar uma função que garante que os números sorteados não se repitam.
* Armazenar os números já sorteados em uma lista para referência futura.
* Melhorar a legibilidade do código usando nomes de variáveis e funções descritivos.
* Testar a função várias vezes para verificar que o mesmo número não aparece duas vezes.

---

## 📌 O que aprendemos?

* Como **refatorar funções** para deixá-las mais claras e reutilizáveis.
* A importância de **evitar repetição de valores** em algoritmos de sorteio.
* Como utilizar o **método `.includes()`** para verificar se um valor já está presente em uma lista.
* Que **boas práticas de nomeação** tornam o código mais fácil de entender.
