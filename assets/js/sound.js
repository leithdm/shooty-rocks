let soundfxOn; 
const SOUNDFX_TOGGLE = document.querySelector(".soundfx-button");

window.onload = () => {
    getLocalStorageSoundfxMenu(); 
};

SOUNDFX_TOGGLE.addEventListener("click", () => {
  if (SOUNDFX_TOGGLE.textContent === "SOUND FX ON") {
    SOUNDFX_TOGGLE.textContent = "SOUND FX OFF";
    localStorage.setItem(LOCAL_STORAGE_SOUNDFX, OFF);
  } else {
    SOUNDFX_TOGGLE.textContent = "SOUND FX ON";
    localStorage.setItem(LOCAL_STORAGE_SOUNDFX, ON);
  }
});

//for determining if soundfx are on/off
function getLocalStorageSoundfxMenu() {
    if(localStorage.getItem(LOCAL_STORAGE_SOUNDFX) == OFF) {
        SOUNDFX_TOGGLE.textContent = "SOUND FX OFF";
        soundfxOn = OFF; 
    } else {
        SOUNDFX_TOGGLE.textContent = "SOUND FX ON";  
        soundfxOn = ON; 
    }
  }
  
