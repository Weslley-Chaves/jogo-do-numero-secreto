


// Número máximo para gerar o número aleatório
const numeroMaximo = 10;

// Compartamento inicial do código - Criação do Número Secreto Aleatório / Váriavel para armazenar o número de tentativas / Impressão da mensagem inicial do Programa
let numerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1
console.log(numeroSecreto)
mensagemInicial();

// Função para modificar texto na tela
function modificarTextoId(id, texto) {
    document.getElementById(id).textContent = texto;
}
// Função para exibir texto na tela
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}
// Função para exibir a mensagem inicial
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximo}:`);
}
// Função de Geração do número secreto
function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroMaximo + 1);
    let quantidaDeElementosNaLista = numerosSorteados.length;
    if (quantidaDeElementosNaLista == numeroMaximo) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}
// Função para limpar o campo
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''
}
// Função principal
function verificarChute() {
    let chute = parseInt(document.querySelector('input').value);
    let mensagem = `Você descobriu o número secreto com ${tentativas == 1 ? 'uma' : tentativas == 2 ? 'duas' : tentativas} tentativa${tentativas > 1 ? 's' : ''}!`;

    if (isNaN(chute) || chute < 1 || chute > numeroMaximo) {
        exibirTextoNaTela('p', `O número digitado é inválido ou está fora do intervalo permitido. 🚫`);
        return;
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela('h1', `Parabéns! Você acertou o número Secreto.`);
        exibirTextoNaTela('p', mensagem);
        document.getElementById('chute').disabled = true;
        document.getElementById('reiniciar').disabled = false;
        document.getElementById('teste').disabled = true;

    } else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', `O número secreto é menor ⬇️.`);
        tentativas++;
        limparCampo();
    } else {
        exibirTextoNaTela('p', `O número secreto é maior ⬆️.`);
        tentativas++;
        limparCampo();
    }
}
// Função para reiniciar o jogo
function reiniciarJogo() {
    limparCampo();
    console.clear();
    mensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    console.log(numeroSecreto);
    tentativas = 1;
    document.getElementById('chute').removeAttribute('disabled');
    document.getElementById('teste').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true)
}
