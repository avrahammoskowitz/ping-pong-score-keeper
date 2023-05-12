const p1 = {
  score: 0,
  roundsWon: 0,
  button: document.querySelector('#p1Btn'),
  scoreDisplay: document.querySelector('#p1ScoreDisplay'),
  roundsDisplay: document.querySelector('#p1RoundsDisplay'),
}

const p2 = {
  score: 0,
  roundsWon: 0,
  button: document.querySelector('#p2Btn'),
  scoreDisplay: document.querySelector('#p2ScoreDisplay'),
  roundsDisplay: document.querySelector('#p2RoundsDisplay'),
}

const winningScoreSelect = document.querySelector('#playTo')
const bestOfSelect = document.querySelector('#bestOf')
const winByTwoSelect = document.querySelector('#winByTwo')
const resetGameBtn = document.querySelector('#reset')
const nextRoundBtn = document.querySelector('#nextRoundBtn')
let winningScore = 11
let bestOf = 3
let winningRound = 2
let isGameOver = false
let isWinByTwo = true

function updateScores(player, opponent) {
  if (!isGameOver) {
    // check if the game has ended
    player.score++ // add point to player score
    player.scoreDisplay.textContent = player.score // update display to reflect new score
    if (isWinByTwo && winningScore - opponent.score === 1) {
      // check if win by two is required
      winningScore++ // increase the points needed to win by 1 to ensure win by two is fulfilled
    }

    if (player.score === winningScore) {
      // check if a player has reached the winning score
      player.roundsWon++
      player.roundsDisplay.textContent = player.roundsWon
      winningScore = parseInt(winningScoreSelect.value)
      player.scoreDisplay.classList.add('winner') // mark the player as the winner of the round
      opponent.scoreDisplay.classList.add('loser') // mark the opponent as the loser of the round
      player.button.disabled = true // prevent any more points being added to the player
      opponent.button.disabled = true // prevent any more points being added to the opponent
      nextRoundBtn.style.display = 'block'
    }

    if (player.roundsWon === winningRound) {
      // check if player has won the final round
      isGameOver = true
      nextRoundBtn.style.display = 'none'
      player.roundsDisplay.classList.add('winner')
      opponent.roundsDisplay.classList.add('loser')
    }
  }
}

winningScoreSelect.addEventListener('change', () => {
  winningScore = parseInt(winningScoreSelect.value)
  resetGame()
})

bestOfSelect.addEventListener('change', () => {
  bestOf = parseInt(bestOfSelect.value)
  winningRound = Math.ceil(bestOf / 2)
  resetGame()
})

winByTwoSelect.addEventListener('change', () => {
  if (winByTwoSelect.checked) {
    isWinByTwo = true
  } else {
    isWinByTwo = false
  }
})

p1.button.addEventListener('click', () => {
  updateScores(p1, p2)
})

p2.button.addEventListener('click', () => {
  updateScores(p2, p1)
})

nextRoundBtn.addEventListener('click', nextRound)

resetGameBtn.addEventListener('click', resetGame)

function nextRound() {
  nextRoundBtn.style.display = 'none'
  for (let p of [p1, p2]) {
    p.score = 0
    p.scoreDisplay.textContent = 0
    p.button.disabled = false
    p.scoreDisplay.classList.remove('winner', 'loser')
  }
}

function resetGame() {
  isGameOver = false
  nextRoundBtn.style.display = 'none'
  winningScore = parseInt(winningScoreSelect.value)
  bestOf = parseInt(bestOfSelect.value)
  for (let p of [p1, p2]) {
    p.score = 0
    p.roundsWon = 0
    p.scoreDisplay.textContent = 0
    p.roundsDisplay.textContent = 0
    p.button.disabled = false
    p.scoreDisplay.classList.remove('winner', 'loser')
    p.roundsDisplay.classList.remove('winner', 'loser')
  }
}
