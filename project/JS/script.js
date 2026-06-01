AOS.init();

function movePlanets(element) { // Bewegung der Planeten bei Bildschirmwechsel

    let earth = document.getElementById('RotatingEarth');
    let moon = document.getElementById('RotatingMoon');
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
        earth.style.height = '40%'
        earth.style.top = '75%'
        earth.style.right = '90%' 

        moon.style.height = '45%'
        moon.style.top = '-25%'
        moon.style.left = '70%' 
    }

}

function showNextScreen(currentElement, nextElement) { // Bildschirmwechsel
    let currentE = document.getElementById(currentElement)
    let nextE = document.getElementById(nextElement)

    currentE.style.visibility = "hidden"
    nextE.style.visibility = "visible"

    movePlanets(nextElement)
    clearInterval(timer);
    finalPoints = 0

    if(currentElement == "GameScreen") {
        document.getElementById('GameScreenAnswerResult').remove()
    } else if(nextElement == "GameMode") {
        if(!allowedToClose) showTutorial()
    } else if(nextElement == "Rules") {
        filterByAllCountries();
    }
}

let body = document.getElementById('body')
function showTutorial() {
    body.innerHTML += 
        `
        <div id="TutorialArea">
            <div id="InnerTutorialBox">
                
            </div>
        </div>
        `

    addTutorials(0)
}

let allowedToClose = false;
function addTutorials(index) {
    if(tutorialData.length-tutorialData.length <= index && index < tutorialData.length) {
        document.getElementById('InnerTutorialBox').innerHTML = 
            `
            <img style="grid-column: 1/3; width: 80%; margin: 0 auto 0 auto" src="${tutorialData[index].image}" alt="${index}">
            <p id="TutorialText">${tutorialData[index].text}</p>

            <p id="LeftButtonTutorial" onclick="addTutorials(${index-1})">Letztes</p>
            <p id="RightButtonTutorial" onclick="addTutorials(${index+1})">Nächstes</p> 
            `

        if(index == tutorialData.length-1) {
            allowedToClose = true
        }    
    }

    if(allowedToClose) {
        document.getElementById('InnerTutorialBox').innerHTML +=
            `
            <p id="CloseTutorial" onclick="closeTutorial()">X</p>
            `
    }
}

function closeTutorial() {
    allowedToClose = true
    saveTerraCheckData({ tutorialWatched: true })
    document.getElementById('TutorialArea').remove()
}

/*********************************************************
**********************************************************
************************OPTIONEN**************************
**********************************************************
*********************************************************/



