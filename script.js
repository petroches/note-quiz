document.addEventListener('DOMContentLoaded', () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const noteFrequencies = {
        'A': 440.00,
        'B': 493.88,
        'C': 523.25,
        'D': 587.33,
        'E': 659.25,
        'F': 698.46,
        'G': 783.99
    };

    const notes = Object.keys(noteFrequencies);
    let currentNote = '';

    const playNote = (frequency) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.start();

        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
        
        oscillator.stop(audioContext.currentTime + 1);
    };

    const showOptions = () => {
        const answersDiv = document.getElementById('answers');
        answersDiv.innerHTML = '';
        answersDiv.style.display = 'flex';
        document.getElementById('description').style.display = 'none';

        // Добавить правильную ноту в массив опций
        let options = [currentNote];
        
        // Добавить случайные ноты, пока их количество не станет 4
        while (options.length < 4) {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            if (!options.includes(randomNote)) {
                options.push(randomNote);
            }
        }
        
        // Перемешать опции
        options.sort(() => Math.random() - 0.5);

        // Создать кнопки для каждой опции
        options.forEach(note => {
            const button = document.createElement('button');
            button.textContent = note;
            button.addEventListener('click', () => {
                playNote(noteFrequencies[note]);
                setTimeout(() => checkAnswer(note), 1000); // Проверить ответ после воспроизведения ноты
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
        playNote(noteFrequencies[currentNote]);
        showOptions();
    });

    document.getElementById('replay-note').addEventListener('click', () => {
        playNote(noteFrequencies[currentNote]);
    });
});
