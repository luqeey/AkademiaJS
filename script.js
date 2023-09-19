let userScore = parseInt(localStorage.getItem('userScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
let choiceCountsLS = parseInt(localStorage.getItem('choiceCounts')) || 0
const pCountElement = document.getElementById('p-count')
const cCountElement = document.getElementById('c-count')
const rockCountElement = document.getElementById('rock-count')
const paperCountElement = document.getElementById('paper-count')
const scissorsCountElement = document.getElementById('scissors-count')
let gameResults = [];
let choiceCounts = JSON.parse(localStorage.getItem('choiceCounts')) || {
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
   

    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
    localStorage.setItem('choiceCounts', JSON.stringify(choiceCounts))


}
    

function playGame(playerName, userChoice) {
    const computerChoice = generateComputerChoice();
    const gameResultsTableBody = document.getElementById('gameResultsTableBody');
    const newRow = document.createElement('tr');

    const round = gameResults.length + 1; 

    pCountElement.textContent = userScore;
    cCountElement.textContent = computerScore;
    rockCountElement.textContent = choiceCounts['K'];
    paperCountElement.textContent = choiceCounts['P'];
    scissorsCountElement.textContent = choiceCounts['N'];

    choiceCounts[userChoice]++;
    choiceCounts[computerChoice]++;

    let result = '';

    if (userChoice === computerChoice) {
        alert("Remiza!");
        result = 'Draw';
    } else if (
        (userChoice === 'K' && computerChoice === 'N') ||
        (userChoice === 'P' && computerChoice === 'K') ||
        (userChoice === 'N' && computerChoice === 'P')
    ) {
        alert('Vyhral/a si!');
        result = `${playerName} won`;
        userScore++;
        pCountElement.textContent = userScore;
    } else {
        alert('Prehral/a si!');
        result = 'Computer won';
        computerScore++;
        cCountElement.textContent = computerScore;
    }

    newRow.innerHTML = `
        <td>${round}</td>
        <td>${userScore}</td>
        <td>${computerScore}</td>
        <td>${result}</td>
    `;

    gameResultsTableBody.appendChild(newRow);

    gameResults.push({
        userChoice: userChoice,
        computerChoice: computerChoice,
        result: result
    });

    updateScore();


    if (userScore >= 5) {
        const userInput = prompt(`Gratulujeme, ${playerName}! Dosiahol si score 5. Chceš hrat znova? (ano/nie)`);
        if (userInput !== null) {
            if (userInput.toLowerCase() === "nie") {
                clearLocalStorage();
            } else if (userInput.toLowerCase() === "ano") {
                alert("Pokracuj v hrani a nech sa dari");
            } else {
                alert("Prosim odpovedaj (ano/nie).");
            }
        }
    }
}



function startGame() {
    const playerNameInput = document.getElementById('player-name');
    const playerName = playerNameInput.value.trim();

    if (playerName === '') {
        alert('Prosim zadaj svoje meno');
        return;
    }
    let userInput = prompt("Zadaj: K, P, alebo N:", "");
    if (userInput !== null) {
        var userChoice = userInput.toUpperCase();
        if (userChoice === 'K' || userChoice === 'P' || userChoice === 'N') {
            playGame(playerName, userChoice);
        } else {
            alert('Vyber si z naslednujucich moznosti: K, P, alebo N.');
        }
    }
}

function clearLocalStorage() {
    localStorage.clear()
    location.reload()
}