function generateOptionsVideo() { // Video-Einstellungen
    let optionsArea = document.getElementById('OptionsSetSetArea')
    let current = loadSetting('brightness') || 100
    optionsArea.innerHTML = `
        <div style="padding:1vw;">
            <h2 style="margin:0 0 1vw 0;">VIDEO</h2>
            <div style="display:flex; gap:0.8vw;">
                <button class="OptionButton" onclick="setSiteBrightness(100)">Zurücksetzen</button>
            </div>
            <div id="VideoContainer" style="margin-top:1vw;">
                <div class="AccountScrollBox">
                    <div class="AccountGrid">
                        <div class="MapGroup">
                            <button class="MapToggle" onclick="toggleSection('video_brightness')">Bildschirmhelligkeit</button>
                            <div id="video_brightness" class="PointsGroup" style="display:block;">
                                <div class="PointsList">
                                    <div class="AccountRound"><div class="RoundLeft">Aktuell</div><div class="RoundRight"><span id="BrightnessValue">${current}%</span></div></div>
                                    <div class="AccountRound"><div class="RoundLeft">Regler</div><div class="RoundRight"><input id="BrightnessRange" class="RangeInput" type="range" min="50" max="150" step="1" value="${current}" oninput="setSiteBrightness(this.value)"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
}

function saveSetting(key, value) { // Speichere Video-Einstellung im LocalStorage
    let data = loadTerraCheckData()
    data.settings = data.settings || {}
    data.settings[key] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function loadSetting(key) { // Lade gespeicherte Video-Einstellung
    let data = loadTerraCheckData()
    if(!data.settings) return null
    return data.settings[key]
}

function setSiteBrightness(val) { // Setze Helligkeit der gesamten Seite
    let v = Number(val)
    document.body.style.filter = `brightness(${v}%)`
    let span = document.getElementById('BrightnessValue')
    if(span) span.textContent = v + '%'
    saveSetting('brightness', v)
}

function applySavedBrightness() { // Wende gespeicherte Helligkeit an
    let v = loadSetting('brightness')
    if(v == null) return
    document.body.style.filter = `brightness(${v}%)`
}

function generateOptionsAudio() {
    let optionsArea = document.getElementById('OptionsSetSetArea')
    optionsArea.innerHTML = 
        `
        <p>AUDIO WIRD NOCH INTEGRIERT</p>
        `
}

function generateOptionsKonto() { // Konto-Einstellungen
    let optionsArea = document.getElementById('OptionsSetSetArea')
    // Konto-Bereich: zeigt gespeicherte Runden und Clear-Button
    let html = `
        <div style="padding:1vw;">
            <h2 style="margin:0 0 1vw 0;">KONTO</h2>
            <div style="display:flex; gap:0.8vw;">
                <button id="ClearStorageButton" onclick="clearTerraCheckData()">LocalStorage löschen</button>
                <button id="ReopenTutorialButton" onclick="reopenTutorial()">Tutorial erneut anzeigen</button>
            </div>
            <div id="AccountContainer" style="margin-top:1vw;"></div>
        </div>
    `
    optionsArea.innerHTML = html
    document.getElementById('AccountContainer').innerHTML = getSavedAccountHtml()
}

function reopenTutorial() { // Tutorial erneut anzeigen
    if(document.getElementById('TutorialArea')) return
    allowedToClose = false
    showTutorial()
}

/*********************************************************
**********************************************************
**************************RULES***************************
**********************************************************
*********************************************************/

let rulesScreen = document.getElementById('Rules')
let boxes = [];
let current = 0;
let isAnimating = false;

function updateBoxes() { // Bewegung der Boxen nach Oben/Unten
    boxes.forEach((box, i) => {
        box.style.transform = `translateY(${(i - current) * 100}vh)`;
    });
}

window.addEventListener("wheel", (e) => { // EvenListener für das Wheel
    rulesScreen = document.getElementById('Rules')
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

let countryDataArray = []
let currentFilter = 'ALL'; // Track current filter

function generateStudyData() {
    rulesBoxArea = document.getElementById('RulesBoxArea')
    rulesBoxArea.innerHTML = ''; // Clear existing boxes

    countryDataArray = countryData
    for(let i = 0; i < countryDataArray.length; i++) {
        rulesBoxArea.innerHTML += 
            `
            <section class="Box" data-first-letter="${countryDataArray[i].name.charAt(0).toUpperCase()}">
                <div class="rulesSectionGrid">
                    <div class="leftColumn">
                        <div class="textInfo">
                            <p>Ländername: ${countryDataArray[i].name}</p>
                            <p>Hauptstadt: ${countryDataArray[i].capital}</p>
                            <p>Kontinent: ${countryDataArray[i].continent}</p>
                        </div>
                        <img src="${countryDataArray[i].flag}" alt="Flagge" class="flagImage">
                    </div>
                    <div class="rightColumn">
                        <img src="${countryDataArray[i].coatOfArms}" alt="Wappen" class="coaImage">
                    </div>
                </div>
                
            </section>
            `
    }

    boxes = document.querySelectorAll(".Box");
    generateLetterNavigation();
    updateBoxes();
}

function generateLetterNavigation() { // Generiert Buchstaben-Navigationsbuttons
    let letterContainer = document.getElementById('RulesLetterContainer')
    if(!letterContainer) return
    
    letterContainer.innerHTML = ''
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    
    letters.forEach(letter => {
        let letterButton = document.createElement('p')
        letterButton.className = 'RulesNavButton'
        letterButton.textContent = letter
        letterButton.onclick = () => filterByLetter(letter)
        letterContainer.appendChild(letterButton)
    })
    
    updateNavigationButtons()
}

function filterByLetter(letter) { // Filtert Länder nach Anfangsbuchstabe
    currentFilter = letter
    let allBoxes = document.querySelectorAll('.Box')
    
    if(allBoxes.length === 0) {
        generateStudyData()
        return
    }
    
    allBoxes.forEach(box => {
        if(box.dataset.firstLetter === letter) {
            box.style.display = 'flex'
        } else {
            box.style.display = 'none'
        }
    })
    
    boxes = Array.from(allBoxes).filter(box => box.style.display !== 'none')
    current = 0
    updateBoxes()
    updateNavigationButtons()
}

function filterByAllCountries() { // Zeigt alle Länder an
    currentFilter = 'ALL'
    let allBoxes = document.querySelectorAll('.Box')
    
    if(allBoxes.length === 0) {
        generateStudyData()
        return
    }
    
    allBoxes.forEach(box => {
        box.style.display = 'flex'
    })
    
    boxes = Array.from(allBoxes)
    current = 0
    updateBoxes()
    updateNavigationButtons()
}

function updateNavigationButtons() { // Markiert aktiven Navigationsbutton
    let allButtons = document.querySelectorAll('.RulesNavButton')
    
    allButtons.forEach(button => {
        button.classList.remove('active')
        
        if(button.textContent === 'ALL' && currentFilter === 'ALL') {
            button.classList.add('active')
        } else if(button.textContent === currentFilter) {
            button.classList.add('active')
        }
    })
}

generateStudyData()

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
            <div id="GameModeOptions" data-aos="fade-right" data-aos-delay="500">
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



let gameAvailableArray
let playArray
function generateFurtherOptions() { // Generiert die Auswahl von "Schwierigkeit"
    let actualGameScreen = document.getElementById('ActualGameScreen')
    actualGameScreen.innerHTML = 
        `
        <div id="superiorGameOptions">
            <div id="furtherGameOptions">
                <h1 class="furtherGameOptionsHeader">SUCHSYMBOL</h1>
                <h1 class="furtherGameOptionsHeader">LÖSUNGSART</h1>
                <p class="Instruction" onclick="chooseInstruction(this, 'flag')">FLAGGE</p>
                <p class="Solution" onclick="chooseSolution(this, 'name')">LÄNDERNAME</p>
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
    let actualGameScreen = document.getElementById('ActualGameScreen')
    if(modeType == "Choose") { // Multiple Choice
        actualGameScreen.innerHTML = 
            `
            <div id="GameScreenHeader"><p id="GameScreenHeaderText">${finalPoints} Pkt.</p></div>
            <div id="GameScreenHeaderAmount"><p>0/${finalAmount}</p></div>
            <img id="MarsTimer" src="./IMG/Mars.png" alt="Mars">

            <div id="GameScreenChooseGrid"></div>
            <div id="GameScreenAnswerResult"></div>
            `

        modeChoose(0)
    } else if(modeType == "Input") {
        actualGameScreen.innerHTML = 
            `
            <div id="GameScreenHeader"><p id="GameScreenHeaderText">${finalPoints} Pkt.</p></div>
            <div id="GameScreenHeaderAmount"><p>0/${finalAmount}</p></div>
            <img id="MarsTimer" src="./IMG/Mars.png" alt="Mars">

            <input type="text" name="GameScreenInput" id="GameScreenInput">
            <div id="GameScreenInputFlagArea"></div>
            <div id="GameScreenAnswerResult"></div>
            `

        modeChoose(0)
    }
} 

