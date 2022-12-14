const all_music_notes = ['A', 'A#', 'B', 'C', 'C#','D','D#','E', 'F','F#','G','G#'];

const note_display = document.getElementById('music_note');
const mainButton = document.getElementById('main-btn');
const circleAnimation = document.getElementById('circle');
const question_time = document.getElementById('question_time');
const countdownNumberEl = document.getElementById('countdown-number');
let interval, userCountDown,countdown,userCountDown2;

mainButton.addEventListener('click', () => { 
    const action = mainButton.dataset;
    
    if (action.action === 'start'){
        startGame();
    }

    else{
        stopGame();
    }

});

function startGame(){  
    circleAnimation.style["-webkit-animation-duration"] = question_time.value + "s";
    circleAnimation.style.animationPlayState = 'running';
    getRandomNote();
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'Stop';
    interval = setInterval(getRandomNote, question_time.value * 1000);   
    countdown = question_time.value;
    countdownNumberEl.textContent = countdown;
    userCountDown = setInterval(function() {
    countdown = countdown >= 0 ? --countdown : 0;
    countdownNumberEl.textContent = countdown;
    }, 1000);
    userCountDown2 = setInterval(function() {
        countdown = question_time.value;
        countdownNumberEl.textContent = question_time.value;
        }, question_time.value * 1000);
}

function stopGame(){
    clearInterval(interval);
    clearInterval(userCountDown);
    clearInterval(countdown);
    clearInterval(userCountDown2);
    mainButton.dataset.action = 'start';
    mainButton.textContent = 'Start';
    circleAnimation.style.animationPlayState = 'paused';
    circleAnimation.style.strokeDashoffset = 0; // tyring to reset the circle but does not see to work
    circleAnimation.style["-webkit-animation-duration"] = question_time.value + "s";
    
}

function getRandomNote(){
    let random_note = all_music_notes[Math.floor(Math.random()*all_music_notes.length)];
    note_display.innerHTML = random_note;
    
    return random_note;
}

function getMajOrMin(){
    const chordType = ['major', 'minor']; 
    minOrMaj = chordType[Number(Math.random() >= 0.5)]
    chord_type = document.getElementById('chord_type');
    chord_type.innerHTML = minOrMaj;

    return minOrMaj;
}


