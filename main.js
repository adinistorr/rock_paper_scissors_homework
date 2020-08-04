// Rock, paper, scissors game
// Create a JavaScript file with the following content:

// A “play” function that is a “Rock, paper, scissors” game. 

// Implementations notes: ­ 

// Create an array with all the possibilities (rock, paper, scissors); ­ 
// Pick a random option for Computer ( use Math.random); ­ 
// Pick a random option for User ( use Math.random); ­ 
// Apply game rules for both options (use if/else if structures) 
// Calling “play()” function will display in console something like this: Computer choice: “Rock” User choice: “Paper” User wins!

// For bonus points:
// Have an HTML page
// Have a select box for the user to pick an option
// Have a button to trigger the play function
// Display the result in the page instead of the console same as described above. (grab an html element and update its innerText)

const OptionsEnum = {
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors'
}

const WinnerEnum = {
    COMPUTER: 'COMPUTER',
    USER: 'USER',
    DRAW: 'DRAW'
}

const options = Object.values(OptionsEnum);
const playButtonDOM = document.querySelector('#play-button');
const selectDOM = document.querySelector('#options');
let computerScoreDOM = document.querySelector('.computer-score');
let computerImageDOM = document.querySelector('.computer-image');
let userScoreDOM = document.querySelector('.user-score');
let userImageDOM = document.querySelector('.user-image');
let resultMessageDOM = document.querySelector('.result-message');
let spinnerDOM = document.querySelectorAll('.preloader');
let isLoading = false;
let userScore = 0;
let computerScore = 0;

playButtonDOM.addEventListener('click', play);

function play() {
    isLoading = true;
    showHideElements();

    const computerChoice = options[randomIndex()];    
    const userChoice = selectDOM.selectedOptions[0].innerText;

    let winner = applyRules(computerChoice, userChoice);
    
    setTimeout(() => {
        isLoading = false;
        showHideElements();
        updateDOM(winner, userChoice, computerChoice);
    }, 500);
}

function applyRules(computerChoice, userChoice) {
    if (computerChoice === userChoice) {
        return WinnerEnum.DRAW;
    }

    switch (userChoice) {
        case OptionsEnum.ROCK:
            if (computerChoice === OptionsEnum.PAPER) {
                return WinnerEnum.COMPUTER
            }
            if (computerChoice === OptionsEnum.SCISSORS) {
                return WinnerEnum.USER
            }
        case OptionsEnum.PAPER:
            if (computerChoice === OptionsEnum.SCISSORS) {
                return WinnerEnum.COMPUTER
            }
            if (computerChoice === OptionsEnum.ROCK) {
                return WinnerEnum.USER
            }
        case OptionsEnum.SCISSORS:
            if (computerChoice === OptionsEnum.ROCK) {
                return WinnerEnum.COMPUTER
            }
            if (computerChoice === OptionsEnum.PAPER) {
                return WinnerEnum.USER
            }
    }
}

function updateDOM(winner, userChoice, computerChoice) {
    let displayMessage = `User choice: "${userChoice}" | Computer choice: "${computerChoice}". <br>`;
    
    switch (winner) {
        case WinnerEnum.COMPUTER:
            computerScore += 1;
            displayMessage += 'COMPUTER WINS!';
            break;
        case WinnerEnum.USER:
            userScore += 1;
            displayMessage += 'USER WINS!';
            break;
        case WinnerEnum.DRAW:
            displayMessage += 'IT\'S A DRAW!';
            break;
    }

    computerImageDOM.src = `media/${computerChoice}.png`.toLowerCase();
    userImageDOM.src = `media/${userChoice}.png`.toLowerCase();

    computerScoreDOM.innerText = computerScore;
    userScoreDOM.innerText = userScore;
    resultMessageDOM.innerHTML = displayMessage;
}

function showHideElements() {
    if (isLoading) {
        showHideUserImg('add');
        showHidePreLoaders('remove');
    } else {
        showHideUserImg('remove');
        showHidePreLoaders('add');
    }
}

function showHideUserImg(action) {
    resultMessageDOM.classList[action]('d-none');
    userImageDOM.classList[action]('d-none');
    computerImageDOM.classList[action]('d-none');
}

function showHidePreLoaders(action) {
    spinnerDOM.forEach(spinner => {
        spinner.classList[action]('d-none');
    })
}

function randomIndex() {
    return Math.floor(Math.random() * options.length);
}