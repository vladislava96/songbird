import birdsData from './js/dirds-data.js';
import Player from './js/audio-player.js';

const answerOptionsList = document.querySelector('.answer-options__list');
const questionItems = document.querySelectorAll('.question-item');
const currentQuestionCol = document.querySelector('.current-question-col');

const currentQuestion = document.querySelector('.current-question');
const answerOptions = document.querySelector('.answer-options');
const birdDescription = document.querySelector('.bird-description');
const nextLevelBtm = document.querySelector('.next-level');
const endMessage = document.querySelector('.end-message');
const scoreHtml = document.querySelector('.score');

let LEVEL = 1;
let ANSWER = '';
let QUESTION = '';
let answerData;
let SCORE = 0;
let questionSong = '';
let questionPlayer;

class Sound {
  constructor(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      this.isPlay = true;
      document.body.appendChild(this.sound);
  }

  play() {
      this.isPlay = true;
      this.sound.play();
  }
}

questionItems[LEVEL - 1].classList.add('question-item_active')

function generateAnswers(level) {
  answerOptionsList.innerHTML = '';
  
  for (let birdData of birdsData[level - 1]) {
    let li = document.createElement('li');
    li.className = 'answer-options__item';
    
    let btn = document.createElement('span');
    btn.className = 'answer-options__btn';
    
    let name = birdData.name;
    li.append(btn, name);
    answerOptionsList.appendChild(li);
  }

}

generateAnswers(LEVEL)

function generateSong(level) {
  QUESTION = '';
  let randomNumber = Math.floor(Math.random() * (5 - 1)) + 0;
  QUESTION = birdsData[level - 1][randomNumber].name;
  questionSong = birdsData[level - 1][randomNumber].audio;
  questionPlayer = new Player(questionSong, currentQuestionCol)
}

generateSong(LEVEL)


let minus = 0;
let levelScore = 5;

answerOptionsList.addEventListener('click', (event) => {
  ANSWER = '';
  ANSWER = event.target.textContent;
  
  let btn = event.target.querySelector('span');

  console.log(btn)
  
  for (let birdData of birdsData[LEVEL - 1]) {
    if (birdData.name === ANSWER) {
      answerData = birdData
    }
  }

  if (QUESTION === ANSWER) {
    console.log("victory")
    getVictory()
    
    SCORE += levelScore;
    scoreHtml.textContent = 'SCORE:' + SCORE;
    btn.classList = 'answer-options__btn answer-options__btn_true';
    questionPlayer.stop();
    let sound = new Sound('./audio/victory.mp3');
    sound.play();

  } else {
    console.log("no")
    minus += 1;
    levelScore = 5 - minus;

    let sound = new Sound('./audio/false.mp3');
    sound.play();

    btn.classList = 'answer-options__btn answer-options__btn_false';
    if (levelScore < 0) {
      levelScore = 0;
    }
  }

  console.log('levelScore:' + levelScore)
  console.log('SCORE:' + SCORE)

  birdDescription.innerHTML = '';

  const birdImg = document.createElement('img');
  birdImg.src = answerData.image;
  birdImg.className = 'bird-description__img';

  const birdName = document.createElement('div');
  birdName.textContent = ANSWER;
  birdName.className = 'bird-description__name';

  const birdSpecies = document.createElement('div');
  birdSpecies.textContent = answerData.species;
  birdSpecies.className = 'bird-description__species';

  const birdText = document.createElement('div');
  birdText.textContent = answerData.description;
  birdText.className = 'bird-description__text';

  birdDescription.append(birdImg, birdName, birdSpecies, birdText);
  new Player(answerData.audio, birdDescription);

})

const currentQuestionBirdName = document.querySelector('.current-question__bird-name');
const currentQuestionImg = document.querySelector('.current-question__img');


function getVictory() {
  nextLevelBtm.classList = 'next-level next-level_active';
  currentQuestionBirdName.textContent = answerData.name;
  currentQuestionImg.src = answerData.image;
  nextLevelBtm.disabled = false;
}

const restart = document.createElement('button');

nextLevelBtm.addEventListener('click', () => {
  nextLevelBtm.classList = 'next-level';
  minus = 0;
  levelScore = 5;
  
  console.log("click")

  birdDescription.innerHTML = 'Послушайте плеер. Выберите птицу из списка.';
  currentQuestionBirdName.textContent = '*****';
  currentQuestionCol.removeChild(currentQuestionCol.querySelector('.player'))
  currentQuestionImg.src = './img/bird06.jpg';

  questionItems[LEVEL - 1].classList.remove('question-item_active')
  console.log(LEVEL)

  LEVEL += 1;
  console.log(LEVEL)


  if (LEVEL === 7) {
    currentQuestion.style.display = 'none';
    answerOptions.style.display = 'none';
    birdDescription.style.display = 'none';
    nextLevelBtm.style.display = 'none';
    console.log(SCORE);
    endMessage.style.display = 'block';

    if (SCORE === 30) {
      endMessage.textContent = `Поздравляю! Вы набрали максимальный балл.`
    } else {
      endMessage.innerHTML = `<p>ПОЗДРАВЛЯЮ!</p> Вы набрали ${SCORE} баллов из возможных 30. <p>Пройти викторину еще раз?</p>`
      
      restart.textContent = 'Начать заново';
      restart.className = 'restart-btn';
      endMessage.appendChild(restart);
    }
    
  } else {
    generateAnswers(LEVEL);
    generateSong(LEVEL);
    questionItems[LEVEL - 1].classList.add('question-item_active');

    nextLevelBtm.disabled = true;
  }
})

restart.addEventListener('click', () => {
  LEVEL = 1;
  ANSWER = '';
  QUESTION = '';
  answerData;
  SCORE = 0;

  questionItems[LEVEL - 1].classList.add('question-item_active');
  scoreHtml.textContent = 'SCORE:0';

  currentQuestion.style.display = 'grid';
  answerOptions.style.display = 'block';
  birdDescription.style.display = 'block';
  nextLevelBtm.style.display = 'block';
  endMessage.style.display = 'none';

  generateAnswers(LEVEL)
  generateSong(LEVEL)
})