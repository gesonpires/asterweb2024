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
    // QUESTÃO 1
    {
        question: 'Uma estrela sofre contração gravitacional, quando ...',
        choice1: 'diminui sua massa',
        choice2: 'aumenta sua densidade',
        choice3: 'aumenta seu raio',
        choice4: 'fica mais fria',
        answer: 2,
    },
    // QUESTÃO 2
    {
        question: 'As explicações do movimento de planetas eram mais difíceis na antiguidade do que os movimentos do Sol e da lua, porque o(s)',
        choice1: 'planetas invertem seus movimentos',
        choice2: 'Sol e a Lua sempre estão em movimento retrógrado',
        choice3: 'planetas são mais fracos do que o Sol e a Lua',
        choice4: 'planetas se movem muito mais rápido que o Sol e a Lua',
        answer: 1,
    },
    // QUESTÃO 3
    {
        question: 'Qual equívoco fundamental tornou o modelo geocêntrico muito complicado?',
        choice1: 'O Sol está no centro do Universo.',
        choice2: 'Todos os corpos celestes se movem em combinações de círculos perfeitos.',
        choice3: 'O Sol é maior que a Terra.',
        choice4: 'As estrelas nunca se movem.',
        answer: 2,
    },
    // QUESTÃO 4
    {
        question: 'A descoberta de Galileu das Luas de Júpiter foi chocante porque mostrou àqueles que acreditavam que a Terra estava no centro do Universo que ...',
        choice1: 'as luas podem se mover em torno de um planeta em movimento.',
        choice2: 'era incomum ter apenas uma Lua, como na Terra.',
        choice3: 'a gravidade pode manter uma Lua em órbita.',
        choice4: 'Júpiter não se move.',
        answer: 1,
    },
    // QUESTÃO 5
    {
        question: 'As observações de manchas solares por Galileu desacreditaram os ensinamentos de Aristóteles porque mostraram',
        choice1: 'planetas se movem em epiciclos',
        choice2: 'planetas orbitam em torno do Sol',
        choice3: 'mudança nos céus',
        choice4: 'o Sol não é perfeitamente esférico',
        answer: 3,
    },
    // QUESTÃO 6
    {
        question: 'Newton explicou as leis de Kepler,',
        choice1: 'colocando fórmulas complicadas de Kepler em palavras que poderiam ser facilmente entendidas',
        choice2: 'dando-lhes uma base religiosa sólida.',
        choice3: 'mostrando matematicamente que os planetas se moviam de acordo com alguns princípios universais de movimento e gravidade.',
        choice4: 'por meio da "músicas das esferas"',
        answer: 3,
    },
    // QUESTÃO 7
    {
        question: 'No método científico, as observações (dados) são mais úteis para',
        choice1: 'testar previsões feitas por teorias.',
        choice2: 'fazer previsões.',
        choice3: 'teorias de prova.',
        choice4: 'geração de catálogos.',
        answer: 1,
    },
    // QUESTÃO 8
    {
        question: 'O melhor teste de uma hipótese científica é como ela',
        choice1: 'explica bem todas as observações conhecidas',
        choice2: 'é facilmente transcrita em notação matemática',
        choice3: 'simplesmente explica todas as observações conhecidas',
        choice4: 'prevê bem novas observações',
        answer: 4,
    },
    // QUESTÃO 9
    {
        question: 'As leis de Kepler são',
        choice1: 'descrições matemáticas dos movimentos planetários',
        choice2: 'teorias da formação do Universo',
        choice3: 'conceitos sobre buraco-negro',
        choice4: 'teorias para formação dos elementos químicos',
        answer: 1,
    },
    // QUESTÃO 10
    {
        question: 'De acordo com a lei da Gravitação Universal,',
        choice1: 'somente grandes massas atraem pequenos corpos',
        choice2: 'a força gravitacional depende das massas e da distância entre os corpos',
        choice3: 'a força gravitacional depende só da massa do corpo grande',
        choice4: 'força gravitacional e força magnética são idênticas',
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

        return window.location.assign('/gravitacao/endgravitacao.html')
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