let earth = document.getElementById('RotatingEarth');
let moon = document.getElementById('RotatingMoon');

function movePlanets(element) { // Bewegung der Planeten bei Bildschirmwechsel

    if(element == 'Homepage') { // Bewegung zur Homepage
        earth.style.height = '90%'
        earth.style.top = '5%'
        earth.style.right = '10%'

        moon.style.height = '10%'
        moon.style.top = '5%'
        moon.style.left = '3%' 
    } else if(element == 'Options') { // Bewegung zu den Optionen
        earth.style.height = '40%'
        earth.style.top = '60%'
        earth.style.right = '0%'

        moon.style.height = '15%'
        moon.style.top = '2%'
        moon.style.left = '40%' 
    } else if(element == 'Rules') { // Bewegung zu den Regeln
        earth.style.height = '40%'
        earth.style.top = '0%'
        earth.style.right = '7%'

        moon.style.height = '15%'
        moon.style.top = '70%'
        moon.style.left = '25%' 
    } else if(element == 'GameMode') { // Bewegung zum Moduswechsel
        earth.style.height = '70%'
        earth.style.top = '15%'
        earth.style.right = '32%'

        moon.style.height = '15%'
        moon.style.top = '7%'
        moon.style.left = '-3%' 
    } else if(element == 'GameScreen') {
        earth.style.height = '70%'
        earth.style.top = '35%'
        earth.style.right = '120%' 

        moon.style.height = '15%'
        moon.style.top = '7%'
        moon.style.left = '-40%' 
    }

}

function showNextScreen(currentElement, nextElement) { // Bildschirmwechsel
    let currentE = document.getElementById(currentElement)
    let nextE = document.getElementById(nextElement)

    currentE.style.visibility = "hidden"
    nextE.style.visibility = "visible"

    movePlanets(nextElement)
}

/*********************************************************
**********************************************************
************************OPTIONEN**************************
**********************************************************
*********************************************************/

let optionsArea = document.getElementById('OptionsSetSetArea')

function generateOptionsVideo() {
    optionsArea.innerHTML = 
        `
        <p>VIDEO EINSTELLUNG ODER SO</p>
        `
}

function generateOptionsAudio() {
    optionsArea.innerHTML = 
        `
        <p>AUDIO EINSTELLUNG ODER SO</p>
        `
}

function generateOptionsKonto() {
    optionsArea.innerHTML = 
        `
        <p>KONTO EINSTELLUNG ODER SO</p>
        `
}

/*********************************************************
**********************************************************
**************************RULES***************************
**********************************************************
*********************************************************/

let rulesScreen = document.getElementById('Rules')
let boxes = document.querySelectorAll(".Box");
let current = 0;
let isAnimating = false;

function updateBoxes() { // Bewegung der Boxen nach Oben/Unten
    boxes.forEach((box, i) => {
        box.style.transform = `translateY(${(i - current) * 100}vh)`;
    });
}

updateBoxes();

window.addEventListener("wheel", (e) => { // EvenListener für das Wheel
    if (isAnimating || rulesScreen.style.visibility == 'hidden') return; // Rauswurf während Animationen/inaktivem Bildschirm

    if (e.deltaY > 0 && current < boxes.length - 1) { // Berechnung der Richtung des Scroll Wheels
        current++;
    } else if (e.deltaY < 0 && current > 0) {
        current--;
    } else {
        return;
    }

    isAnimating = true;
    updateBoxes();

    setTimeout(() => { // Zurücksetzen des Timers für Animation
        isAnimating = false;
    }, 600);
});

/*********************************************************
**********************************************************
************************GAMEMODE**************************
**********************************************************
*********************************************************/

let mapImages = ['./Img/World.png', './Img/Europe.png', './Img/Asia.png', './Img/Africa.png', './Img/NorthAmerica.png', './Img/SouthAmerica.png', './Img/Australia.png']