let currentInputElement = ""
let currentIndex
function modeChoose(index) {
    let gameScreenAnswerResult = document.getElementById('GameScreenAnswerResult')
    gameScreenAnswerResult.style.visibility = 'hidden'
    if(finalGameMode == "Choose") {
        let GameScreenChooseGrid = document.getElementById('GameScreenChooseGrid')  

        if(finalInstruction == 'flag') {
            GameScreenChooseGrid.innerHTML = `<img data-aos="flip-up" id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].flag}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        } else {
            GameScreenChooseGrid.innerHTML = `<img id="GameScreenCountryFlag" src="${gameAvailableArray[playArray[index][0]].coatOfArms}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        }

        if(finalSolution == 'name') {
            for (let i = 0; i < 8; i++) {
                GameScreenChooseGrid.innerHTML += `<p class="GameScreenChooseAnswer" onclick="chooseAnswer(\`${gameAvailableArray[playArray[index][i+1]].name}\`, ${index}, this)">${gameAvailableArray[playArray[index][i+1]].name}</p>`
            }
        } else {
            for (let i = 0; i < 8; i++) {
                GameScreenChooseGrid.innerHTML += `<p class="GameScreenChooseAnswer" onclick="chooseAnswer(\`${gameAvailableArray[playArray[index][i+1]].capital}\`, ${index}, this)">${gameAvailableArray[playArray[index][i+1]].capital}</p>`
            }
        }
    } else if(finalGameMode == "Input") {
        let GameScreenInputFlagArea = document.getElementById('GameScreenInputFlagArea')

        if(finalInstruction == 'flag') {
            GameScreenInputFlagArea.innerHTML = `<img id="GameScreenInputCountryFlag" src="${gameAvailableArray[playArray[index][0]].flag}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        } else {
            GameScreenInputFlagArea.innerHTML = `<img id="GameScreenInputCountryFlag" src="${gameAvailableArray[playArray[index][0]].coatOfArms}" alt="${gameAvailableArray[playArray[index][0]].name}">`
        }

        if(finalSolution == 'name') {
            currentInputElement = gameAvailableArray[playArray[index][0]].name
        } else {
            currentInputElement = gameAvailableArray[playArray[index][0]].capital
        }

        currentIndex = index
    }
    document.getElementById('GameScreenHeaderAmount').innerHTML = `<p>${index+1}/${finalAmount}</p>`
    startMarsTimer()
}

function chooseAnswer(answer, index, elem) {
    let gameScreenAnswerResult = document.getElementById('GameScreenAnswerResult')
    
    let allAnswers = document.querySelectorAll('.GameScreenChooseAnswer')
    allAnswers.forEach((GameScreenChooseAnswer) => {
        GameScreenChooseAnswer.removeAttribute('onclick')
    })

    if(finalSolution == 'name') {
        if(answer == gameAvailableArray[playArray[index][0]].name) {
            
            let currentTop = progress * 50;
            finalPoints += (50-currentTop)*2;

            elem.style.color = "green"
        } else {
            elem.style.color = "red"

            allAnswers.forEach((GameScreenChooseAnswer) => {
                if(GameScreenChooseAnswer.textContent == gameAvailableArray[playArray[index][0]].name) {
                    GameScreenChooseAnswer.style.color = "green"
                }
            })
        }
    } else {
        if(answer == gameAvailableArray[playArray[index][0]].capital) {
            
            let currentTop = progress * 50;
            finalPoints += (50-currentTop)*2; 

            elem.style.color = "green"
        } else {
            elem.style.color = "red"
            
            allAnswers.forEach((GameScreenChooseAnswer) => {
                if(GameScreenChooseAnswer.textContent == gameAvailableArray[playArray[index][0]].name) {
                    GameScreenChooseAnswer.style.color = "green"
                }
            })
        }
    }
    clearInterval(timer);

    document.getElementById('GameScreenHeader').innerHTML = `<p id="GameScreenHeaderText">${finalPoints} Pkt.</p>`
    
    if(index == finalAmount-1) {
        gameScreenAnswerResult.style.visibility = "visible"
        gameScreenAnswerResult.innerHTML = `<p>Fertig!</p>`
        saveFinalResult()
        finalPoints = 0
    } else {
        setTimeout(function() {
            modeChoose(index+1)
        }, 750)
    }

    
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

 
window.addEventListener("keydown", (e) => {      
    let gameScreenNew = document.getElementById('GameScreen')
    if (event.key === 'Enter' && gameScreenNew.style.visibility == 'visible') { 
        let gameScreenInput = document.getElementById('GameScreenInput')
        let gameScreenAnswerResult = document.getElementById('GameScreenAnswerResult')
        console.log('Enter-Taste wurde gedrückt!');
       
        if(gameScreenInput.value == currentInputElement) {
            
            finalPoints += 100 
            document.getElementById('GameScreenHeader').innerHTML = `<p id="GameScreenHeaderText">${finalPoints} Pkt.</p>`

            clearInterval(timer);
            gameScreenInput.value = ""
            
            if(currentIndex == finalAmount-1) {
                gameScreenAnswerResult.style.visibility = "visible"
                gameScreenAnswerResult.innerHTML = `<p>Fertig!</p>`
                saveFinalResult()
                finalPoints = 0
            } else {
                modeChoose(currentIndex+1)
            }
        } else {
            clearInterval(timer);
            gameScreenInput.value = ""
            
            if(currentIndex == finalAmount-1) {
                gameScreenAnswerResult.style.visibility = "visible"
                gameScreenAnswerResult.innerHTML = `<p>Fertig!</p>`
                saveFinalResult()
                finalPoints = 0
            } else {
                modeChoose(currentIndex+1)
            }
        }

    }
});

/*********************************************************
**********************************************************
**************LOCALSTORAGE-STARKE-KI-HILFE****************
**********************************************************
*********************************************************/

const STORAGE_KEY = 'TerraCheckResult'

function loadTerraCheckData() { // Lade LocalStorage-Daten
    let raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return { tutorialWatched: false, history: [] }
    try {
        let obj = JSON.parse(raw)
        if(obj.tutorialWatched) allowedToClose = true
        if(!obj.history) obj.history = []
        return obj
    } catch(e) {
        return { tutorialWatched: false, history: [] }
    }
}

function saveTerraCheckData(entry) { // Speichere Runde / Tutorial-Flag
    let data = loadTerraCheckData()
    if(entry && entry.tutorialWatched) {
        data.tutorialWatched = true
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        return
    }
    if(!data.history) data.history = []
    if(entry) data.history.push(entry)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function clearTerraCheckData() { // Lösche LocalStorage
    localStorage.removeItem(STORAGE_KEY)
    allowedToClose = false
    generateOptionsKonto()
}

function getSavedAccountHtml() { // Erzeuge Konto-HTML aus LocalStorage
    let data = loadTerraCheckData()
    if(!data.history || data.history.length == 0) return `<p>Keine gespeicherten Runden.</p>`

    // Gruppiere nach Map und nach Runden
    let byMap = {}
    data.history.forEach((r, i) => {
        let map = r.choosenMap || 'Unbekannt'
        if(!byMap[map]) byMap[map] = {}
        let rounds = r.amount == null ? '0' : String(r.amount)
        if(!byMap[map][rounds]) byMap[map][rounds] = []
        byMap[map][rounds].push({ idx: i+1, entry: r })
    })

    let out = `<div class="AccountScrollBox"><div class="AccountGrid">`
    Object.keys(byMap).sort().forEach((mapName, mi) => {
        let mapId = `map_${mi}`
        out += `<div class="MapGroup"><button class="MapToggle" onclick="toggleSection('${mapId}')">${mapName} (${Object.keys(byMap[mapName]).length})</button><div id="${mapId}" class="PointsGroup" style="display:none;">`
        Object.keys(byMap[mapName]).sort((a,b)=>Number(b)-Number(a)).forEach((rounds) => {
            let ptsId = `${mapId}_pts_${rounds}`
            out += `<button class="PointsToggle" onclick="toggleSection('${ptsId}')">${rounds} Runden (${byMap[mapName][rounds].length})</button><div id="${ptsId}" style="display:none;" class="PointsList">`
            byMap[mapName][rounds].forEach((item) => {
                let e = item.entry
                out += `<div class="AccountRound"><div class="RoundLeft">#${item.idx} · ${e.mode || '-'} · ${e.amount || '-'} Runden</div><div class="RoundRight">Instr: ${e.instruction || '-'} · Sol: ${e.solution || '-'} · Pkt: ${e.points || 0}</div></div>`
            })
            out += `</div>`
        })
        out += `</div></div>`
    })
    out += `</div></div>`
    return out
}

function toggleSection(id) { // Ein-/Ausklappen von Gruppen
    let el = document.getElementById(id)
    if(!el) return
    el.style.display = el.style.display == 'none' ? 'block' : 'none'
}

function saveFinalResult() { // Speichere das aktuelle Ergebnis in LocalStorage
    let round = {
        points: finalPoints,
        mode: finalGameMode,
        instruction: finalInstruction,
        solution: finalSolution,
        choosenMap: choosenMap,
        amount: finalAmount
    }
    saveTerraCheckData(round)
}

// gespeicherte Daten und Helligkeit anwenden
loadTerraCheckData()
applySavedBrightness()