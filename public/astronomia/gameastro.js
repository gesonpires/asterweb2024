<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Astronomia</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/astronomia/gameastro.css">
    
</head>
<body>
    <div class="container">
        <div id="game" class="justify-center flex-column">

            <div id="categoria" class="categoria">
                    <div id="titulo" class="titulo">
                        <p>Astronomia</p>
                    </div>    
            </div>
            <div id="hud">
                
                <div class="hud-item">
                    <p id="progressText" class="hud-prefix">
                        Questão
                    </p>
                    <div id="progressBar">
                        <div id="progressBarFull"></div>
                    </div>
                </div>
                                
                <div class="hud-item">
                    <p class="hud-prefix">
                        Escore
                    </p>
                    <h1 class="hud-main-text" id="score">
                        0
                    </h1>
                </div>
            </div>
            <h1 id="question">O que é uma estrela?</h1>
            <div class="choice-container">
                <p class="choice-prefix">A</p>
                <p class="choice-text" data-number="1">alternativa 1</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">B</p>
                <p class="choice-text" data-number="2">alternativa 2</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">C</p>
                <p class="choice-text" data-number="3">alternativa 3</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">D</p>
                <p class="choice-text" data-number="4">alternativa 4</p>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
    <script src="/astronomia/gameastro.js"></script>
</body>
</html>
