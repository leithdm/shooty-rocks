
# Testing <!-- omit in toc -->

## Table of Contents
- [HTML Validator](#html-validator)
  - [W3C HTML Markup Validation Service](#w3c-html-markup-validation-service)
- [CSS Validator](#css-validator)
  - [W3C CSS Validation Service](#w3c-css-validation-service)
- [JavaScript](#javascript)
  - [JSHint](#jshint)
- [Compatability](#compatability)
  - [Manual Testing](#manual-testing)
  - [Automated Testing](#automated-testing)
    - [Test Driven Development](#test-driven-development)
    - [PowerMapper](#powermapper)
      - [1. Errors](#1-errors)
      - [2. Accessibility](#2-accessibility)
      - [3. Compatibility](#3-compatibility)
      - [4. Search](#4-search)
      - [5. Usability](#5-usability)
- [User Stories](#user-stories)
- [Bugs](#bugs)

<br/>


# HTML Validator

## [W3C HTML Markup Validation Service](https://validator.w3.org/)

<br/>

- Menu Page (index.html)

<br/>

![Menu Page HTML Validator](assets/testing/results/index.html-testing.PNG)

**Result:** No Errors or warnings

----------

<br/>

- Game Page (game.html)

<br/>

![Game Page HTML Validator](assets/testing/results/game.html-testing.PNG)

**Result:** No Errors or warnings

----------

<br/>

- High Score Page (high-score.html)

<br/>

![High Score Page HTML Validator](assets/testing/results/high-score.html-testing.PNG)

**Result:** No Errors or warnings

----------

<br/>

- How To Play Page (how-to-play.html)

<br/>

![How To Play Page HTML Validator](assets/testing/results/how-to-play.html-testing.PNG)

**Result:** No Errors or warnings

----------

<br/>

- Sound Page (sound.html)

<br/>

![Sound Page HTML Validator](assets/testing/results/sound.html-testing.PNG)

**Result:** No Errors or warnings

----------

# CSS Validator

## [W3C CSS Validation Service](https://jigsaw.w3.org/css-validator/)

<br/>

![CSS Validator](assets/testing/results/style.css-testing.PNG)

**Result:** No Errors, 16 warnings. The validator found x16 generic warnings related to border extensions for 'moz' and 'webkit'. Other warnings are related to using css custom properties/variables for color designation, and touch gestures related to the keypad controller. All of these warnings are ignored.

![CSS Validator](assets/testing/results/style.css-warnings-testing.PNG)

<br/>

----------

# JavaScript

## [JSHint](https://jshint.com/)

- File: [asteroid.js](assets/testing/src/asteroid.js)

![asteroid.js JSHint](assets/testing/results/jshint-asteroid-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-asteroid-testing.PNG) with x11 undefined variables (*ignored*).


- File: [bullet.js](assets/testing/src/bullet.js)

![bullet.js JSHint](assets/testing/results/jshint-bullet-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-bullet-testing.PNG) with x8 undefined variables (*ignored*).


- File: [game.js](assets/testing/src/game.js)

![game.js JSHint](assets/testing/results/jshint-game-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-game-testing.PNG) with x20 undefined variables (*ignored*).


- File: [game-utilities.js](assets/testing/src/game-utilities.js)

![game-utilities.js JSHint](assets/testing/results/jshint-game-utilities-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-game-utilities-testing.PNG) with x13 undefined variables (*ignored*).


- File: [ship.js](assets/testing/src/ship.js)

![ship.js JSHint](assets/testing/results/jshint-ship-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-ship-testing.PNG) with x14 undefined variables (*ignored*).


- File: [sound.js](assets/testing/src/sound.js)

![sound.js JSHint](assets/testing/results/jshint-sound-testing.PNG)

**Result:** [No Errors](assets/testing/results/jshint-sound-testing.PNG) with x3 undefined variables (*ignored*).

# Compatability

## Manual Testing

To ensure a broad range of users can successfully use this site, it was manually tested across the 6 major browsers:

- Chrome v.85
- Edge v.85
- Firefox v.81
- Safari v.12
- Opera v.71
- Internet Explorer v.11

<br/>

To test site responsiveness the following tools were used:

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)

<br/>

**Result:**

![Responsive Design](assets/testing/results/responsiveness.PNG)

<br/>


## Automated Testing

### Test Driven Development

TDD was employed on this project when creating and interacting with the Asteroid, Bullet and Ship objects.


[Jasmine 3.6.0](https://jasmine.github.io/) was used to automated these tests, and they can be found in the [testing/spec](assets/testing/spec) folder. To run the automated tests use the [spec-runner.html](assets/testing/spec-runner.html) file.


![Spec Results](assets/testing/results/jasmine-testing.PNG)

**Result:** 46 specs, 0 failures.

<br/>

<br/>

----------

### PowerMapper

Further automated testing was performed using [PowerMapper](https://www.powermapper.com/). This tool checks websites for **broken links, browser compatibility, accessibility, web standards validation, search engine issues, and general usability** under the following headers:
1. Errors
2. Accessibility
3. Compatibility
4. Search
5. Usability

#### 1. Errors

<br/>

![PowerMapper Errors](readme-files/powermapper-errors.PNG)

**Result:** No Errors Found.

<br/>

----------


#### 2. Accessibility

<br/>


![PowerMapper Errors](readme-files/powermapper-accessibility.PNG)

**Result:** x4 Level A Errors, x3 Level AA Errors.

All of these errors were corrected except for:
1. 'A video plays longer than 5 seconds, without a way to pause it'. This is in reference to the header videos that display on each of the main website pages. This is a design consideration. This error is ignored.
2. 'Ensure that text and background colors have enough contrast'. This is a design consideration. This error is ignored.

<br/>

----------



#### 3. Compatibility

<br/>

![PowerMapper Errors](readme-files/powermapper-compatibility.PNG)

**Result:** SVG images, CSS filter, and CSS transform are not supported by some older browsers. These compatibility problems are accepted, and ignored. Most Android devices from 4.4 onwards use Chrome as the default browser instead of the original Android browswer, and IE and Safari <= 9 are *legacy* browsers.

<br/>

----------



#### 4. Search

<br/>

![PowerMapper Errors](readme-files/powermapper-search.PNG)

**Result:** Offer an HTML site map, and provide a unique page title to each page.
Using [XML-SiteMaps](https://www.xml-sitemaps.com/) a site-map was created and added to the root directory. A unique page title was provided to each page.

<br/>

----------



#### 5. Usability

<br/>

![PowerMapper Errors](readme-files/powermapper-usability.PNG)

**Result:** minor Errors in relation to lack of img-width and img-height attributes making the page layout jumpy when first loading. This error is ignored for this version as its effects are negligible.

<br/>

----------

# User Stories


**Result:** All user stories have been successfully implemented, with a :white_check_mark: to denote items that have been implemented in this website.

<br/>


"**__As a user, I__** ______________________________________________"

- :white_check_mark: need to have a responsive game, playable from any device (mobile, tablet, desktop).
- :white_check_mark: should have an invincibility shield for a set period of time when game restarts.
- :white_check_mark: should see GAME OVER when I lose all my lives.
- :white_check_mark: should progress through the game via Levels i.e. Level 1, Level 2, etc.
- :white_check_mark: should have a triangular ship to match the original game.
- :white_check_mark: should see irregular shaped asteroids.
- :white_check_mark: should see an explosion when I shoot an asteroid.
- :white_check_mark: should be able to turn soundfx on and off as a menu option.
- :white_check_mark: should hear different sound-fx while playing the game.
- :white_check_mark: should have a visual cue for the number of lives I have during the game.
- :white_check_mark: should be able to shoot the asteroids with bullets.
- :white_check_mark: should be able to shoot bullets using keyboard input.
- :white_check_mark: should be able to move the ship using keyboard input.
- :white_check_mark: should be able to move my ship forwards, backwards, left, and right.
- :white_check_mark: should have my ship render onto the centre of the canvas at the start of the game.
- :white_check_mark: should feel friction when my ship is no longer moving forward, and my ship should finally stop.
- :white_check_mark: should be given 3 lives at the start of the game.
- :white_check_mark: should have a visual cue (explosion) when my ship is hit by an asteroid.
- :white_check_mark: should have a visual cue (afterburner at back of ship) when my ship is thrust forward.
- :white_check_mark: should see my score increment every time I shoot an asteroid. Different asteroids get different points.
- :white_check_mark: should see my ship reappear on the opposite side of the screen if I move off-screen.
- :white_check_mark: should see the large and medium sized asteroids break up into x2 smaller asteroids when hit by a bullet.
- :white_check_mark: should find the game easy to begin with, and as the game progresses it should get increasingly more difficult.
- :white_check_mark: should be able to shoot bullets by tapping a "FIRE" button when on mobile.
- :white_check_mark: should be able to move the ship using swipes or a button keypad when playing the game on mobile.
- :white_check_mark: should be able to click on a HIGH SCORES menu button, and be presented with the highest score.
- :white_check_mark: should be able to click on a SOUND OPTIONS menu button, and be presented with an option to turn sound ON/OFF.
- :white_check_mark: should be presented with a GAME MENU.
- :white_check_mark: should be presented with a game that meets accessibility guidelines.

<br/>

"**__As a developer, I__** ______________________________________________"

- :white_check_mark: must maximise future maintainability through documentation, code structure and organisation.
- :white_check_mark: must document testing fully to include evaluation of bugs found and their fixes, and explanation of any bugs that are left unfixed.
- :white_check_mark: must test and deploy to a cloud platform.
- :white_check_mark: must pass HTML/CSS through the official W3C validators with no issues.
- :white_check_mark: must pass JavaScript code through a linter with no major issues.

<br/>

# Bugs


[Go back to README.md file](README.md).

