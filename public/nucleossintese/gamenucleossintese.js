const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    //Q1
    question: "O Universo é composto em sua minoria pelo que?",
    choice1: "estrelas",
    choice2: "matéria escura",
    choice3: "átomos",
    choice4: "galáxias",
    answer: 1,
  },
  {
    //Q2
    question:
      "Dos elementos químicos conhecidos, qual é mais abundante no Universo?",
    choice1: "oxigênio",
    choice2: "carbono",
    choice3: "hidrogênio",
    choice4: "hélio",
    answer: 3,
  },
  {
    //Q3
    question:
      "Dos elementos químicos conhecidos, qual o mais abundante no corpo humano?",
    choice1: "cálcio",
    choice2: "ferro",
    choice3: "carbono",
    choice4: "oxigênio",
    answer: 4,
  },
  {
    //Q4
    question: "O nosso Sol é capaz de fabricar até que elemento químico?",
    choice1: "ouro",
    choice2: "bismuto",
    choice3: "carbono",
    choice4: "ferro",
    answer: 3,
  },
  {
    //Q5
    question:
      "Numa estrela podem ocorrer as seguintes reações nucleares, exceto:",
    choice1: "captura de próton",
    choice2: "fusão nuclear",
    choice3: "degradação ativa",
    choice4: "captura de nêutron",
    answer: 3,
  },
  {
    //Q6
    question: "No ciclo CNO em estrelas como o Sol, ocorre",
    choice1: "captura de 2 prótons convertendo-os em radiação alfa e energia",
    choice2: "captura de 4 prótons convertendo-os em radiação alfa e energia",
    choice3: "captura de 4 nêutrons convertendo-os em radiação alfa e energia",
    choice4:
      "captura de 4 prótons convertendo-os em radiação beta com absorção de energia",
    answer: 2,
  },
  {
    //Q7
    question: "Por qual razão uma reação no ciclo CNO libera energia?",
    choice1:
      "a temperatura da estrela sempre aumenta durante seu ciclo de evolução",
    choice2: "a massa de hélio é igual que a massa dos 4 prótons originários",
    choice3: "a massa de hélio é maior que a massa dos 4 prótons originários",
    choice4: "a massa de hélio é menor que a massa dos 4 prótons originários",
    answer: 4,
  },
  {
    //Q8
    question: "Ocorre fusão nuclear nas estrelas por que ...",
    choice1: "elas são quentes o suficiente para tal.",
    choice2: "existe instabilidade no núcleo atômico do hidrogênio",
    choice3: "a energia potencial gravitacional aumenta em grandes estrelas",
    choice4:
      "a energia magnética é maior que a energia potencial gravitacional",
    answer: 1,
  },
  {
    //Q9
    question:
      "Durante a contração gravitacional de uma núvem de gás em colapso,",
    choice1:
      "a energia potencial gravitacional é convertida em energia magnética",
    choice2: "o calor é convertido em energia magnética",
    choice3:
      "a energia potencial gravitacional é convertida em energia cinética",
    choice4:
      "a energia cinética é convertida em energia potencial gravitacional",
    answer: 3,
  },
  {
    //Q10
    question: " ",
    choice1:
      "a energia potencial gravitacional é convertida em energia magnética",
    choice2: "o calor é convertido em energia magnética",
    choice3:
      "a energia potencial gravitacional é convertida em energia cinética",
    choice4:
      "a energia cinética é convertida em energia potencial gravitacional",
    answer: 3,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/nucleossintese/endnucleossintese.html");
  }

  questionCounter++;
  progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
