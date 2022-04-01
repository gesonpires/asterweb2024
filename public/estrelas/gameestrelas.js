const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Estrelas são',
        choice1: 'sólidas',
        choice2: 'líquidas',
        choice3: 'gasosas',
        choice4: 'apenas feitas de carbono, oxigênio, nitrogênio e ferro',
        answer: 3,
    },{
        question: 'A maioria das estrelas mais brilhantes no céu são',
        choice1: 'estrelas gigantes e estrelas quentes da sequência principal',
        choice2: 'estrelas frias da sequência principal que estão próximas do Sol',
        choice3: 'estrelas gigantes que estão na galáxia Andrômeda',
        choice4: 'estrelas da sequência principal quentes que estão próximas do Sol',
        answer: 1,
    },{
        question: 'Qual propriedade de uma estrela não mudaria se pudéssemos observá-la duas vezes mais longe?',
        choice1: 'cor',
        choice2: 'potência',
        choice3: 'tamanho',
        choice4: 'movimento',
        answer: 1,
    },{
        question: 'Qual fator é determinante para o tempo de vida de uma estrela?',
        choice1: 'temperatura do núcleo',
        choice2: 'temperatura superficial',
        choice3: 'massa inicial',
        choice4: 'cor',
        answer: 3,
    },{
        question: 'Estrelas são esferas autogravitantes de:',
        choice1: 'gás ionizado,cuja fonte de energia provém da fusão nuclear.',
        choice2: 'gás ionizado,cuja fonte de energia provém da fissão nuclear.',
        choice3: 'líquido envolto por gás ionizado',
        choice4: 'gás ionizado radioativo',
        answer: 1,
    },{
        question: 'As estrelas mais brilhantes são',
        choice1: 'as vermelhas de grande massa',
        choice2: 'as azuis de grande massa',
        choice3: 'as vermelhas de pequena massa',
        choice4: 'as vermelhas de pequena densidade',
        answer: 2,
    },{
        question: 'As estrelas de baixa luminosidade são do tipo',
        choice1: 'azuis',
        choice2: 'super-gigantes',
        choice3: 'gigantes',
        choice4: 'anãs vermelhas',
        answer: 4,
    },{
        question: 'Por meio da espectroscopia,',
        choice1: 'sabe-se que elementos químicos compõe uma estrela',
        choice2: 'determina-se se a fusão nuclear é fraca ou forte',
        choice3: 'comparam-se os tamanhos das estrelas',
        choice4: 'calcula-se a massa de uma estrela',
        answer: 1,
    },{
        question: 'A luminosidade de uma estrela depende de qual(is) característica(s)?',
        choice1: 'temperatura',
        choice2: 'raio e densidade',
        choice3: 'raio e temperatura',
        choice4: 'idade',
        answer: 3,
    },{
        question: 'Para duas estrelas de mesma temperatura',
        choice1: 'a de menor raio será mais luminosa',
        choice2: 'a de maior raio será mais luminosa',
        choice3: 'ambas terão mesma luminosidade',
        choice4: 'a mais luminosa é a mais distante de nós',
        answer: 2,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/estrelas/endestrelas.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()