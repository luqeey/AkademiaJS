var userScore = parseInt(localStorage.getItem('userScore')) || 0;
var computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
const pCountElement = document.getElementById('p-count')
const cCountElement = document.getElementById('c-count')
const rockCountElement = document.getElementById('rock-count')
const paperCountElement = document.getElementById('paper-count')
const scissorsCountElement = document.getElementById('scissors-count')
var gameResults = [];
var choiceCounts = {
    'K': 0,
    'P': 0,
    'N': 0
}

function generateComputerChoice() {
    const choices = Object.keys(choiceCounts); 
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateScore() {
    pCountElement.textContent = userScore;
    cCountElement.textContent = computerScore;
    rockCountElement.textContent = choiceCounts['K'];
    paperCountElement.textContent = choiceCounts['P'];
    scissorsCountElement.textContent = choiceCounts['N'];

    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('choiceCounts', JSON.stringify(choiceCounts))

    console.log('userscore:', userScore);
    console.log('computerscore:', computerScore);
}

function playGame(userChoice) {
    const computerChoice = generateComputerChoice();
    const playerScoreBoard = pCountElement
    const computerScoreBoard = cCountElement

    choiceCounts[userChoice]++;
    choiceCounts[computerChoice]++;

    console.log("You chose:", userChoice);
    console.log("Computer chose:", computerChoice);

    if (userChoice === computerChoice) {
        alert("Remiza!");
        console.log("Remiza")
    } else if (
        (userChoice === 'K' && computerChoice === 'N') ||
        (userChoice === 'P' && computerChoice === 'K') ||
        (userChoice === 'N' && computerChoice === 'P')
    ) {
        alert('Vyhral/a si!');
        console.log("Vyhral si!")
        userScore++;
        playerScoreBoard.innerHTML = userScore;
    } else {
        alert('Prehral/a si!');
        console.log("Prehral si!")
        computerScore++;
        computerScoreBoard.innerHTML = computerScore;
    }

    gameResults.push({
        userChoice: userChoice,
        computerChoice: computerChoice,
        result: gameResults
    });
    console.log(choiceCounts)

    updateScore();
}

function startGame() {
    var userInput = prompt("Zadaj: K, P, alebo N:", "");
    if (userInput !== null) {
        var userChoice = userInput.toUpperCase();
        if (userChoice === 'K' || userChoice === 'P' || userChoice === 'N') {
            playGame(userChoice);
        } else {
            alert('Vyber si z naslednujucich moznosti: K, P, alebo N.');
        }
    }
}

function clearLocalStorage() {
    localStorage.clear()
    location.reload()
}
