//Class is responsible for the game play.
//correlation_work.js and the index have
// code for the tunner
class MusicGame {
    constructor() {
      this.allMusicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
      this.noteDisplay = document.querySelector('#music_note');
      this.mainButton = document.querySelector('#main-btn');
      this.questionTime = document.querySelector('#question_time');
      this.countdownNumberEl = document.querySelector('#countdown-number');
      this.interval = null;
      this.userCountDown = null;
      this.countdown = 0;
      this.score = 0;
      this.isPlaying = false;
    }
  
    init() {
      this.mainButton.addEventListener('click', () => this.toggleGame());
    }
  
    toggleGame() {
      if (this.isPlaying) {
        this.stopGame();
      } else {
        this.startGame();
      }
    }
  
    startGame() {
      this.getRandomNote();
      this.updateButtonState('stop');
      this.countdown = this.questionTime.value;
      this.countdownNumberEl.textContent = this.countdown;
  
      const timerId = setInterval(this.timerFunction, 1000);
      this.userCountDown = timerId;
  
      this.interval = setInterval(() => {
        this.getRandomNote();
        this.countdown = this.questionTime.value;
        this.countdownNumberEl.textContent = this.countdown;
      }, this.questionTime.value * 1000);
  
      this.isPlaying = true;
    }
   
    stopGame() {
      clearInterval(this.interval);
      clearInterval(this.userCountDown);
      this.updateButtonState('start');
      this.countdownNumberEl.textContent = this.questionTime.value;
      this.isPlaying = false;
    }
  
    getRandomNote() {
      const randomNote = this.allMusicNotes[Math.floor(Math.random() * this.allMusicNotes.length)];
      this.noteDisplay.textContent = randomNote;
      return randomNote;
    }

    scorePoint(){
      this.score++;
      this.startGame();
      return this.score;
    }

    //change button text
    updateButtonState(action) {
      this.mainButton.dataset.action = action;
      this.mainButton.textContent = action;
    }
  
    timerFunction = () => {
      this.countdown = this.countdown >= 0 ? --this.countdown : 0;
      this.countdownNumberEl.textContent = this.countdown;

      if (this.countdown <= 0) {
        clearInterval(timerId);
        this.stopGame();
      }
    };

  }
  
  const musicGame = new MusicGame();
  musicGame.init();
  