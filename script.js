document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const noteFrequencies = {
        'C': 523.25,  // Частота до (C5)
        'D': 587.33,  // Частота ре (D5)
        'E': 659.25,  // Частота ми (E5)
        'F': 698.46,  // Частота фа (F5)
        'G': 783.99,  // Частота соль (G5)
        'A': 880.00,  // Частота ля (A5)
        'B': 987.77   // Частота си (B5)
    };

    const notes = Object.keys(noteFrequencies);

    let currentNote = '';

    const playNote = (frequency) => {
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
    };

    document.getElementById('play-note').addEventListener('click', () => {
        currentNote = notes[Math.floor(Math.random() * notes.length)];
        playNote(noteFrequencies[currentNote]);
        showOptions();
    });

    document.getElementById('replay-note').addEventListener('click', () => {
        playNote(noteFrequencies[currentNote]);
    });

    const showOptions = () => {
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        answersDiv.style.display = 'block';

        const shuffledNotes = notes.sort(() => Math.random() - 0.5);
        shuffledNotes.slice(0, 4).forEach(note => {
            const button = document.createElement('button');
            button.textContent = note;
            button.addEventListener('click', () => {
                if (note === currentNote) {
                    document.getElementById('result').textContent = 'Correct!';
                } else {
                    document.getElementById('result').textContent = `Wrong! It was ${currentNote}.`;
                }
                document.getElementById('play-note').style.display = 'block';
                document.getElementById('replay-note').style.display = 'none';
                answersDiv.style.display = 'none';
            });
            button.addEventListener('click', () => playNote(noteFrequencies[note]));
            answersDiv.appendChild(button);
        });

        document.getElementById('play-note').style.display = 'none';
        document.getElementById('replay-note').style.display = 'block';
    };
});
