// Número máximo (ajuste aqui e o resto acompanha)
const numeroMaximo = 10;

// Estado do jogo
let numerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Sincroniza o <input> com o range
const inputChute = document.getElementById('teste');
inputChute.min = 1;
inputChute.max = numeroMaximo;
inputChute.value = ''; // começa vazio

// Mensagem inicial
mensagemInicial();
console.log('[debug] número secreto:', numeroSecreto);

// --------- Funções utilitárias ---------
function setTextoById(id, texto) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = texto;
}

function falar(texto) {
    if (window.responsiveVoice) {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function exibirTextoNoParagrafo(texto) {
    // Usa o <p id="meu-paragrafo">
    setTextoById('meu-paragrafo', texto);
    falar(texto);
}

function mensagemInicial() {
    // Atualiza H1 e P de forma explícita
    const titulo = 'Jogo do Número Secreto';
    document.querySelector('h1').textContent = titulo;

    const msg = `Escolha um número entre 1 e ${numeroMaximo}:`;
    exibirTextoNoParagrafo(msg);
}

// Gera número sem repetir até esgotar o intervalo
function gerarNumeroAleatorio() {
    const numero = Math.floor(Math.random() * numeroMaximo) + 1;

    if (numerosSorteados.length === numeroMaximo) {
        // Reinicia a lista quando exaurir
        numerosSorteados = [];
    }

    if (numerosSorteados.includes(numero)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numero);
        return numero;
    }
}

function limparCampo() {
    // Evita variável global acidental
    const chute = document.querySelector('#teste');
    chute.value = '';
    chute.focus();
}

// --------- Regras do jogo ---------
function verificarChute() {
    const chute = parseInt(document.querySelector('#teste').value, 10);

    if (Number.isNaN(chute) || chute < 1 || chute > numeroMaximo) {
        exibirTextoNoParagrafo(`O número digitado é inválido ou está fora do intervalo permitido (1–${numeroMaximo}). 🚫`);
        return;
    }

    if (chute === numeroSecreto) {
        const tentativaTxt =
            tentativas === 1 ? 'uma tentativa' :
                tentativas === 2 ? 'duas tentativas' :
                    `${tentativas} tentativas`;

        document.querySelector('h1').textContent = 'Parabéns! Você acertou o número secreto.';
        exibirTextoNoParagrafo(`Você descobriu o número secreto com ${tentativaTxt}! 🎉`);

        document.getElementById('chute').disabled = true;
        document.getElementById('reiniciar').disabled = false;
        document.getElementById('teste').disabled = true;

    } else if (chute > numeroSecreto) {
        exibirTextoNoParagrafo('O número secreto é menor ⬇️.');
        tentativas++;
        limparCampo();

    } else {
        exibirTextoNoParagrafo('O número secreto é maior ⬆️.');
        tentativas++;
        limparCampo();
    }
}

function reiniciarJogo() {
    limparCampo();
    console.clear();

    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;

    document.getElementById('chute').disabled = false;
    document.getElementById('teste').disabled = false;
    document.getElementById('reiniciar').disabled = true;

    mensagemInicial();
    console.log('[debug] número secreto:', numeroSecreto);
}

// Exponho funções para o onclick inline do HTML
window.verificarChute = verificarChute;
window.reiniciarJogo = reiniciarJogo;
