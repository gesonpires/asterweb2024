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
        question: 'O que é um pósitron?',
        choice1: 'elétron com carga positiva',
        choice2: 'próton com carga negativa',
        choice3: 'antimatéria do próton',
        choice4: 'antimatéria do neutrino',
        answer: 1,
    },{
        question: 'O que é um dêuteron?',
        choice1: '',
        choice2: 'isótopo do hidrogênio contendo 1 próton e 1 nêutron',
        choice3: '',
        choice4: '',
        answer: 2,
    },{
        question: 'O que é um neutrino?',
        choice1: 'nêutron com carga positiva',
        choice2: 'nêutron com carga negativa',
        choice3: 'partícula resultante de um decaimento alfa',
        choice4: 'partícula resultante de um decaimento beta',
        answer: 4,
    },{
        question: 'O que é o decaimento beta?',
        choice1: 'transformação de um núcleo em outro núcleo diferente com emissão de elétron ou dêuteron',
        choice2: 'transformação de um núcleo em outro núcleo diferente com emissão de próton ou dêuteron',
        choice3: 'transformação de um núcleo em outro núcleo diferente com emissão de elétron ou pósitron',
        choice4: 'fusão de dois núcleos com emissão de apenas neutrinos',
        answer: 3,
    },{
        question: 'Quais são as 4 interações(forças) fundamentais na natureza?',
        choice1: 'atrito - elétrica - forte - fraca',
        choice2: 'gravitacional - magnética - luminosa - fraca',
        choice3: 'gravitacional - eletromagnética - forte - fraca',
        choice4: 'atrito - eletromagnética - contato - à distância',
        answer: 3,
    },{
        question: 'Como ocorre o decaimento alfa?',
        choice1: 'transformação de um núcleo em outro núcleo diferente com emissão de um núcleo de hélio',
        choice2: 'transformação de um núcleo em outro núcleo diferente com emissão de próton ou dêuteron',
        choice3: 'fusão de dois núcleos com emissão de apenas 2 pósitrons',
        choice4: 'transformação de um núcleo em outro núcleo diferente com emissão de dois núcleos de hélios',
        answer: 1,
    },{
        question: 'Como ocorre a captura eletrônica, também chamada decaimento beta inverso?',
        choice1: 'elétrons capturam prótons para se transformarem em nêutrons',
        choice2: 'nêutrons capturam elétrons para se transformarem em prótons',
        choice3: 'prótons capturam elétrons para se transformarem em nêutrons',
        choice4: 'prótons capturam elétrons para se transformarem em dêuterons',
        answer: 3,
    },{
        question: 'xxxxxxxxxxxxxxxxxx?',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 4,
    },{
        question: 'Na carta de nuclídeos',
        choice1: '  ',
        choice2: ' ',
        choice3: ' ',
        choice4: '',
        answer: 3,
    },{
        question: 'Como ocorre a captura de nêutrons?',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        answer: 3,
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

        return window.location.assign('/interacoes/endinteracoes.html')
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