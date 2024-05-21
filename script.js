const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const notes = {
    C: 130.81,
    D: 146.83,
    E: 164.81,
    F: 174.61,
    G: 196.00,
    A: 220.00,
    B: 246.94
};

let currentNote = null;

function playTone(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.start();

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    oscillator.stop(audioContext.currentTime + duration);
}

function getRandomNote() {
    const noteKeys = Object.keys(notes);
    const randomNote = noteKeys[Math.floor(Math.random() * noteKeys.length)];
    return randomNote;
}

function showOptions(correctNote) {
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const noteKeys = Object.keys(notes);
    const shuffledNotes = noteKeys.sort(() => 0.5 - Math.random());
    const options = shuffledNotes.slice(0, 4);

    if (!options.includes(correctNote)) {
        options[Math.floor(Math.random() * options.length)] = correctNote;
    }

    options.forEach(note => {
        const button = document.createElement('button');
        button.textContent = note;
        button.addEventListener('click', () => {
            playTone(notes[note], 1); // Play the selected note
            setTimeout(() => checkAnswer(note, correctNote), 1000); // Check the answer after the note is played
        });
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedNote, correctNote) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    
    if (selectedNote === correctNote) {
        resultContainer.textContent = 'Правильно! Это был звук ' + correctNote;
    } else {
        resultContainer.textContent = 'Неправильно. Это был звук ' + correctNote;
    }

    setTimeout(() => {
        reset();
    }, 3000);
}

function reset() {
    document.getElementById('play-note-button').style.display = 'block';
    document.getElementById('replay-note-button').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'none';
}

document.getElementById('play-note-button').addEventListener('click', () => {
    const note = getRandomNote();
    currentNote = note;
    playTone(notes[note], 1); // 1 second duration

    document.getElementById('play-note-button').style.display = 'none';
    document.getElementById('replay-note-button').style.display = 'block';
    document.getElementById('question-container').style.display = 'block';
    showOptions(note);
});

document.getElementById('replay-note-button').addEventListener('click', () => {
    playTone(notes[currentNote], 1); // 1 second duration
});
