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

let mapImages = {}