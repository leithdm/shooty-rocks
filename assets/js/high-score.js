const highScoreMenu = document.querySelector(".high-score-menu");

//retrieve highscore when window loads
window.onload = () => {
    getLocalStorage();
    highScoreMenu.textContent = numberWithCommas(_highScore.toString());
};



