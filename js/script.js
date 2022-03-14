// Estado de la APP
let STATE = {
    currentWord: "", // Aquí debemos guardar el resultado de getNextWord()
    currentProgressWord: 0, // indica cual es la siguiente posición del "currentWord" a procesar

    // Si le pasas una letra, te dice si esa letra va justamente en la posición 'currentProgressWord'
    isCorrectLetter: function (inputLetter) {
        return this.currentWord[STATE.currentProgressWord] == inputLetter;
    },

    // Nos indica si hemos escrito ya toda la letra
    isWordFinished: function () {
        return this.currentProgressWord == this.currentWord.length;
    }
}

let completedWords = [];

// Paso 1: al hacer click en el botón empezar, obtener la primera palabra a procesar. Debemos también ocultar el botón de empezar y mostrar el contenedor con la palabra a escribir. Añadir el listener de teclado

document.querySelector("#start-game button").addEventListener("click", startGame);
// document.body.addEventListener("keypress", keyPressed);

function startGame() {
    document.querySelector("#start-game").classList.add("w3-hide");
    document.querySelector("#next-word-card").classList.remove("w3-hide");

    beginWord();
}

function beginWord() {
    STATE.currentWord = getNextWord();
    STATE.currentProgressWord = 0;

    document.querySelector("#next-word").innerHTML = STATE.currentWord;
    Watch.startWatch();

    document.body.addEventListener("keypress", keyPressed);

    function keyPressed(event) {
        const acceptedCharacters = "abcdefghijklmnñopqrstuvwxyz";
        const character = event.key.toLowerCase();
        console.log(character);

        if (acceptedCharacters.includes(character)) {
            if (STATE.isCorrectLetter(character)) {
                STATE.currentProgressWord++;
                document.querySelector("#next-word").innerHTML =
                    `<span style="color: green">${STATE.currentWord.substring(0, STATE.currentProgressWord)}</span>${STATE.currentWord.substring(STATE.currentProgressWord, STATE.currentWord.length)}`

                if (STATE.isWordFinished()) {
                    document.body.removeEventListener("keypress", keyPressed);
                    wordFinished();
                }
            }
        }
    }
}

function wordFinished() {
    completedWords.push({ word: STATE.currentWord, time: Watch.stopWatch() });
    console.log(completedWords[completedWords.length - 1]);

    beginWord();
}