function generateMaps() { // Generiert die einzelnen Maps für die Auswahl
    document.querySelector('.MapWorld').innerHTML = `<img src="${mapImages[0]}" alt="${mapImages[0]}"><p class="MapLabel">WELT</p>`
    document.querySelector('.MapEurope').innerHTML = `<img src="${mapImages[1]}" alt="${mapImages[1]}"><p class="MapLabel">EUROPA</p>` 
    document.querySelector('.MapAsia').innerHTML = `<img src="${mapImages[2]}" alt="${mapImages[2]}"><p class="MapLabel">ASIEN</p>`
    document.querySelector('.MapAfrica').innerHTML = `<img src="${mapImages[3]}" alt="${mapImages[3]}"><p class="MapLabel">AFRIKA</p>`
    document.querySelector('.MapNorthAmerica').innerHTML = `<img src="${mapImages[4]}" alt="${mapImages[4]}"><p class="MapLabel">NORD AMERIKA</p>`
    document.querySelector('.MapSouthAmerica').innerHTML = `<img src="${mapImages[5]}" alt="${mapImages[54]}"><p class="MapLabel">SÜD AMERIKA</p>`
    document.querySelector('.MapAustralia').innerHTML = `<img src="${mapImages[6]}" alt="${mapImages[6]}"> <p class="MapLabel">AUSTRALIEN</p>`
    document.querySelector('.MapSuprise').innerHTML = `<img src="./IMG/Suprise.png" alt="Suprise.png">`
}

generateMaps()

let choosenMap = ""
let alreadyRotated = false;
let rotatedElement = -1;
function generateGameModeOptions(element, index, map) { // Generiert per OnClick die jewiligen Optionen zum auswählen
    if(index != rotatedElement) {
        if(alreadyRotated) { // Dreht die Boxen in ihre Originalposition
            let allMaps = document.querySelectorAll('.GameModeMaps')
            allMaps.forEach((GameModeMaps) => {
                GameModeMaps.style.transform = 'rotateY(0deg)';
                GameModeMaps.innerHTML = ""
            });
            alreadyRotated = false;

            generateMaps()
        }

        element.style.transform = 'rotateY(180deg)' // Dreht die ausgewählte Box um 180deg
        alreadyRotated = true;
        rotatedElement = index;
        choosenMap = map;

        element.innerHTML += // Generiert die Auswahloptionen
            `
            <div id="GameModeOptions">
                <p class="GameModeOptionsAmount" onclick="chooseAmount(this, 1)">ALLE</p> 
                <p class="GameModeOptionsAmount" onclick="chooseAmount(this, 10)">10</p>
                <p class="GameModeOptionsAmount" onclick="chooseAmount(this, 20)">20</p>
                <p class="GameModeOptionsAmount" onclick="chooseAmount(this, 30)">30</p>
                <p class="GameModeOptionsMode" onclick="chooseGameMode(this, 'Choose')" style="grid-column: 1/3; margin-top: 2vw;">Auswahl</p>
                <p class="GameModeOptionsMode" onclick="chooseGameMode(this, 'Input')" style="grid-column: 1/3;">Eingabe</p>
                <img id="GameModeOptionsContinue" onclick="bothChoosen()" src="./IMG/Return.png" alt="Weiter">
            </div>
            `  
        
    } 
}

let finalAmount = 0;
let amountChoosen = false;
function chooseAmount(element, amount) { // Auswahl der Anzahl an Aufgaben
    if(amountChoosen) { 
        let allAmounts = document.querySelectorAll('.GameModeOptionsAmount')
        allAmounts.forEach((GameModeOptionsAmount) => {
            GameModeOptionsAmount.style.boxShadow = '0px 0px 0px'; // Zurücksetzen des Box-Shadows
        });
        amountChoosen = false;
    }

    finalAmount = amount
    element.style.boxShadow = "inset 0px 0px 15px red" // Setzen des Box-Shadows
    amountChoosen = true;
}

let finalGameMode = ""
let gameModeChoosen = false;
function chooseGameMode(element, gameMode) { // Auswahl des Spielmodus
    if(gameModeChoosen) {
        let allModes = document.querySelectorAll('.GameModeOptionsMode')
        allModes.forEach((GameModeOptionsMode) => {
            GameModeOptionsMode.style.boxShadow = '0px 0px 0px'; // Zurücksetzen des Box-Shadows
        });
        gameModeChoosen = false;
    }

    finalGameMode = gameMode
    element.style.boxShadow = "inset 0px 0px 15px red" // Setzen des Box-Shadows
    gameModeChoosen = true;
}

function bothChoosen() {
    if(gameModeChoosen && amountChoosen) {
        showNextScreen('GameMode', 'GameScreen')
        generateFurtherOptions()
    }
}

/*********************************************************
**********************************************************
***************GAMESCREEN-CHOOSE/INPUT********************
**********************************************************
*********************************************************/

let gameScreen = document.getElementById('ActualGameScreen')

