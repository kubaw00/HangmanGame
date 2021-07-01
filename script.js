const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part');


const words = ['aplication','programing', 'mathematic', 'computer'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const wrongLetters = [];
const correctLetters = [];

function displayWord() {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ""}</span>`)
        .join('')}`;

console.log(wordEl.textContent)
console.log(selectedWord)
const innerWord = wordEl.textContent;
if(innerWord === selectedWord){
    finalMessage.textContent = "Congratulations! You Won!!!"
    popup.style.display = 'flex';
   
}

}

//update the wrong letters
function updateWrongLettersEl(){

    //display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part, index) => {
        
        if (index < wrongLetters.length){
            part.style.display ='block';
        } else {
            part.style.display ='none'
        }
        
    });
    
    if (figureParts.length === wrongLetters.length){
        finalMessage.textContent = "Unfortunately you lost :("
        popup.style.display = 'flex';
        
        
    }
}


//show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

// eventlistener on key
window.addEventListener('keydown', e => {
    if (e.which >= 65 && e.which <= 90){
        const letter = e.key;
        
        if (selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)

                displayWord()
            } else {
                showNotification()
            }
        } else {
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLettersEl();
            } else {
                showNotification()
            }
        }
    }
})

//restart game
playAgainBtn.addEventListener('click', () => {

    wrongLetters.splice(0);
    correctLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none'
    

} )

displayWord()

