const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")


const restartGame = () => {
  const scoreNumber = parseInt(score.innerText)
  const highscoreNumber = parseInt(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
  }
  score.innerText = 0
}
 
const jump = () => {
  dino.classList.add("jump-animation")
  setTimeout( () => { 
    dino.classList.remove("jump-animation")
    }, 500)
}

const die = () => {
  dino.classList.add("dino-dies")
  setTimeout( () => { 
    dino.classList.remove("dino-dies")
    }, 500)
}

document.addEventListener('keypress', (event) => {
  if (!dino.classList.contains('jump-animation')) {
    jump()
  }
})

window.setInterval(() => {
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
    restartGame()
  }
}, 50)
