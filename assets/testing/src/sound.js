let audioFormat; 
let fireSound; 
let thrustSound; 
let bangSmallSound; 
let bangMediumSound; 
let bangLargeSound; 

function setSoundFormat() {
    let audio = new Audio(); 
    if(audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat =".ogg";
    }
}

function loadSounds() {
    setSoundFormat(); 
    fireSound = new Audio("../assets/sounds/fire"+audioFormat);
    setSoundFormat(); 
    thrustSound = new Audio("../assets/sounds/thrust"+audioFormat);
    setSoundFormat(); 
    bangSmallSound = new Audio("../assets/sounds/bangSmall"+audioFormat);
    setSoundFormat(); 
    bangMediumSound = new Audio("../assets/sounds/bangMedium"+audioFormat);
    setSoundFormat(); 
    bangLargeSound = new Audio("../assets/sounds/bangLarge"+audioFormat);
}