const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")

let gameLoopInterval = 0

const startGame = () => {
  gameOver.style.display = "none";
  background.classList.add("bg-animation")
  rock.classList.add("rock-animation")
  gameContainer.classList.remove("game-disabled")
  resetScore()
  startGameLoop()
}

const stopGame = () => {
  background.classList.remove("bg-animation")
  rock.classList.remove("rock-animation")
  gameContainer.classList.add("game-disabled")
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const resetScore = () => {
  const scoreNumber = parseInt(score.innerText)
  const highscoreNumber = parseInt(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
  }
  score.innerText = 0
}

const jump = () => {
  dino.classList.add("jump-animation")
  setTimeout(() => {
    dino.classList.remove("jump-animation")
  }, 500)
}

const die = () => {
  dino.classList.add("dino-dies")
  setTimeout(() => {
    dino.classList.remove("dino-dies")
  }, 500)
}

document.addEventListener('click', (event) => {
  if (!gameLoopInterval) {
    startGame()
  }
  else {
    if (!dino.classList.contains('jump-animation')) {
      jump()
    }
  }

})

const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'))

    score.innerText = Number(score.innerText) + 1

    if (rockLeft < 0) {
      rock.style.display = 'none'
    } else {
      rock.style.display = ''
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      die()
      gameOver.style.display = "block";
     
      stopGame()
      
    }
  }, 50)

}


