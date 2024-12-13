const teams = [
    { seed: 1, name: "Oregon" },
    { seed: 2, name: "Georgia" },
    { seed: 3, name: "Boise State" },
    { seed: 4, name: "Arizona State" },
    { seed: 5, name: "Texas" },
    { seed: 6, name: "Penn State" },
    { seed: 7, name: "Notre Dame" },
    { seed: 8, name: "Ohio State" },
    { seed: 9, name: "Tennessee" },
    { seed: 10, name: "Indiana" },
    { seed: 11, name: "SMU" },
    { seed: 12, name: "Clemson" }
];

function weightedRandomWinner(team1, team2) {
    // Logarithmic weights to make probabilities closer
    const weight1 = 1 / Math.log(team1.seed + 1); // +1 to handle log(0) cases
    const weight2 = 1 / Math.log(team2.seed + 1);
    const totalWeight = weight1 + weight2;
    const random = Math.random() * totalWeight;
    return random < weight1 ? team1 : team2;
}


function simulateRound(matchups) {
    const winners = [];
    const roundResults = document.getElementById('roundResults');
    roundResults.innerHTML += "<h4>New Round</h4>";

    matchups.forEach(matchup => {
        const winner = weightedRandomWinner(matchup[0], matchup[1]);
        winners.push(winner);
        roundResults.innerHTML += `
            <div class="matchup">
                ${matchup[0].name} (Seed ${matchup[0].seed}) vs 
                ${matchup[1].name} (Seed ${matchup[1].seed}) - 
                <strong>Winner: ${winner.name} (Seed ${winner.seed})</strong>
            </div>
        `;
    });

    return winners;
}

function simulatePlayoff() {
    const roundResults = document.getElementById('roundResults');
    roundResults.innerHTML = ""; // Clear previous results
    let currentMatchups = [
        [teams[7], teams[8]], // 8 vs 9
        [teams[4], teams[11]], // 5 vs 12
        [teams[5], teams[10]], // 6 vs 11
        [teams[6], teams[9]] // 7 vs 10
    ];

    // First Round
    const firstRoundWinners = simulateRound(currentMatchups);

    // Quarterfinals
    currentMatchups = [
        [teams[0], firstRoundWinners[0]], // 1 vs 8/9 winner
        [teams[3], firstRoundWinners[1]], // 4 vs 5/12 winner
        [teams[2], firstRoundWinners[2]], // 3 vs 6/11 winner
        [teams[1], firstRoundWinners[3]] // 2 vs 7/10 winner
    ];
    const quarterfinalWinners = simulateRound(currentMatchups);

    // Semifinals
    currentMatchups = [
        [quarterfinalWinners[0], quarterfinalWinners[1]], // 1/8/9 vs 4/5/12
        [quarterfinalWinners[2], quarterfinalWinners[3]] // 3/6/11 vs 2/7/10
    ];
    const semifinalWinners = simulateRound(currentMatchups);

    // Championship
    currentMatchups = [[semifinalWinners[0], semifinalWinners[1]]];
    const champion = simulateRound(currentMatchups)[0];

    // Display champion
    document.getElementById('champion').textContent = `${champion.name} (Seed ${champion.seed})`;
}
