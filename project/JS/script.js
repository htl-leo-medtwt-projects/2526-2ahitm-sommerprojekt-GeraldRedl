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

let mapImages = ['./Img/Europe.png', './Img/Asia.png', './Img/Africa.png', './Img/NorthAmerica.png', './Img/SouthAmerica.png', './Img/Australia.png']
let worldMapGenerateTimer;

function generateMaps() { // Generiert die einzelnen Maps für die Auswahl
    worldMapGenerateTimer = setInterval(function() { // Generiert die World Map
        let randomImage = Math.floor(Math.random()*mapImages.length)
        document.querySelector('.MapWorld').innerHTML = `<img src="${mapImages[randomImage]}" alt="${mapImages[randomImage]}">`
    }, 1000)

    document.querySelector('.MapEurope').innerHTML = `<img src="${mapImages[0]}" alt="${mapImages[0]}">`
    document.querySelector('.MapAsia').innerHTML = `<img src="${mapImages[1]}" alt="${mapImages[1]}">`
    document.querySelector('.MapAfrica').innerHTML = `<img src="${mapImages[2]}" alt="${mapImages[2]}">`
    document.querySelector('.MapNorthAmerica').innerHTML = `<img src="${mapImages[3]}" alt="${mapImages[3]}">`
    document.querySelector('.MapSouthAmerica').innerHTML = `<img src="${mapImages[4]}" alt="${mapImages[4]}">`
    document.querySelector('.MapAustralia').innerHTML = `<img src="${mapImages[5]}" alt="${mapImages[5]}">`
    document.querySelector('.MapSuprise').innerHTML = `<img src="./IMG/Suprise.png" alt="Suprise.png">`
}

generateMaps()

let alreadyRotated = false;
let rotatedElement = -1;
function generateGameModeOptions(element, index) { // Generiert per OnClick die jewiligen Optionen zum auswählen
    if(index != rotatedElement) {
        if(alreadyRotated) { // Dreht die Boxen in ihre Originalposition
            let allMaps = document.querySelectorAll('.GameModeMaps')
            allMaps.forEach((GameModeMaps, i) => {
                GameModeMaps.style.transform = 'rotateY(0deg)';
            });
            alreadyRotated = false;
        }

        element.style.transform = 'rotateY(180deg)' // Dreht die ausgewählte Box um 180deg
        alreadyRotated = true;
        rotatedElement = index;

        element.innerHTML += 
            `
            <div id="GameModeOptions">
                <p>Hallo</p> 
                <p>Hallo</p>
                <p>Hallo</p>
                <p>Hallo</p>
            </div>
            `
        
    }
}