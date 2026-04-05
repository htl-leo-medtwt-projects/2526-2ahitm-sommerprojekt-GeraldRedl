
function showNextScreen(currentElement, nextElement) {
    let currentE = document.getElementById(currentElement)
    let nextE = document.getElementById(nextElement)

    currentE.style.visibility = "hidden"
    nextE.style.visibility = "visible"
}