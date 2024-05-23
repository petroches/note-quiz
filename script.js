document.addEventListener('DOMContentLoaded', () => {
    const noteFrequencies = {
        'A': 'audio/A_sample.mp3',
        'B': 'audio/B_sample.mp3',
        'C': 'audio/C_sample.mp3',
        'D': 'audio/D_sample.mp3',
        'E': 'audio/E_sample.mp3',
        'F': 'audio/F_sample.mp3',
        'G': 'audio/G_sample.mp3'
    };

    const notes = Object.keys(noteFrequencies);
    let currentNote = '';

    const playNote = (note) => {
        const audio = new Audio(noteFrequencies[note]);
        audio.play();
    };

    const showOptions = () => {
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        answersDiv.style.display = 'flex';
        document.getElementById('description').style.display = 'none';

        let options = [currentNote];

        while (options.length < 4) {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            if (!options.includes(randomNote)) {
                options.push(randomNote);
            }
        }

        options.sort(() => Math.random() - 0.5);

        options.forEach(note => {
            const button = document.createElement('button');
            button.textContent = note;
            button.addEventListener('click', () => {
                playNote(note);
                setTimeout(() => checkAnswer(note), 1000);
            });
            answersDiv.appendChild(button);
        });

        document.getElementById('play-note').style.display = 'none';
        document.getElementById('replay-note').style.display = 'block';
    };

    const checkAnswer = (selectedNote) => {
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        document.getElementById('replay-note').style.display = 'none';

        if (selectedNote === currentNote) {
            resultDiv.textContent = `Correct! It's ${currentNote}`;
            resultDiv.className = 'correct';
        } else {
            resultDiv.textContent = `Incorrect! It's ${currentNote}`;
            resultDiv.className = 'incorrect';
        }

        setTimeout(() => reset(), 3000);
    };

    const reset = () => {
        document.getElementById('play-note').style.display = 'block';
        document.getElementById('replay-note').style.display = 'none';
        document.getElementById('answers').style.display = 'none';
        document.getElementById('result').textContent = '';
        document.getElementById('result').className = '';
        document.getElementById('description').style.display = 'block';
        document.getElementById('result').style.display = 'none';
    };

    document.getElementById('play-note').addEventListener('click', () => {
        currentNote = notes[Math.floor(Math.random() * notes.length)];
        playNote(currentNote);
        showOptions();
    });

    document.getElementById('replay-note').addEventListener('click', () => {
        playNote(currentNote);
    });
});
