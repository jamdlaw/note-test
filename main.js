const all_music_notes = ['A', 'A#', 'B', 'C', 'C#','D','D#','E', 'F','F#','G','G#'];

let note_display = document.getElementById('music_note');

const mainButton = document.getElementById('main-btn');
let interval;

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

    const circleAnimation = document.getElementById('circle');

    circleAnimation.style.animationPlayState = 'running';
    const majOrMin = document.getElementById('major_minor');
    const question_time = document.getElementById('question_time');
    chordType = majOrMin.value ==  'both' ? getMajOrMin() :  majOrMin.value; 
    chord_type = document.getElementById('chord_type');
    chord_type.innerHTML = chordType;
    getRandomNote();
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'Stop';

    interval = setInterval(getRandomNote, question_time.value * 1000);
    if(majOrMin.value == 'both'){
        interval = setInterval(getMajOrMin, question_time.value * 1000);
    }

    let countdownNumberEl = document.getElementById('countdown-number');
    let countdown = question_time.value;

    countdownNumberEl.textContent = countdown;

    setInterval(function() {
    countdown = countdown >= 0 ? --countdown : 0;

    countdownNumberEl.textContent = countdown;
    }, 1000);


    let circle = document.getElementById("circle");
    circle.style["-webkit-animation-duration"] = question_time + "s";
}

function stopGame(){
    clearInterval(interval);
    mainButton.dataset.action = 'start';
    mainButton.textContent = 'Start';
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


