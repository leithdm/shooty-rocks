//for retrieving local store of high score
function getLocalStorage() {
    if(localStorage.getItem(LOCAL_STORAGE_HIGHSCORE) == null) {
      _highScore = 0;
    } else {
      _highScore = localStorage.getItem(LOCAL_STORAGE_HIGHSCORE);
    }
  }

  //for updating the high score
  function updateHighScore() {
    _highScore = Math.max(score, _highScore);
    localStorage.setItem(LOCAL_STORAGE_HIGHSCORE, _highScore);
    HIGH_SCORE_HTML.textContent = numberWithCommas(_highScore.toString());
  }

  //for determining if soundfx are on/off
  function getLocalStorageSoundfx() {
    if(localStorage.getItem(LOCAL_STORAGE_SOUNDFX) == OFF) {
        _soundfxOn = OFF;
    } else {
        _soundfxOn = ON;
    }
  }

//for listening to soundfx on/off button
function enableSoundfx() {
  SOUNDFX_TOGGLE.addEventListener("click", () => {
    if (SOUNDFX_TOGGLE.textContent === "SOUND FX ON") {
      SOUNDFX_TOGGLE.textContent = "SOUND FX OFF";
      localStorage.setItem(LOCAL_STORAGE_SOUNDFX, OFF);
      _soundfxOn = OFF;
    } else {
      SOUNDFX_TOGGLE.textContent = "SOUND FX ON";
      localStorage.setItem(LOCAL_STORAGE_SOUNDFX, ON);
      _soundfxOn = ON;
    }
  });
}

//for determining if soundfx are on/off. Use of local storage to remember the setting
function getLocalStorageSoundfxMenu() {
  if (localStorage.getItem(LOCAL_STORAGE_SOUNDFX) == OFF) {
    SOUNDFX_TOGGLE.textContent = "SOUND FX OFF";
    _soundfxOn = OFF;
  } else {
    SOUNDFX_TOGGLE.textContent = "SOUND FX ON";
    _soundfxOn = ON;
  }
}

//for listening to music on/off button
function enableMusic() {
  MUSIC_TOGGLE.addEventListener("click", () => {
    if (MUSIC_TOGGLE.textContent === "MUSIC ON") {
      MUSIC_TOGGLE.textContent = "MUSIC OFF";
      GAME_MUSIC.stop();
      localStorage.setItem(LOCAL_STORAGE_MUSIC, OFF);
      _music = OFF;
    } else {
      MUSIC_TOGGLE.textContent = "MUSIC ON";
      localStorage.setItem(LOCAL_STORAGE_MUSIC, ON);
      GAME_MUSIC.play();
      _music = ON;
    }
  });
}

//for determining if soundfx are on/off. Use of local storage to remember the setting
function getLocalStorageMusicMenu() {
  if (localStorage.getItem(LOCAL_STORAGE_MUSIC) == OFF) {
    MUSIC_TOGGLE.textContent = "MUSIC OFF";
    GAME_MUSIC.stop();
    _music = OFF;
  } else {
    MUSIC_TOGGLE.textContent = "MUSIC ON";
    GAME_MUSIC.play();
    _music = ON;
  }
}