const wordEl = document.querySelector('.word');
const wrongLettersEl = document.querySelector('.wrong-letters-container');
const playAgainBtn = document.querySelector('.play-again');
const popup = document.querySelector('.popup-container');
const notification = document.querySelector('.notification-container');
const finalMessage = document.querySelector('.final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = [
  'magician',
  'amazing',
  'piano',
  'engineering',
  'teacher',
  'programmer',
  'writer',
  'friendship',
  'mother',
  'theory',
  'disappear',
  'weakness',
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let play = true;

const correctLetters = [];
const wrongLetters = [];
const displayWord = function () {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class="letter" >${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}
  `;
  const innerWord = wordEl.innerText.replaceAll('\n', '');
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'congratulations! You won! 🥳';
    popup.style.display = 'flex';
    play = false;
  }
};

const displayWrongLetters = function () {
  wrongLettersEl.innerHTML = `${
    wrongLetters.length > 0 ? `<p>Wrong 🙅‍♀️</p>` : ''
  }  <span>
  ${wrongLetters.join(', ')} </span>
  `;
  figureParts.forEach((part, i) => {
    const errors = wrongLetters.length;
    if (i < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately, you lost! 😕';
    popup.style.display = 'flex';
    play = false;
  }
};

const showNotification = function () {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};

window.addEventListener('keydown', function (e) {
  if (play) {
    if (e.key >= 'a' && e.key <= 'z') {
      const letter = e.key;
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          displayWrongLetters();
        } else {
          showNotification();
        }
      }
    }
  }
});

playAgainBtn.addEventListener('click', function () {
  play = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  popup.style.display = 'none';
  displayWord();
  displayWrongLetters();
});

displayWord();
