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

    majOrMin = document.getElementById('major_minor');
    chordType = majOrMin.value ==  'both' ? getMajOrMin() :  majOrMin.value; 
    chord_type = document.getElementById('chord_type');
    chord_type.innerHTML = chordType;
    getRandomNote();
    mainButton.dataset.action = 'stop';
    mainButton.textContent = 'Stop';

    interval = setInterval(getRandomNote, 4000);
    if(majOrMin.value == 'both'){
        interval = setInterval(getMajOrMin, 4000);
    }

    var circle = document.getElementById("circle");
    circle.style["-webkit-animation-duration"] = 10 + "s";
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

var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 4;

countdownNumberEl.textContent = countdown;

setInterval(function() {
  countdown = --countdown <= 0 ? 4 : countdown;

  countdownNumberEl.textContent = countdown;
}, 1000);

