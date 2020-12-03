
![Covidroids](assets/images/game-logo.PNG)

<!-- ![asteroids](readme-files/responsive.png) -->

- [Overview](#overview)
- [UX](#ux)
  - [User Stories](#user-stories)
  - [Design](#design)
    - [Color Scheme](#color-scheme)
    - [Icons](#icons)
    - [Typography](#typography)
  - [Wireframes](#wireframes)
- [Features](#features)
  - [Existing Features](#existing-features)
  - [Future Features](#future-features)
- [Technologies Used](#technologies-used)
  - [Front-End Technologies](#front-end-technologies)
  - [Miscellaneous Technologies](#miscellaneous-technologies)
- [Agile Project Management](#agile-project-management)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)
  - [Media](#media)
  - [Acknowledgments](#acknowledgments)

<br/>

---

## Overview

Shooty Rocks is an endless space shooter arcade game inspired by the classic *Asteroids* game. You can view the deployed game [here](https://leithdm.github.io/milestone-project-2/).

<br/>

## UX

This project is part of the [Code Institute](https://codeinstitute.net/) Full Stack Software Development course, specifically **Module 2: Interactive Front-End Development**. The objective for this milestone project is to "*build an interactive front-end site. The site should respond to the users' actions, allowing users to actively engage with data, alter the way the site displays the information to achieve their preferred goals.*"

The inspiration for developing this game came from the classic Asteroids game conceived by Lyle Raines who was Atari's vice president of engineering in 1979. Ed Logg eventually took the lead on the project and is credited with its programming.

<br/>

### User Stories

- User Stories were written from the perspective of the user, and are detailed below (in no particular order).

<br/>

"**__As a *user*, I__** ______________________________________________"

- need to have a responsive game, playable from any device (mobile, tablet, desktop).
- should have an invincibility shield for a set period of time when game restarts.
- should see GAME OVER when I lose all my lives.
- should progress through the game via Levels i.e. Level 1, Level 2, etc.
- should have a triangular ship to match the original game.
- should see irregular shaped asteroids.
- should see an explosion when I shoot an asteroid.
- should be able to turn soundfx on and off as a menu option.
- should hear different sound-fx while playing the game.
- should have a visual cue for the number of lives I have during the game.
- should be able to shoot the asteroids with bullets.
- should be able to shoot bullets using keyboard input.
- should be able to move the ship using keyboard input.
- should be able to move my ship forwards, backwards, left, and right.
- should have my ship render onto the centre of the canvas at the start of the game.
- should feel friction when my ship is no longer moving forward, and my ship should finally stop.
- should be given 3 lives at the start of the game.
- should have a visual cue (explosion) when my ship is hit by an asteroid.
- should have a visual cue (afterburner at back of ship) when my ship is thrust forward.
- should see my score increment every time I shoot an asteroid. Different asteroids get different points.
- should see my ship reappear on the opposite side of the screen if I move off-screen.
- should see the large and medium sized asteroids break up into x2 smaller asteroids when hit by a bullet.
- should find the game easy to begin with, and as the game progresses it should get increasingly more difficult.
- should be able to shoot bullets by tapping a "FIRE" button when on mobile.
- should be able to move the ship using swipes or a button keypad when playing the game on mobile.
- should be able to click on a HIGH SCORES menu button, and be presented with the highest score.

<br/>

### Design

Mobile responsiveness was a key consideration in this project, and resulted in the development of a gamepad controller in order to move the ship when playing on mobile. The use of responsive CSS sizing elements including `vw` , `vh` and `grid` helped to ensure the site responds to the appropriate device, along with my own `container` element that is functionally the same as a Bootstrap [container](https://getbootstrap.com/docs/4.5/layout/overview/) but without the overhead of using the framework.

<br/>


#### Color Scheme

- ![#800080](https://placehold.it/15/800080/800080) purple text/background
- ![#B22234](https://placehold.it/15/B22234/B22234) red button
- ![#FFFF00](https://placehold.it/15/FFFF00/FFFF00) yellow button/text
- ![#00C0A3](https://placehold.it/15/00C0A3/00C0A3) green text
- ![#02AFFF](https://placehold.it/15/02AFFF/02AFFF) blue dashboard (score, level, lives)

- The gamepad color scheme is loosely based on the [SNES](https://link) controller.
![GamePad](assets/images/gamepad.PNG)

- All of these colors are set at `:root` level within my [style.css](assets/css/style.css) file. The use of css custom properties (variables) is in keeping with the principles of DRY.

<br/>

#### Icons

- [Font Awesome 5.6.1](https://link) icons are used on the [How To Play](how-to-play.html) page and in the gamepad controller.

<br/>

#### Typography

- 2 [Google Fonts](https://fonts.google.com/) were used across the site.
  - [Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P) : game title and menu buttons.
  - [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) : in-game dashboard including score, highscore, ships, level.

<br/>

### Wireframes

- Wireframes were created using [Balsamiq Wireframes](https://balsamiq.com/) and can be viewed by clicking on links below.

<br/>


|    Home Page   |    Sound-Options.html     |    High-Scores.html    |
|    :----:      |    :----:                 |    :----:              |
|[Desktop/Mobile](wireframes/home-page.png)|[Desktop/Mobile](wireframes/sound-options.png)|[Desktop/Mobile](wireframes/high-scores-page.png)|

<br/>

---

## Features

### Existing Features
  - **Progressive Difficulty:** the game is an endless space shooter arcade game. The game starts at Level 1, and becomes increasingly more difficult at each new level. This is implemented by increasing the number of asteroids, and increasing the speed at which the asteroids move.
  - **Play Again:** Once the game is over, a pop up screen allows the user to play again, or exit to the main menu.
  - **Sound Fx / Music:** option to turn Sound Fx and background Music on/off from within the game itself. Settings are stored in local storage.
  - **How to Play:** a menu item to explain how to play the game on both Desktop and Mobile.
  - **High Score:** a menu item to display the highest score achieved to date. High score is also displayed within the game to provide extra incentive to the user.
  - **In-game Dashboard:** displaying High Score, Score, Level, and Ships status.
  - **Gamepad Controller:** built for mobile users. Large buttons to aid functionality.

### Future Features
- **In-game enhancements:** alien space ships that shoot at player, power-ups, gain-lives, flashier explosions/collisions, different sound fx, game-over music, different backgrounds for different levels, pause-button, etc, etc. There are many improvements that can be implemented to enhance the overall game experience.
-  **Menu Items:** High Score leaderboard, e.g. top 10. UX change-out e.g. dark mode/light mode.


<br/>

---

## Technologies Used

### Front-End Technologies

- [HTML5](https://en.wikipedia.org/wiki/HTML5) - used to provide content and structure.
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets) - used to provide styling.
- [JavaScript ES6](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - the game is built entirely from vanilla JavaScript.
- [Jasmine](https://jasmine.github.io/) - used for Test-Driven Development (TDD).
- [Howler.js](https://github.com/goldfire/howler.js#documentation) - an audio library for the modern web.
- [Google Fonts](https://fonts.google.com/) - used to provide font styling.
- [Am I Responsive?](http://ami.responsivedesign.is/) - used to show site responsiveness.

### Miscellaneous Technologies

- [VS Code](https://code.visualstudio.com/) - used as the primary IDE.
- [GitHub](https://github.com/) - used for remote storage of code.
- [TinyPNG](https://tinypng.com/) - used to optimize (.jpg, .png) images for faster loading.
- [Balsamiq](https://balsamiq.com/) - used to create the project's wireframes.

<br/>

---

## Agile Project Management

[GitHub Projects](https://github.com/features/project-management/) was used to iteratively sprint through the development of this app. Each *User Story* became an individual *Issue*, and was placed in a Kanban board composed of the following columns:
1. **Backlog** - all user stories, ordered by value/priority.
2. **Sprint** - a subset of user stories to be completed in a x1 week sprint.
3. **In Progress** - user stories currently being worked on from current sprint.
4. **Done** - user stories completed, and tested.

 A separate git branch was created for each user story, and a Pull Request (PR) was submitted for its subsequent approval/merger into the master repository. Along with tracking user stories, Github Projects was also used to track bugs. **The full list of user stories/bugs and their relevant PR's can be viewed [here](https://github.com/leithdm/milestone-project-2/projects/1).**

![GitHub Projects in action](wireframes/agile-project-management.png)

<br/>

---

## Testing

The testing process can be viewed [here](TESTING.md).

<br/>

---

## Deployment

**To deploy the project:**

This project is hosted in GitHub Pages

1. On the menu on the top of the project’s repository on GitHub select **Settings**.
2. Scroll down to the GitHub **Pages** section.
3. Inside that section, click on the drop-down menu under **Source** and select **Master Branch**.
4. The page refreshes automatically and the website is now deployed.
5. The link to the webpage is just in the GitHub **Pages** section down below.

Only the master branch has been used for this project.

<br/>

**To run the project locally:**

To clone this project from GitHub:

1. Under the repository’s name, click **Clone or download**.
2. In the **Clone with hTTPS** section, copy the given URL.
3. In your IDE of choice, open **Git Bash**.
4. Change the current working directory to the location where you want the cloned directory to be made.
5. Type **git clone**, and then paste the URL copied from GitHub.
6. Press **enter** and a localized clone will be created.

---

## Credits

### Media

- Audio:
  - [Classic Gaming](http://www.classicgaming.cc/classics/asteroids/) provided the in-game [sound fx](http://www.classicgaming.cc/classics/asteroids/sounds). These are the same sounds used in the original *Asteroids* arcade classic.
  - Background music was provided for free by [DL Sounds](https://www.dl-sounds.com/royalty-free/andromeda-journey/).
- Images:
  - The [background image]([https://link](http://www.classicgaming.cc/classics/asteroids/graphics)) used in the game menu was again provided by [Classic Gaming](http://www.classicgaming.cc/classics/asteroids/).
  - The in-game star background was provided by [Jake Weirick](https://unsplash.com/photos/Q_RBVFFXR_g) via [Unsplash](https://unsplash.com/).
  - The in-game controller background was provided by [Hero Patterns](http://www.heropatterns.com/).
- Game Programming Tutorials:
  - [Make JavaScript Asteroids in One Video](https://www.youtube.com/watch?v=HWuU5ly0taA&ab_channel=DerekBanas): a great introductory video.
  - [Code Asteroids in JavaScript (1979 Atari game) - tutorial](https://www.youtube.com/watch?v=H9CSWMxJx84&ab_channel=freeCodeCamp.org): another excellent tutorial.
  - [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) tutorials provided by Mozilla.
  - [Code Your First Game: Arcade Classic in JavaScript on Canvas](https://www.udemy.com/course/code-your-first-game/): a free course on [Udemy](https://www.udemy.com/).
  - [How to Program Games: Tile Classic in JS for HTML5 Canvas](https://www.udemy.com/course/how-to-program-games/): a paid course on [Udemy](https://www.udemy.com/).


<br/>

### Acknowledgments

- [Precious Ijege](https://www.linkedin.com/in/precious-ijege-908a00168/?originalSubdomain=ng) - for his mentorship and guidance.