let gameAvailableArray
let playArray
function generateFurtherOptions() { // Generiert die Auswahl von "Schwierigkeit"
    gameScreen.innerHTML = 
        `
        <div id="superiorGameOptions">
            <div id="furtherGameOptions">
                <h1 class="furtherGameOptionsHeader">ANGABE</h1>
                <h1 class="furtherGameOptionsHeader">LÖSUNG</h1>
                <p class="Instruction" onclick="chooseInstruction(this, 'flag')">FLAGGE</p>
                <p class="Solution" onclick="chooseSolution(this, 'name')">NAME</p>
                <p class="Instruction" onclick="chooseInstruction(this, 'coatOfArms')">WAPPEN</p>
                <p class="Solution" onclick="chooseSolution(this, 'capital')">HAUPTSTADT</p>
                <img id="furtherOptionsContinue" onclick="startGame()" src="./IMG/Return.png" alt="Weiter">
            </div>
        </div>
        `

    gameAvailableArray = [] // Erstellt einen leeren Array
    for(let i = 0; i < countryData.length; i++) {
        if(choosenMap == countryData[i].continent) { // fühlt der Array nur mit den Ländern die verwendet werden sollen
            gameAvailableArray.push(countryData[i])
        }
    }

    if(choosenMap == 'World') {
        gameAvailableArray = countryData
    }

    playArray = [] // Array für die Länder mit denen gespielt werden soll
    let randomNumbers = [] // Array für Länder die in einer Runde vorkommen

    let usedFirstIndexes = [] // Array für verwendete Lösungsländer
    for(let i = 0; i < finalAmount; i++) {
        randomNumbers = generateRandomNumbers()
        while (usedFirstIndexes.includes(randomNumbers[0])) {
            randomNumbers = generateRandomNumbers()
        }
        randomNumbers[1+Math.floor(Math.random()*8)] = randomNumbers[0] // Erste Stelle wird doppelt benötigt

        usedFirstIndexes.push(randomNumbers[0])
        playArray.push(randomNumbers)
    }
}

function generateRandomNumbers() { // füllt den Array mit 9 Random Zahlen
    let result = []

    for(let i = 0; i < 9; i++) {
        let isdouble = true
        do {
            let rndNumber = Math.floor(Math.random()*gameAvailableArray.length)

            if(!result.includes(rndNumber)) {
                result.push(rndNumber)
                isdouble = false
            }
        } while(isdouble)
    }

    return result
}

let finalInstruction = ""
let instructionChoosen = false
function chooseInstruction(element, instruction) { // Auswahl der Angabe
    if(instructionChoosen) {
        let allInstructions = document.querySelectorAll('.Instruction')
        allInstructions.forEach((Instruction) => {
            Instruction.style.boxShadow = '0px 0px 0px'; // Zurücksetzen des Box-Shadows
        });
        instructionChoosen = false;
    }

    finalInstruction = instruction
    element.style.boxShadow = "inset 0px 0px 15px red" // Setzen des Box-Shadows
    instructionChoosen = true;
}

let finalSolution = ""
let solutionChoosen = false
function chooseSolution(element, solution) { // Auswahl der Lösung
    if(solutionChoosen) {
        let allSolutions = document.querySelectorAll('.Solution')
        allSolutions.forEach((Solution) => {
            Solution.style.boxShadow = '0px 0px 0px'; // Zurücksetzen des Box-Shadows
        });
        solutionChoosen = false;
    }

    finalSolution = solution
    element.style.boxShadow = "inset 0px 0px 15px red" // Setzen des Box-Shadows
    solutionChoosen = true;
}

function startGame() {
    if(instructionChoosen && solutionChoosen) {
        generateIndividualMode(finalGameMode)
    }
}

let finalPoints = 0;
function generateIndividualMode(modeType) { // Generieren des jeweiligen Modusbildschirms
    if(modeType == "Choose") { // Multiple Choice
        gameScreen.innerHTML = 
            `
            <div id="GameScreenHeader"><p id="GameScreenHeaderText">${finalPoints} Pkt.</p></div>
            <div id="GameScreenHeaderAmount"><p>0/${finalAmount}</p></div>
            <img id="MarsTimer" src="./IMG/Mars.png" alt="Mars">

            <div id="GameScreenChooseGrid"></div>
            `

        modeChoose(0)
    } else if(modeType == "Input") {
        gameScreen.innerHTML = 
            `
            <div id="GameScreenHeader"><p id="GameScreenHeaderText">${finalPoints} Pkt.</p></div>
            <div id="GameScreenHeaderAmount"><p>0/${finalAmount}</p></div>
            <img id="MarsTimer" src="./IMG/Mars.png" alt="Mars">

            <input type="text" name="GameScreenInput" id="GameScreenInput">
            <div id="GameScreenInputFlagArea"></div>
            `

        modeChoose(0)
    }
} 

