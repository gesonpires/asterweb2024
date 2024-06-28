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
    // QUESTÃO 1
    {
        question: 'Uma estrela sofre contração gravitacional quando ...',
        choice1: 'diminui sua massa',
        choice2: 'aumenta sua densidade',
        choice3: 'aumenta seu raio',
        choice4: 'fica mais fria',
        answer: 2,
        supportText: 'Dica: pense no que acontece dentro de uma estrela à medida que ela envelhece e exaure seu combustível nuclear.'

    },
    // QUESTÃO 2
    {
        question: 'Por que a gravidade é crucial no processo de nucleossíntese estelar?',
        choice1: 'Porque mantém os planetas em órbita ao redor da estrela',
        choice2: 'Porque é responsável por contrair o núcleo estelar, aumentando a temperatura e pressão',
        choice3: 'Porque impede a fuga de radiação da estrela',
        choice4: 'Porque evita que a estrela exploda',
        answer: 2,
        supportText: 'Dica: considere como a gravidade afeta o núcleo de uma estrela, facilitando reações nucleares.'
    },
    // QUESTÃO 3
    {
        question: 'Qual equívoco fundamental tornou o modelo geocêntrico muito complicado?',
        choice1: 'O Sol está no centro do Universo.',
        choice2: 'Todos os corpos celestes se movem em combinações de círculos perfeitos.',
        choice3: 'O Sol é maior que a Terra.',
        choice4: 'As estrelas nunca se movem.',
        answer: 2,
        supportText: 'Dica: pense sobre as formas geométricas usadas pelos antigos astrônomos para descrever as órbitas celestes.'
    },
    // QUESTÃO 4
    {
        question: 'A descoberta de Galileu das Luas de Júpiter foi chocante porque mostrou àqueles que acreditavam que a Terra estava no centro do Universo que ...',
        choice1: 'as luas podem se mover em torno de um planeta em movimento',
        choice2: 'era incomum ter apenas uma Lua, como na Terra',
        choice3: 'a gravidade pode manter uma Lua em órbita',
        choice4: 'Júpiter não se move',
        answer: 1,
        supportText: 'Dica: pense sobre como a descoberta de corpos orbitando outro planeta desafiou a visão geocêntrica.'
    },
    // QUESTÃO 5
    {
        question: 'As observações de manchas solares por Galileu desacreditaram os ensinamentos de Aristóteles porque mostraram',
        choice1: 'planetas se movem em epiciclos',
        choice2: 'planetas orbitam em torno do Sol',
        choice3: 'mudança nos céus',
        choice4: 'o Sol não é perfeitamente esférico',
        answer: 3,
        supportText: 'Dica: pense sobre a sequência de reações nucleares que ocorrem em uma estrela em evolução.'
    },
    // QUESTÃO 6
    {
        question: 'Newton explicou as leis de Kepler,',
        choice1: 'colocando fórmulas complicadas de Kepler em palavras que poderiam ser facilmente entendidas',
        choice2: 'dando-lhes uma base religiosa sólida.',
        choice3: 'mostrando matematicamente que os planetas se moviam de acordo com alguns princípios universais de movimento e gravidade.',
        choice4: 'por meio da "músicas das esferas"',
        answer: 3,
        supportText: 'Dica: pense sobre como Newton unificou a física terrestre e celestial.'
    },
    // QUESTÃO 7
    {
        question: 'No método científico, as observações (dados) são mais úteis para',
        choice1: 'testar previsões feitas por teorias.',
        choice2: 'fazer previsões.',
        choice3: 'teorias de prova.',
        choice4: 'geração de catálogos.',
        answer: 1,
        supportText: 'Dica: considere o papel das observações na validação ou refutação de teorias científicas.'
    },
    // QUESTÃO 8
    {
        question: 'O melhor teste de uma hipótese científica é como ela',
        choice1: 'explica bem todas as observações conhecidas',
        choice2: 'é facilmente transcrita em notação matemática',
        choice3: 'simplesmente explica todas as observações conhecidas',
        choice4: 'prevê bem novas observações',
        answer: 4,
        supportText: 'Dica: considere o objetivo principal de uma hipótese científica na previsão de novos resultados.'
    },
    // QUESTÃO 9
    {
        question: 'As leis de Kepler são',
        choice1: 'descrições matemáticas dos movimentos planetários',
        choice2: 'teorias da formação do Universo',
        choice3: 'conceitos sobre buraco-negro',
        choice4: 'teorias para formação dos elementos químicos',
        answer: 1,
        supportText: 'Dica: pense sobre como as órbitas dos planetas são descritas matematicamente.'
    },
    // QUESTÃO 10
    {
        question: 'De acordo com a lei da Gravitação Universal,',
        choice1: 'somente grandes massas atraem pequenos corpos',
        choice2: 'a força gravitacional depende das massas e da distância entre os corpos',
        choice3: 'a força gravitacional depende só da massa do corpo grande',
        choice4: 'força gravitacional e força magnética são idênticas',
        answer: 2,
        supportText: 'Dica: considere os fatores que influenciam a magnitude da força gravitacional entre dois corpos.'
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

        return window.location.assign('endgravitacao.html')
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
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

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
}

startGame();