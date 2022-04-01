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
        question: 'Numa estrela, em sua fase estável, há equilíbrio entre',
        choice1: 'a força gravitacional(para dentro) e a força da queima nuclear(para fora)',
        choice2: 'a força gravitacional(para fora) e a força da queima nuclear(para dentro)',
        choice3: 'a força nuclear forte(para fora) e a força nuclear fraca(para dentro)',
        choice4: 'a força nuclear forte(para dentro) e a força nuclear fraca(para fora)',
        answer: 1,
    },{
        question: 'O diagrama HR relaciona',
        choice1: 'luminosidade e distância em relação ao Sol',
        choice2: 'quantidade de hélio e quantidade de hidrogênio',
        choice3: 'pressão na superfície e pressão no núcleo',
        choice4: 'luminosidade e temperatura superficial',
        answer: 3,
    },{
        question: 'Para que uma estrela se transforme num buraco-negro, sua massa inicial deve possuir no',
        choice1: 'máximo 10 massas solares',
        choice2: 'mínimo 10 massas solares',
        choice3: 'máximo 25 massas solares',
        choice4: 'mínimo 25 massas solares',
        answer: 3,
    },{
        question: 'As estrelas muito pequenas são abundantes, pois',
        choice1: 'são as mais quentes',
        choice2: 'levam mais tempo para morrer',
        choice3: 'são as mais brilhantes',
        choice4: 'levam menos tempo para morrer',
        answer: 2,
    },{
        question: 'Apesar de uma anã branca ser pequena, ela é muito quente, já que',
        choice1: 'sua densidade é baixa o que diminui a contração gravitacional',
        choice2: 'sua densidade é baixa o que aumenta a contração gravitacional',
        choice3: 'sua densidade é alta o que diminui a velocidade da fusão nuclear',
        choice4: 'sua densidade é alta o que aumenta a contração gravitacional',
        answer: 4,
    },{
        question: 'A maioria das estrelas conhecidas está em qual posição do diagrama HR?',
        choice1: 'estrelas menores e mais quentes',
        choice2: 'sequência principal',
        choice3: 'estrelas maiores e mais brilhantes',
        choice4: 'estrelas maiores e mais quentes',
        answer: 2,
    },{
        question: 'Na sequência principal, as estrelas geram energia, convertendo',
        choice1: 'hidrogênio em hélio',
        choice2: 'hélio em hidrogênio',
        choice3: 'hélio em carbono',
        choice4: 'hélio em nitrogênio',
        answer: 1,
    },{
        question: 'Para estrelas na sequência principal, a reação de fusão termonuclear',
        choice1: 'transforma 4 átomos de hidrogênio em 4 átomos de hélio',
        choice2: 'transforma 4 átomos de hidrogênio em 1 átomo de hélio',
        choice3: 'transforma 4 átomos de hidrogênio em 4 átomos de hélio',
        choice4: 'transforma 4 átomos de hélio em 1 átomo de hidrogênio',
        answer: 2,
    },{
        question: 'Numa reação de fusão termonuclear para estrelas como o Sol, há liberação de energia porque',
        choice1: 'há excesso de energia de ligação quando dois núcleos pesados se combinam para formar um núcleo leve',
        choice2: 'o hidrogênio é mais leve que o hélio',
        choice3: 'o carbono é mais pesado que o hélio',
        choice4: 'há excesso de energia de ligação quando dois núcleos leves se combinam para formar um núcleo pesado',
        answer: 4,
    },{
        question: 'A queima de núcleos mais pesados do que o hidrogênio requer',
        choice1: 'a presença de mais átomos de hidrogênio',
        choice2: 'temperaturas cada vez maiores no núcleo da estrela',
        choice3: 'temperaturas cada vez menores no núcleo da estrela',
        choice4: 'densidades cada vez menores no núcleo da estrela',
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

        return window.location.assign('/vidaestelar/endvidaestelar.html')
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