function modeChoose(index) {
    if(finalGameMode == "Choose") {
        let GameScreenChooseGrid = document.getElementById('GameScreenChooseGrid')  

        if(finalInstruction == 'flag') {
            GameScreenChooseGrid.innerHTML = `<img id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].flag}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        } else {
            GameScreenChooseGrid.innerHTML = `<img id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].coatOfArms}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        }

        if(finalSolution == 'name') {
            for (let i = 0; i < 8; i++) {
            GameScreenChooseGrid.innerHTML += `<p class="GameScreenChooseAnswer" onclick="chooseAnswer(\`${gameAvailableArray[playArray[index][i+1]].name}\`, ${index})">${gameAvailableArray[playArray[index][i+1]].name}</p>`
            }
        } else {
            for (let i = 0; i < 8; i++) {
                GameScreenChooseGrid.innerHTML += `<p class="GameScreenChooseAnswer" onclick="chooseAnswer(\`${gameAvailableArray[playArray[index][i+1]].capital}\`, ${index})">${gameAvailableArray[playArray[index][i+1]].capital}</p>`
            }
        }
    } else if(finalGameMode == "Input") {
        let GameScreenInputFlagArea = document.getElementById('GameScreenInputFlagArea')

        if(finalInstruction == 'flag') {
            GameScreenInputFlagArea.innerHTML = `<img id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].flag}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        } else {
            GameScreenInputFlagArea.innerHTML = `<img id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].coatOfArms}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        }
    }
    document.getElementById('GameScreenHeaderAmount').innerHTML = `<p>${index+1}/${finalAmount}</p>`
    startMarsTimer()
}

function chooseAnswer(answer, index) {
    if(finalSolution == 'name') {
        if(answer == gameAvailableArray[playArray[index][0]].name) {
            gameScreen.innerHTML += 
                `
                <div id="GameScreenAnswerResult">
                    <p>RICHTIG!</p>
                </div>
                `
            let currentTop = progress * 50;
            finalPoints += (50-currentTop)*2;
        } else {
            gameScreen.innerHTML += 
                `
                <div id="GameScreenAnswerResult">
                    <p>FALSCH!</p>
                </div>
                `
        }
    } else {
        if(answer == gameAvailableArray[playArray[index][0]].capital) {
            gameScreen.innerHTML += 
                `
                <div id="GameScreenAnswerResult">
                    <p>Richtig!</p>
                </div>
                `
            let currentTop = progress * 50;
            finalPoints += (50-currentTop)*2; 
        } else {
            gameScreen.innerHTML += 
                `
                <div id="GameScreenAnswerResult">
                    <p>FALSCH!</p>
                </div>
                `
        }
    }
    clearInterval(timer);

    document.getElementById('GameScreenHeader').innerHTML = `<p id="GameScreenHeaderText">${finalPoints} Pkt.</p>`
    document.getElementById('GameScreenAnswerResult').innerHTML += `<p id="ContinueAnswer" onclick="removeResult(), modeChoose(${index+1})">Weiter</p>`
    
    if(index == finalAmount-1) {
        document.getElementById('GameScreenAnswerResult').innerHTML = `<p>Fertig!</p>`
        finalPoints = 0
    }

    let allAnswers = document.querySelectorAll('.GameScreenChooseAnswer')
    allAnswers.forEach((GameScreenChooseAnswer) => {
        GameScreenChooseAnswer.removeAttribute('onclick')
    })
}

function removeResult() {
    document.getElementById('GameScreenAnswerResult').remove()
}

let mars;

let duration = 10;
let timeLeft = duration;
let progress = 0;
let timer;

function startMarsTimer() {

    mars = document.getElementById("MarsTimer");

    timeLeft = duration;
    progress = 0;

    mars.style.top = "0vw";

    timer = setInterval(function () {

        timeLeft--;

        progress = (duration - timeLeft) / duration;

        let topValue = progress * 50;
        mars.style.top = topValue + "vw";

        console.log(`${timeLeft}s übrig`)
        if (timeLeft <= 0) {
            clearInterval(timer);
            console.log(`Fertig`)
        }

    }, 1000);
}