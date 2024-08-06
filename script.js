import {fightersData} from './ufc-stat.js';
let fighter = ''
let count = 0;
let fighterStat = [];
document.addEventListener('DOMContentLoaded', function() {
    const loadFightersButton = document.getElementById('loadFighters');
    if (loadFightersButton) {
        loadFightersButton.addEventListener('click', function() {
            let data;
            let isValidFighter = false;
            while (!isValidFighter) {
                const randomIndex = Math.floor(Math.random() * fightersData.length);
                data = fightersData[randomIndex];
                isValidFighter = Object.values(data).every(value => value !== "" && value != null);
              }

             fighter = data.name;
            const birthDate = new Date(data.date_of_birth);
            const age = new Date().getFullYear() - birthDate.getFullYear();

            const weightclass = determineWeightClass(data.weight_in_kg)
            const wc = weightclassWeight(weightclass);


            fighterStat = [data.nickname, data.height_cm, weightclass, data.reach_in_cm, data.stance, data.wins, data.losses, data.draws, age, wc];
            console.log(capitalizeName(data.name)); 

            document.getElementById('userGuess').value = '';
            document.getElementById('result').innerText = '';
            document.getElementById('hint').innerHTML = '';

            
            var hintTitles = document.querySelectorAll('.hintT');
            hintTitles.forEach(function(element) {
                element.style.display = 'block';
            });

            var gameElements = document.querySelectorAll('.game-elements');
            gameElements.forEach(function(element) {
                element.style.display = 'block';
            });
            count = 0;
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const giveUpButton = document.getElementById('giveUpButton');
    if (giveUpButton) {
        giveUpButton.addEventListener('click', clearGame);
    }
});

function clearGame() {

    var modal = document.getElementById("failure");
    modal.style.display = "block";
    
    var span = document.querySelector(".fclose");
    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    document.getElementById('answer').innerText = capitalizeName(fighter);

    document.getElementById('randomFighter').innerText = '';
    document.getElementById('userGuess').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('hint').innerHTML = '';
    document.getElementById('hintT').style.display = 'none';

    var gameElements = document.querySelectorAll('.game-elements');
    gameElements.forEach(function(element) {
        element.style.display = 'none';
    });

    const table = document.getElementById('fighter-picked-table');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function correctClearGame(){
    document.getElementById('randomFighter').innerText = '';
    document.getElementById('userGuess').value = '';
    document.getElementById('result').innerText = '';
    document.getElementById('hint').innerText = '';
    document.getElementById('hint').innerHTML = '';
    document.getElementById('hintT').style.display = 'none';
    var modal = document.getElementById("failure");

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    var gameElements = document.querySelectorAll('.game-elements');
    gameElements.forEach(function(element) {
        element.style.display = 'none';
    });

    const table = document.getElementById('fighter-picked-table');
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitGuess').addEventListener('click', submitGuess);
});

function submitGuess() {
    const userGuess = document.getElementById('userGuess').value;
    const result = userGuess.toLowerCase() === fighter.toLowerCase() ? "Correct!" : "Incorrect!";
    document.getElementById('result').innerText = result;
    if (result === "Incorrect!") {
        count++;
        addRow(userGuess, "Incorrect!");
        switch (count) {
            case 1:
                hint.innerHTML = `Age: ${fighterStat[8]}`;
                break;
            case 2:
                hint.innerHTML = `Age: ${fighterStat[8]}<br>Stance: ${fighterStat[4]}`;
                break;
            case 3:
                hint.innerHTML = `Age: ${fighterStat[8]}<br>Stance: ${fighterStat[4]}<br>Weight Class: ${fighterStat[2]}`;
                break;
            case 4:
                hint.innerHTML = `Age: ${fighterStat[8]}<br>Stance: ${fighterStat[4]}<br>Weight Class: ${fighterStat[2]}<br>Record: ${fighterStat[5]} - ${fighterStat[6]} - ${fighterStat[7]}`;
                break;
            case 5:
                hint.innerHTML = `Age: ${fighterStat[8]}<br>Stance: ${fighterStat[4]}<br>Weight Class: ${fighterStat[2]}<br>Record: ${fighterStat[5]} - ${fighterStat[6]} - ${fighterStat[7]}<br>Nickname: ${fighterStat[0]}`;
                break;}
    } else {
        addRow(userGuess, "Correct!");
        hint.innerHTML = '';
    }
    document.getElementById('userGuess').value = '';
}

function addRow(guess, result) {
    const table = document.getElementById('fighter-picked-table');
    let row;

    if (result === 'Correct!') {

        row = table.insertRow(-1);
        row.style.backgroundColor = '#00ff00';
        
        row.insertCell(0).innerHTML = capitalizeName(fighter);
        row.insertCell(1).innerHTML = fighterStat[0];
            row.insertCell(2).innerHTML = fighterStat[8];
            row.insertCell(3).innerHTML = fighterStat[1];
            row.insertCell(4).innerHTML = fighterStat[2];
            row.insertCell(5).innerHTML = fighterStat[3];
            row.insertCell(6).innerHTML = fighterStat[4];
            row.insertCell(7).innerHTML = fighterStat[5];
            row.insertCell(8).innerHTML = fighterStat[6];
            row.insertCell(9).innerHTML = fighterStat[7];
	
            var modal = document.getElementById("congratModal");
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        // var gameElements = document.querySelectorAll('.game-elements');
        // gameElements.forEach(function(element) {
        //     element.style.display = '';
        //     correctClearGame();
        // });

        window.onclick = function(event) {
            var gameElements = document.querySelectorAll('.game-elements');
        gameElements.forEach(function(element) {
            element.style.display = '';
            correctClearGame();
        });

        };

    }
    } else {
       
        const selectedFighter = fightersData.find(fighterData => fighterData.name.toLowerCase() === guess.toLowerCase());

        if (!selectedFighter) {
            console.log("Fighter not found in dataset.");
            return; 
        }

       
        row = table.insertRow(-1);
        row.style.backgroundColor = 'ffcccc'; 

        
        const fighterStats = {
            name: capitalizeName(selectedFighter.name),
            nickname: selectedFighter.nickname,
            age: calculateAge(new Date(selectedFighter.date_of_birth).getFullYear()),
            height: selectedFighter.height_cm,
            weight: determineWeightClass(selectedFighter.weight_in_kg),
            wc: weightclassWeight(determineWeightClass(selectedFighter.weight_in_kg)),
            reach: selectedFighter.reach_in_cm,
            stance: selectedFighter.stance,
            wins: selectedFighter.wins,
            losses: selectedFighter.losses,
            draws: selectedFighter.draws
        };

        Object.entries(fighterStats).forEach(([key, stat], index) => {
            if (index === 5) {
                return; 
             }
           let adjustedIndex = index;
            if (index > 5) {
                adjustedIndex = index - 1;
            }
            
            let cell = row.insertCell(adjustedIndex);
            cell.innerHTML = stat !== undefined ? stat.toString() : 'N/A';
        });

        compareAndDisplay(row, fighterStats);
    }
}

function compareAndDisplay(row, guessedStats) {
 
    row.cells[0].style.backgroundColor = '#ffcccc'; 
    row.cells[1].style.backgroundColor = '#ffcccc';
    let ageCell = row.cells[2];
    if (Math.abs(guessedStats.age - fighterStat[8]) <= 1) { 
        ageCell.style.backgroundColor = '#FFFF00'; 
    } else {
        ageCell.style.backgroundColor = '#ffcccc';
    }
    if (guessedStats.age < fighterStat[8]) {
        ageCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    } else if (guessedStats.age > fighterStat[8]) {
        ageCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    } else {
        ageCell.style.backgroundColor = '#00FF00';
    }

    let heightCell = row.cells[3];
    let guessedHeight = guessedStats.height;
    let actualHeight = fighterStat[1];
  
    if (Math.abs(actualHeight - guessedHeight) <= 7.62) {
        heightCell.style.backgroundColor = '#FFFF00'; 
    }else{
        heightCell.style.backgroundColor = '#ffcccc';
    }
    if (actualHeight > guessedHeight) {
        heightCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    }
    if (actualHeight < guessedHeight) {
        heightCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    }
    if (actualHeight == guessedHeight) {
        heightCell.style.backgroundColor = '#00FF00';
    }
    
    let weightCell = row.cells[4];
    let guessedWeight = guessedStats.wc;
    let actualWeight = fighterStat[9];


    weightCell.innerHTML = guessedStats.weight;
    if(Math.abs(actualWeight - guessedWeight) <= 1){
        weightCell.style.backgroundColor = '#FFFF00'; 
    }else{
        weightCell.style.backgroundColor = '#ffcccc';
    }
    if(actualWeight > guessedWeight){
        weightCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    }
    if(actualWeight < guessedWeight){
    weightCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    }
    if(actualWeight == guessedWeight){
        weightCell.style.backgroundColor = '#00ff00';
    }

    let reachCell = row.cells[5];
    let guessedReach = parseInt(guessedStats.reach, 10);
    let actualReach = parseInt(fighterStat[3], 10); 
    reachCell.innerHTML = guessedStats.reach;
    if (Math.abs(actualReach - guessedReach) <= 7.62) { 
        reachCell.style.backgroundColor = '#FFFF00'; 
    }else{
        reachCell.style.backgroundColor = '#ffcccc';
    }
    if (actualReach > guessedReach) {
        reachCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    }
    if (actualReach < guessedReach) {
        reachCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    }
    if (actualReach == guessedReach) {
        reachCell.style.backgroundColor = '#00FF00'; 
    }


    let stanceCell = row.cells[6];
    stanceCell.innerHTML = guessedStats.stance;
    if (guessedStats.stance.toLowerCase() === fighterStat[4].toLowerCase()) { 
        stanceCell.style.backgroundColor = '#00FF00'; 
    } else {
        stanceCell.style.backgroundColor = '#ffcccc'; 
    }


    let winsCell = row.cells[7];
    let guessedWins = guessedStats.wins;
    let actualWins = fighterStat[5]; 
    winsCell.innerHTML = guessedStats.wins;
    if(Math.abs(actualWins - guessedWins) <= 3){
        winsCell.style.backgroundColor = '#FFFF00'; 
    }else{
        winsCell.style.backgroundColor = '#ffcccc';
    }
    if (guessedWins < actualWins) {
        winsCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    } else if (guessedWins > actualWins) {
        winsCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    } else {
        winsCell.style.backgroundColor = '#00FF00'; 
    }

    let lossesCell = row.cells[8];
    let guessedLosses = guessedStats.losses;
    let actualLosses = fighterStat[6];
    
    lossesCell.innerHTML = guessedStats.losses;
    if(Math.abs(actualLosses - guessedLosses) <= 3){
        lossesCell.style.backgroundColor = '#FFFF00'; 
    }
    else{
        lossesCell.style.backgroundColor = '#ffcccc';
    }
    if (guessedLosses < actualLosses) {
        lossesCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    } else if (guessedLosses > actualLosses) {
        lossesCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    } else {
        lossesCell.style.backgroundColor = '#00FF00'; 
    }

    let drawsCell = row.cells[9];
    let guessedDraws = guessedStats.draws;
    let actualDraws = fighterStat[7];
    drawsCell.innerHTML = guessedStats.draws;
    if(Math.abs(actualDraws - guessedDraws) <= 3){
        drawsCell.style.backgroundColor = '#FFFF00'; 
    }else{
        drawsCell.style.backgroundColor = '#ffcccc';
    }
    if (guessedDraws < actualDraws) {
        drawsCell.innerHTML += '<img src="up.png" alt="Up" class="a-img">';
    } else if (guessedDraws > actualDraws) {
        drawsCell.innerHTML += '<img src="down.png" alt="Down" class="a-img">';
    } else {
        drawsCell.style.backgroundColor = '#00FF00';
    }
}


function capitalizeName(fullName) {
    return fullName
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()) 
    .join(' ')
    }


function determineWeightClass(weight) {
    if (weight <= 54.431) return 'Straw weight';
    else if (weight <= 58.96) return 'Fly weight';
    else if (weight <= 63.502) return 'Bantam weight';
    else if (weight <= 68.0389) return 'Feather weight';
    else if (weight <= 72.57) return 'Light weight';
    else if (weight <= 79.378) return 'Welter weight';
    else if (weight <= 86.18) return 'Middle weight';
    else if (weight <= 95.25) return 'Light Heavyweight';
    else if (weight > 95.254) return 'Heavy weight';
}

function weightclassWeight(weight){
    if(weight == 'Straw weight') {
        return 1;
    }
    else if(weight == 'Fly weight') {
        return 2;
    }
    else if(weight == 'Bantam weight') {
        return 3;
    }
    else if(weight == 'Feather weight') {
        return 4;
    }
    else if(weight == 'Light weight') {
        return 5;
    }
    else if(weight == 'Welter weight') {
        return 6;
    }
    else if(weight == 'Middle weight') {
        return 7;
    }
    else if(weight == 'Light Heavyweight') {
        return 8;
    }
    else if(weight == 'Heavy weight') {
        return 9;
    }
}

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}
