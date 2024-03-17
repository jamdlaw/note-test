class MusicGame {
    constructor() {
      this.allMusicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
      this.noteDisplay = document.querySelector('#music_note');
      this.mainButton = document.querySelector('#main-btn');
      this.questionTime = document.querySelector('#question_time');
      this.countdownNumberEl = document.querySelector('#countdown-number');
      this.interval = null;
      this.userCountDown = null;
      this.userCountDown2 = null;
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
      this.mainButton.dataset.action = 'stop';
      this.mainButton.textContent = 'Stop';
      this.countdown = this.questionTime.value;
      this.countdownNumberEl.textContent = this.countdown;
  
      const timerFunction = () => {
        this.countdown = this.countdown >= 0 ? --this.countdown : 0;
        this.countdownNumberEl.textContent = this.countdown;
  
        if (this.countdown <= 0) {
          clearInterval(timerId);
          this.stopGame();
        }
      };
  
      const timerId = setInterval(timerFunction, 1000);
      this.userCountDown = timerId;
      this.userCountDown2 = timerId;
  
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
      clearInterval(this.userCountDown2);
      this.mainButton.dataset.action = 'start';
      this.mainButton.textContent = 'Start';
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

     // Function to update the button's state
    updateButtonState(action, text) {
      this.mainButton.dataset.action = action;
      this.mainButton.textContent = text;
    }
  }
  
  const musicGame = new MusicGame();
  musicGame.init();
  