const all_music_notes = ['A', 'A#', 'B', 'C', 'C#','D','D#','E', 'F','F#','G','G#'];

let note_display = document.getElementById('music_note');

function getRandomNote(){
    let random_note = all_music_notes[Math.floor(Math.random()*all_music_notes.length)];
    

    note_display.innerHTML = random_note;
    return random_note;
}
const interval = setInterval(getRandomNote, 5000);

console.log(interval);
