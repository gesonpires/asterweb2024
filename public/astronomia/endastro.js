function sanitizeString(str) {
    return str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "").trim();
}

const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const sanitizedUsername = sanitizeString(username.value);
<<<<<<< HEAD

=======
    
>>>>>>> 27411ab603d6e83bcb131027ef3352d3c486142a
    const score = {
        score: mostRecentScore,
        name: username.value
    }
    
    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/astronomia/highscoresastro.html')
}
