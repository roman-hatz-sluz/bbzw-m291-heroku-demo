const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")
const startScreen = document.getElementById("startScreen")

let gameLoopInterval = 0

const startGame = () => {
  gameOver.style.display = "none";
  background.classList.add("bg-animation")
  rock.classList.add("rock-animation")
  startScreen.style.display = "none"
  resetScore()
  startGameLoop()
}



const resetScore = () => {
  score.innerText = 0
}

const jump = () => {
  dino.classList.add("jump-animation")
  setTimeout(() => {
    dino.classList.remove("jump-animation")
  }, 500)
}

const dieAnimation = () => {
  dino.classList.add("dino-dies")
  return new Promise(resolve => setTimeout(() => {
    dino.classList.remove("dino-dies")
    resolve()
  }, 500));

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

const stopGame = async () => {
  await dieAnimation()
  const scoreNumber = Number(score.innerText)
  const highscoreNumber = Number(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
    gameOver.style.display = "block";
  }
  background.classList.remove("bg-animation")
  rock.classList.remove("rock-animation")
  startScreen.style.display = "block"
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const setObstacleSpeed = (score, rockLeft) => {
  let rockSpeed = 2000 // Milliseconds
  rockSpeed = rockSpeed - score
  if (rockLeft === 550) {
    rock.style["-webkit-animation-duration"] = rockSpeed + "ms";
  }

}


const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'))

    score.innerText = Number(score.innerText) + 1

    setObstacleSpeed(Number(score.innerText), rockLeft)


    if (rockLeft < 0) {
      rock.style.display = 'none'
    } else {
      rock.style.display = ''
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame()
    }
  }, 50)

}


