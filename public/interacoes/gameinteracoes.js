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
let attempts = 2 // Adiciona a contagem de tentativas

let questions = [
    
    {
        question: 'O que é um pósitron?',
        choice1: 'elétron com carga positiva',
        choice2: 'próton com carga negativa',
        choice3: 'antimatéria do próton',
        choice4: 'antimatéria do neutrino',
        answer: 1,
        supportText: 'Dica: Um pósitron é a antipartícula do elétron, tendo a mesma massa, mas carga oposta.'
    },{
        question: 'O que é a interação fraca?',
    choice1: 'Força que mantém os elétrons em órbita ao redor do núcleo',
    choice2: 'Força que atua entre massas',
    choice3: 'Força responsável pelo decaimento beta',
    choice4: 'Força que mantém os quarks unidos dentro dos prótons e nêutrons',
    answer: 3,
    supportText: 'Dica: A interação fraca é responsável por processos como o decaimento beta.'
},{
        question: 'O que é um neutrino?',
        choice1: 'nêutron com carga positiva',
        choice2: 'nêutron com carga negativa',
        choice3: 'partícula resultante de um decaimento alfa',
        choice4: 'partícula resultante de um decaimento beta',
        answer: 4,
        supportText: 'Dica: Neutrinos são partículas neutras e muito leves, emitidas em processos de decaimento beta.'
    },{
        question: 'O que é o decaimento beta?',
        choice1: 'transformação de um núcleo em outro núcleo diferente com emissão de elétron ou dêuteron',
        choice2: 'transformação de um núcleo em outro núcleo diferente com emissão de próton ou dêuteron',
        choice3: 'transformação de um núcleo em outro núcleo diferente com emissão de elétron ou pósitron',
        choice4: 'fusão de dois núcleos com emissão de apenas neutrinos',
        answer: 3,
        supportText: 'Dica: O decaimento beta envolve a emissão de elétrons ou pósitrons quando um núcleo se transforma em outro.'
    },{
        question: 'Quais são as 4 interações(forças) fundamentais na natureza?',
        choice1: 'atrito - elétrica - forte - fraca',
        choice2: 'gravitacional - magnética - luminosa - fraca',
        choice3: 'gravitacional - eletromagnética - forte - fraca',
        choice4: 'atrito - eletromagnética - contato - à distância',
        answer: 3,
        supportText: 'Dica: As quatro forças fundamentais são: gravitacional, eletromagnética, forte e fraca.'
    },{
        question: 'Como ocorre o decaimento alfa?',
        choice1: 'transformação de um núcleo em outro núcleo diferente com emissão de um núcleo de hélio',
        choice2: 'transformação de um núcleo em outro núcleo diferente com emissão de próton ou dêuteron',
        choice3: 'fusão de dois núcleos com emissão de apenas 2 pósitrons',
        choice4: 'transformação de um núcleo em outro núcleo diferente com emissão de dois núcleos de hélios',
        answer: 1,
        supportText: 'Dica: No decaimento alfa, um núcleo pesado emite um núcleo de hélio (2 prótons e 2 nêutrons).'
    },{
        question: 'Como ocorre a captura eletrônica, também chamada decaimento beta inverso?',
        choice1: 'elétrons capturam prótons para se transformarem em nêutrons',
        choice2: 'nêutrons capturam elétrons para se transformarem em prótons',
        choice3: 'prótons capturam elétrons para se transformarem em nêutrons',
        choice4: 'prótons capturam elétrons para se transformarem em dêuterons',
        answer: 3,
        supportText: 'Dica: Na captura eletrônica, um próton no núcleo captura um elétron e se transforma em um nêutron.'
    },{
        question: 'O que é a interação forte?',
        choice1: 'Força que mantém os elétrons em órbita ao redor do núcleo',
        choice2: 'Força que mantém os quarks unidos dentro dos prótons e nêutrons',
        choice3: 'Força responsável pela atração gravitacional entre massas',
        choice4: 'Força responsável pelo decaimento beta dos núcleos',
        answer: 2,
        supportText: 'Dica: A interação forte mantém os quarks unidos dentro dos prótons e nêutrons.'
    },{
        question: 'O que é a interação eletromagnética?',
        choice1: 'Força que atua entre cargas elétricas',
        choice2: 'Força que atua entre massas',
        choice3: 'Força que atua apenas em nêutrons',
        choice4: 'Força que atua apenas em prótons',
        answer: 1,
        supportText: 'Dica: A interação eletromagnética atua entre partículas carregadas eletricamente.'
    
    },{
        question: 'O que é a interação gravitacional?',
        choice1: 'Força que atua entre massas',
        choice2: 'Força que mantém os quarks unidos dentro dos prótons e nêutrons',
        choice3: 'Força responsável pelo decaimento beta',
        choice4: 'Força que atua entre partículas carregadas eletricamente',
        answer: 1,
        supportText: 'Dica: A interação gravitacional é a força de atração que atua entre massas.'
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

        return window.location.assign('endinteracoes.html')
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
    attempts = 2; // Reseta as tentativas para a nova pergunta
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'incorrect') {
            attempts--;
            if (attempts > 0) {
                Swal.fire({
                    title: 'Resposta Incorreta!',
                    html: `<div class="swal-wide">
                                <div class="swal-text">
                                    Tentativas restantes: ${attempts}
                                    <br>
                                        <div class="swal-tip" style="margin-top: 20px;">
                                        ${currentQuestion.supportText}
                                        </div>
                                </div>
                            </div>`, // Uso de HTML para formatar o conteúdo
                    imageUrl: '../assets/img/error-10376.svg',
                    confirmButtonText: 'Tentar Novamente',
                    imageWidth: 80,
                    imageHeight: 80,
                    imageAlt: 'Ícone de erro customizado',
                    customClass: {
                        confirmButton: 'swal-button' // Aplica a classe swal-button ao botão
                    }
                });
                acceptingAnswers = true; // Permite que o usuário tente novamente
            } else {
                Swal.fire({
                    title: 'Sem mais tentativas!',
                    html: `<div class="swal-wide"><div class="swal-text">A resposta correta era: ${currentQuestion['choice' + currentQuestion.answer]}</div></div>`,
                    imageUrl: '../assets/img/error-10376.svg',
                    confirmButtonText: 'Próxima questão',
                    imageWidth: 80,
                    imageHeight: 80,
                    imageAlt: 'Ícone de erro customizado',
                    customClass: {
                        confirmButton: 'swal-button' // Aplica a classe swal-button ao botão
                    }
                }).then(() => {
                    getNewQuestion();
                });
            }
        } else if (classToApply === 'correct') {
            Swal.fire({
                title:'Correto!',
                html: `<div class="swal-wide"><div class="swal-text">Parabéns, você acertou!</div></div>`,
                html: `<div class="swal-text">Parabéns, você acertou!</div>`,
                imageUrl: '../assets/img/check-7050.svg',
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: 'Ícone de check customizado',
                customClass: {
                    confirmButton: 'swal-button' // Aplica a classe swal-button ao botão
                }    
            }).then(() => {
                incrementScore(SCORE_POINTS);
                getNewQuestion();
            })
        }

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};

startGame();