function exibirMensagemInicial() {
    exibirTextoNaTela('h1' , 'Jogo do número secreto'); //Linha 22 index.html
    exibirTextoNaTela('p' , 'Escolha um número entre 1 e 10'); //Linha 23 index.html
}
/*
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo do número secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha um número entre 1 e 10';
*/

//Essa função substitui o código das linhas 6 á 10.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

exibirMensagemInicial();

let listaDeNumerosSorteados = []; //Cria uma lista vazia

let numeroSecreto = gerarNumeroAleatorio(); // A função gerarNumeroAleatorio esta na linha 47
    console.log('Numero aleatório gerado: ' , numeroSecreto);
let tentativas = 1;

function verificarChute() {
    let chute = document.querySelector('input').value; //Linha 25 index.html
    console.log(chute == numeroSecreto); // Exibe false ou true no Console.

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1' , 'Acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Que bom, você descobriu o Número Secreto com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela('p' , mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); //Linha 28 index.html habilita botão "Novo Jogo" 
    }   else {
        if (chute > numeroSecreto) {
           exibirTextoNaTela('p' , 'O Número Secreto é menor!'); 
        } else {
            exibirTextoNaTela('p' , 'O Número Secreto é maior!'); 
        }
        tentativas++;
        limparCampo(); //Esta função esta nas linha 67/71 - Remove o último 'Chute' da tela 

    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * 10 + 1); // Gera um numero entre 1 e 10 e armazena em numeroEscolhido
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; //length = tamanho da lista

    if (quantidadeDeElementosNaLista == 10) { //Se a quantidade de itens na lista for igual a 10 esvaziar a lista
        listaDeNumerosSorteados = [];
    }
        
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // {Método .includes} Se o numeroEscolhido já estiver na lista - gerarNumeroAleatorio (Novo para não ter numeros repetidos na mesma lista)
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // {Método .push} adiciona numeroEscolhido ao final da listaDeNumerosSorteados
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
    
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
    
}

function reiniciarJogo() { // Esta função é chamada ao clicar no botão "Novo jogo" index.html linha 28 
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desativa o botão "Novo Jogo" até enquanto o número secreto não for descoberto. 
    
}