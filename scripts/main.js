/* eslint-disable no-unused-vars */
$(() => {

  console.log('Welcome to Tetris')

  let gameNotStarted = true
  let gameEnded = false
  const $gameGrid = $('#gameGrid')
  const $gridSquares = $('.square')
  const tetriSequence = []
  let   tetriCount = 0
  let gridLocationsOccupied = []
  const gameGridArray = []
  let gameSpeed = 500
  const gridShift = 40
  let tetriCurrent = []
  const gameGridTotal = 240
  const startPosition = 34
  let rowsToRemove = []
  let soundOn = true
  let musicOn = true
  let gamePaused = false
  let looper = undefined
  let playerScore = 0

  const soundThemeWav  = document.querySelector('audio.theme')
  const soundNudgeWav  = document.querySelector('audio.nudge')
  const soundBumpWav   = document.querySelector('audio.bump')
  const soundRotateWav = document.querySelector('audio.rotate')
  const soundClear1Wav = document.querySelector('audio.clear1')
  const soundClear2Wav = document.querySelector('audio.clear2')
  const soundClear3Wav = document.querySelector('audio.clear3')
  const soundClear4Wav = document.querySelector('audio.clear4')

  soundThemeWav.src  = './sounds/theme-short2.mp3'
  soundNudgeWav.src  = './sounds/nudge.wav'
  soundBumpWav.src   = './sounds/bump.wav'
  soundRotateWav.src = './sounds/rotate.mp3'
  soundClear1Wav.src = './sounds/clear1.mp3'
  soundClear2Wav.src = './sounds/clear2.mp3'
  soundClear3Wav.src = './sounds/clear3.mp3'
  soundClear4Wav.src = './sounds/clear4.mp3'

  const $titleScreen = $('#titleScreen')
  const $gameScreen = $('main')
  const $buttonStart = $('#buttonStart')


  $buttonStart.on('click', function() {
    $buttonStart.attr('src','./images/buttonStartHover.png')
    $titleScreen.css('display','none')
    $gameScreen.css('display','flex')
    soundTheme()
    setTimeout(startGame,500)
  })


  $('.buttonExit').on('click', function(){
    location.reload()
  })
  $('.buttonPause').on('click', function(){
    gamePause()
  })
  $('.buttonMusic').on('click', function(){
    musicOn = !musicOn
    soundThemeWav.pause()
    soundTheme()
  })
  $('.buttonSound').on('click', function(){
    soundOn = !soundOn
  })

  function soundRowsCleared(numberOfRows) {
    if (!soundOn) {
      return
    }
    switch (numberOfRows) {
      case 1:
        soundClear1Wav.currentTime = 0
        soundClear1Wav.play()
        break
      case 2:
        soundClear2Wav.currentTime = 0
        soundClear2Wav.play()
        break
      case 3:
        soundClear3Wav.currentTime = 0
        soundClear3Wav.play()
        break
      case 4:
        soundClear4Wav.currentTime = 0
        soundClear4Wav.play()
        break
    }

  }


  function soundBump() {
    if (!soundOn) {
      return
    }
    soundBumpWav.currentTime = 0
    soundBumpWav.play()
  }

  function soundStop() {
    if (!soundOn) {
      return
    }
    soundBumpWav.currentTime = 0
    soundBumpWav.playbackRate = .7
    soundBumpWav.play()
  }

  function soundNudge() {
    if (!soundOn) {
      return
    }
    soundNudgeWav.currentTime = 0
    soundNudgeWav.play()
  }

  function soundSoftNudge() {
    if (!soundOn) {
      return
    }
    soundNudgeWav.currentTime = 0
    soundBumpWav.playbackRate = .5
    soundBumpWav.volumne = .2
    soundNudgeWav.play()
  }

  function soundRotate() {
    if (!soundOn) {
      return
    }
    soundRotateWav.currentTime = 0
    soundRotateWav.playbackRate = 1.5
    soundRotateWav.volume = 0.05
    soundRotateWav.play()
  }

  function soundTheme() {
    if (!musicOn) {
      return
    }
    soundThemeWav.loop = true
    soundThemeWav.play()
  }

  function gamePause(){
    if (!gamePaused) {
      soundThemeWav.pause()
      clearInterval(looper)
      console.log(' - Paused -')
      gamePaused = true
    } else {
      looper = setInterval(gameLoop,gameSpeed)
      if (musicOn) soundThemeWav.play()
      console.log(' - Resume -')
      gamePaused = false
    }
  }


  // function createBoard() {
  //   let gridNumbers = '' //40 //starting point for visible grid
  //   for (let i=0; i<20; i++){ //Create 20 rows of..
  //
  //     $('<div></div>').addClass('row').appendTo($gameGrid) //Divs with .row, with
  //   }
  //   for (let j=0; j<10; j++) {
  //     $('.row').append('<div>'+gridNumbers+'</div>') //10 Divs with gridNumbers++
  //     // gridNumbers++
  //   }
  //   $('#gameGrid .row').children().addClass('square') //
  // }


  class Tetrimino {
    constructor(tetriName){
      this.tetriName = tetriName
      this.isFalling = true
      this.rotation = 0
    }


    stopFalling() {
      this.isFalling = false //stop block falling
      soundStop()
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        if (!gridLocationsOccupied.includes(this.shape[i])){
          gridLocationsOccupied.push(this.shape[i])
        } //and to occupied list
      }
      gridLocationsOccupied.sort((a, b) => {
        return a-b
      })
      // console.log(`Occupied (more): ${gridLocationsOccupied}`)
    }


    willFallOnSomething() {
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        const gridLocationBelow = this.shape[i]+10 //every pixel below
        if (gridLocationBelow >= 240) {
          this.stopFalling()
          return true //Hit bottom
        } else if (gridLocationsOccupied.includes(gridLocationBelow)) {
          this.stopFalling()
          return true //Hit another block
        }
      }
      return false //Not hit anything
    }


    hitSomethingLeft() {
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        const gridLocationLeft = this.shape[i]-1 //every pixel below
        if (this.shape[i] % 10 === 0) {
          soundBump()
          playerScore -=1
          return true //Hit left
        }
        if (gridLocationsOccupied.includes(gridLocationLeft)) {
          soundBump()
          playerScore -=1
          return true //Hit another block
        }
      }
      return false //Not hit anything
    }


    hitSomethingRight() {
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        const gridLocationRight = this.shape[i]+1 //every pixel below
        if ((this.shape[i]+1) % 10 === 0) {
          soundBump()
          playerScore -=1
          return true //Hit right
        }
        if (gridLocationsOccupied.includes(gridLocationRight)) {
          soundBump()
          playerScore -=1
          return true //Hit another block
        }
      }
      return false //Not hit anything
    }


    fall(){
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        this.shape[i] += 10 //every pixel below
      }
    }


    move(direction){
      gridClear()
      switch (direction) {
        case 37: //left
          if (!this.hitSomethingLeft()) {
            soundNudge()
            for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
              this.shape[i] -= 1 //every pixel below
            }
          }
          break
        case 77: //m = music
          musicOn = !musicOn
          soundThemeWav.pause()
          if (musicOn) soundThemeWav.play()
          break
        case 80: //P for pause
          gamePause()
          break
        case 83: //s = sound
          soundOn = !soundOn
          break
        case 88: //x = sound
          location.reload()
          break
        case 39: // right
          if (!this.hitSomethingRight()) {
            soundNudge()
            for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
              this.shape[i] += 1 //every pixel below
            }
          }
          break
        case 40: // down
          if (this.willFallOnSomething()) {
            this.tetriFalling = false //stop block falling
          } else {
            soundNudge()
            for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
              this.shape[i] += 10 //every pixel below
            }
          }
          break
      }
      drawAll()
    }

    drawTetri() {
      const gridLocations = []
      for (let i=0; i<this.shape.length; i++) {
        gridLocations.push(this.shape[i])
        const gridLocationShifted = this.shape[i]-gridShift
        if (gridLocationShifted >= 0) {
          $gridSquares.siblings().eq(gridLocationShifted).addClass(`${this.color}`)
        }
      }
    }
  }

  function canRotate(currentPosition, rotationMatrix) {
    const rotatedPosition = []
    let onLeft = false
    let onRight = false
    for (let i=0; i<currentPosition.length; i++) {
      rotatedPosition.push(currentPosition[i]+rotationMatrix[i])
      if (rotatedPosition[i] >= 240) {
        soundBump()
        return false //Hit bottom
      }
      if (gridLocationsOccupied.includes(rotatedPosition[i])){
        soundBump()
        return false
      }
      if ((rotatedPosition[i] % 10) === 0) onLeft = true
      if (((rotatedPosition[i]+1) % 10) === 0) onRight = true
    }
    if (onLeft && onRight) {
      soundBump()
      return false
    }
    soundRotate()
    return true
  }

  class TetriA extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'red'
      this.shape = [35,34,25,24]
    }
    rotate(){
      soundRotate()
    }
  }

  class TetriB extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'green'
      this.shape = [34,35,25,15]
    }
    rotate(){
      let rotationMatrix = []
      this.rotation += 90
      if (this.rotation === 360) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [-2,11,0,-11]
          break
        case 90:
          rotationMatrix = [-20,-11,0,11]
          break
        case 180:
          rotationMatrix = [2,11,0,-11]
          break
        case 270:
          rotationMatrix = [20,-11,0,11]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 270
      }
      drawAll()
    }
  }

  class TetriC extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'blue'
      this.shape = [35,25,15,5]
    }

    rotate(){
      this.rotation += 90
      let rotationMatrix = []
      if (this.rotation === 360) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [11,0,-11,-22]
          break
        case 90:
          rotationMatrix = [-11,0,11,22]
          break
        case 180:
          rotationMatrix = [12,-9,0,-21]
          break
        case 270:
          rotationMatrix = [-12,9,0,21]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 270
      }
      drawAll()
    }
  }

  class TetriD extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'cyan'
      this.shape = [34,25,36,35]
    }
    rotate(){
      this.rotation += 90
      let rotationMatrix = []
      if (this.rotation === 360) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [0,0,-9,0]
          break
        case 90:
          rotationMatrix = [11,0,0,0]
          break
        case 180:
          rotationMatrix = [-11,20,0,0]
          break
        case 270:
          rotationMatrix = [0,-20,9,0]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 270
      }
      drawAll()
    }
  }


  class TetriE extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'pink'
      this.shape = [14,24,34,35]
    }
    rotate(){
      let rotationMatrix = []
      this.rotation += 90
      if (this.rotation === 360) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [-9,0,9,20]
          break
        case 90:
          rotationMatrix = [11,0,-11,-2]
          break
        case 180:
          rotationMatrix = [9,0,-9,-20]
          break
        case 270:
          rotationMatrix = [-11,0,11,2]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 270
      }
      drawAll()
    }
  }

  class TetriF extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'orange'
      this.shape = [24,33,34,25]
    }
    rotate(){
      let rotationMatrix = []
      this.rotation += 90
      if (this.rotation === 180) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [0,20,0,2]
          break
        case 90:
          rotationMatrix = [0,-20,0,-2]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 90
      }
      drawAll()
    }
  }

  class TetriG extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'purple'
      this.shape = [24,34,35,23]
    }
    rotate(){
      let rotationMatrix = []
      this.rotation += 90
      if (this.rotation === 180) this.rotation = 0
      switch (this.rotation) {
        case 0:
          rotationMatrix = [0,0,20,-2]
          break
        case 90:
          rotationMatrix = [0,0,-20,2]
          break
      }
      if (canRotate(this.shape, rotationMatrix)) {
        for (let i=0; i<this.shape.length; i++) {
          this.shape[i] += rotationMatrix[i]
        }
      } else {
        this.rotation -= 90
        if (this.rotation === -90) this.rotation = 90
      }
      drawAll()
    }
  }


  function tetriNew() {
    let tetriBaby = 0
    const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
    switch (tetriNum) {
      case 1:
        tetriBaby = new TetriC('c')
        break
      case 3:
        tetriBaby = new TetriA('a')
        break
      case 2:
        tetriBaby = new TetriB('b')
        break
      case 4:
        tetriBaby = new TetriD('d')
        break
      case 5:
        tetriBaby = new TetriE('e')
        break
      case 6:
        tetriBaby = new TetriF('f')
        break
      case 7:
        tetriBaby = new TetriG('g')
        break
    }
    tetriSequence.push(tetriBaby)
    tetriCurrent = tetriSequence[tetriSequence.length-1]
    tetriCount++
    console.log('Total Tetriminos: '+ tetriCount)
  }

  function increaseSpeed() {
    const newSpeed = 500 - (Math.floor(playerScore/1000)*100)
    if (!(newSpeed === gameSpeed)) {
      gameSpeed = newSpeed
      clearInterval(looper)
      looper = setInterval(gameLoop,gameSpeed)
    }
  }

  function updateScoreBoard() {
    $('#scoreBoard').html(`${playerScore}`)
    increaseSpeed()
  }

  $(document).keydown(function(e) { //keyup
    e.preventDefault() // prevent the default action (scroll / move caret)
    if (gameEnded) {
      location.reload()
    } else if (gameNotStarted) {
      gameNotStarted = !gameNotStarted
      $titleScreen.css('display','none')
      $gameScreen.css('display','flex')
      soundTheme()
      setTimeout(startGame,500)
    } else if (gamePaused) {
      e.which = 80
      tetriCurrent.move(e.which)
    } else if (e.which === 32) {
      tetriCurrent.rotate()
    } else {
      tetriCurrent.move(e.which)
    }
  })

  function gridClear(){
    $gridSquares.siblings().removeClass('red')
    $gridSquares.siblings().removeClass('green')
    $gridSquares.siblings().removeClass('blue')
    $gridSquares.siblings().removeClass('orange')
    $gridSquares.siblings().removeClass('cyan')
    $gridSquares.siblings().removeClass('pink')
    $gridSquares.siblings().removeClass('purple')
    $gridSquares.siblings().addClass('empty')
  }

  function drawAll() {
    gridClear()
    for (let i=0; i < tetriSequence.length; i++) {
      tetriSequence[i].drawTetri()
    }
  }

  function removeOccurances(array, element) {
    return array.filter(el => el !== element)
  }

  function dropRowsAbove(rowsToRemove) {
    for (let i=0; i<rowsToRemove.length; i++){ //loop through all removed lines
      for (let j=0; j<tetriSequence.length; j++) { //loop through all blocks
        for (let k=0; k<tetriSequence[j].shape.length; k++) { //loop through all blocks
          if (tetriSequence[j].shape[k] < (rowsToRemove[i]*10)) {
            tetriSequence[j].shape[k] += 10
          }
        }
      }
      for (let l=0; l<gridLocationsOccupied.length; l++) {
        if (gridLocationsOccupied[l]<(rowsToRemove[i]*10)) {
          gridLocationsOccupied[l] +=10
        }
      }
    }
  }

  function removeRows() {
    const tetriDead = []
    for (let i=0; i<tetriSequence.length; i++){ //loop through all blocks on grid
      const numberPixels = tetriSequence[i].shape.length
      for (let j=numberPixels-1 ; j>=0; j--) {//loop through all grid locations occupied by block (backwards)
        if (rowsToRemove.includes(Math.floor(tetriSequence[i].shape[j]/10))){
          gridLocationsOccupied = removeOccurances(gridLocationsOccupied, tetriSequence[i].shape[j]) //Updates list of occupied spaces.
          tetriSequence[i].shape.splice(j,1)
        }
      } // finish each block
      // gridClear()
      tetriSequence[i].drawTetri()
      if (tetriSequence[i].shape.length === 0) {
        tetriDead.push(i)
      }
    }
  }

  function checkRow(rowNumber) {
    for (let j=0; j<10; j++) {    // Loop through all cells
      if (!gridLocationsOccupied.includes(rowNumber*10+j)) {
        return false
      }
    }
    rowsToRemove.push(rowNumber)
    return true
  }

  function checkFullRows() {
    rowsToRemove = []
    let linesCounted = 0
    for (let i=4; i<24; i +=1) {
      if (checkRow(i)) {  //Loop through all rows
        linesCounted++
      }
    }
    if (rowsToRemove.length > 0) {
      removeRows()
      soundRowsCleared(rowsToRemove.length)
      dropRowsAbove(rowsToRemove)
    }
    switch (rowsToRemove.length) {
      case 1:
        playerScore +=90
        break
      case 2:
        playerScore +=240
        break
      case 3:
        playerScore +=490
        break
      case 4:
        playerScore +=990
        break
    }
  }

  function checkTopReached() {
    if (gridLocationsOccupied[0]<=40) {
      return true
    } else {
      return false
    }
  }

  function gameLoop() {
    // soundSoftNudge()
    tetriCurrent.willFallOnSomething()
    if (!tetriCurrent.isFalling) {
      checkFullRows()
      tetriNew(tetriCurrent)
      playerScore +=10
    }
    if (checkTopReached()) gameEnd()
    tetriCurrent.fall()
    drawAll()
    updateScoreBoard()
  }

  // createBoard()
  function startGame() {
    tetriNew(tetriCurrent)
    updateScoreBoard()
    looper = setInterval(gameLoop,gameSpeed)
  }


  function gameEnd() {
    gameEnded = true
    soundBump()
    gridClear()
    for (let i=0; i<gridLocationsOccupied.length; i++) {
      $gridSquares.siblings().eq((gridLocationsOccupied[i]-40)).addClass('grey')
    }

    soundThemeWav.pause()
    console.log('you lose!')
    clearInterval(looper)
  }
  //

})
