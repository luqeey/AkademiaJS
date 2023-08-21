var userScore = parseInt(localStorage.getItem('userScore')) || 0;
var computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
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
    // Update scores in the HTML
    document.querySelector('.p-count').textContent = userScore;
    document.querySelector('.c-count').textContent = computerScore;
    document.querySelector('.rock-count').textContent = choiceCounts['K'];
    document.querySelector('.paper-count').textContent = choiceCounts['P'];
    document.querySelector('.scissors-count').textContent = choiceCounts['N'];

    // Update scores in localStorage
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('choiceCounts', JSON.stringify(choiceCounts))

    // Log scores to the console
    console.log('userscore:', userScore);
    console.log('computerscore:', computerScore);
}

function playGame(userChoice) {
    const computerChoice = generateComputerChoice();
    const playerScoreBoard = document.querySelector('.p-count');
    const computerScoreBoard = document.querySelector('.c-count');

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

    // Call updateScore to update and log scores
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
