/* eslint-disable no-unused-vars */
$(() => {

  console.log('Welcome to Tetris')

  const $gameGrid = $('#gameGrid')
  const $gridSquares = $('.square')
  const tetriSequence = []
  let   tetriCount = 0
  let gridLocationsOccupied = []
  const gameGridArray = []
  const gameSpeed = 500
  const gridShift = 40
  let tetriCurrent = []
  const gameGridTotal = 240
  const startPosition = 34
  let rowsToRemove = []
  let soundOn = false
  let gamePaused = false

  const soundMoveWav = document.querySelector('.moveWav')
  const soundBumpWav = document.querySelector('.rotateWav')

  function soundBump() {
    if (!soundOn) {
      return
    }
    soundBumpWav.currentTime = 0
    soundBumpWav.playbackRate = 1
    soundBumpWav.play()
  }

  function soundNudge() {
    if (!soundOn) {
      return
    }
    soundMoveWav.currentTime = 0
    soundMoveWav.playbackRate = 1
    soundMoveWav.play()
  }

  function soundRotate() {
    if (!soundOn) {
      return
    }
    // soundRotateWav.currentTime = 0
    // soundRotateWav.playbackRate = 1
    // soundRotateWav.play()
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
      soundBump()
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
          return true //Hit left
        }
        if (gridLocationsOccupied.includes(gridLocationLeft)) {
          soundBump()
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
          return true //Hit right
        }
        if (gridLocationsOccupied.includes(gridLocationRight)) {
          soundBump()
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
        case 80: //P for pause
          if (!gamePaused) {
            clearInterval(looper)
            console.log(' - Paused -')
            gamePaused = true
          } else {
            looper = setInterval(gameLoop,gameSpeed)
            console.log(' - Resume -')
            gamePaused = false
          }
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

    destroy() {
      // tetriSequence = tetriSequence.filter( u => {
      //   return u.
      // })
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
      this.shape = [31,30,21,20]
    }
    rotate(){
      soundRotate()
    }
  }

  class TetriB extends Tetrimino{
    constructor(teriName, tetriFalling, rotation){
      super(teriName, tetriFalling, rotation)
      this.color = 'green'
      this.shape = [30,31,21,11]
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
      this.shape = [31,21,11,1]
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
      this.shape = [30,21,32,31]
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
      this.shape = [11,21,31,32]
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
      this.shape = [21,30,31,22]
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
      this.shape = [21,31,32,20]
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

  $(document).keydown(function(e) { //keyup
    e.preventDefault() // prevent the default action (scroll / move caret)
    if (gamePaused) {
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
    // for (let i=0; i<tetriDead.length; i++) {
    //   tetriSequence.splice(i,1)
    // }
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
      dropRowsAbove(rowsToRemove)
    }
  }

  function checkTopReached() {
    if (gridLocationsOccupied[0]<=40) {
      return true
    } else {
      return false
    }
  }

  function gameEnd() {
    clearInterval(looper)
    console.log('you lose!')
  }

  function gameLoop() {
    tetriCurrent.willFallOnSomething()
    if (!tetriCurrent.isFalling) {
      checkFullRows()
      tetriNew(tetriCurrent)
    }
    if (checkTopReached()) gameEnd()
    tetriCurrent.fall()
    drawAll()
  }

  // createBoard()
  tetriNew(tetriCurrent)

  let looper = setInterval(gameLoop,gameSpeed)
})
