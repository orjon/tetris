/* eslint-disable no-unused-vars */


$(() => {

  console.log('hello')

const $gameGrid = $('#gameGrid')
  const $gridSquares = $('.square')
  const tetriSequence = []
  let   tetriCount = 0
  let gridLocationsOccupied = []
  const gameGridArray = []
  const gameSpeed = 250
  const gridShift = 40
  let tetriCurrent = []
  const gameGridTotal = 240
  const startPosition = 34
  let rowsToRemove = []
  let soundOn = false


  const soundMove = document.querySelector('.moveWav')
  const soundRotate = document.querySelector('.rotateWav')

  function soundBump() {
    if (!soundOn) {
      return
    }
    soundRotate.currentTime = 0
    soundRotate.playbackRate = 1
    soundRotate.play()
  }

  function soundNudge() {
    if (!soundOn) {
      return
    }
    soundMove.currentTime = 0
    soundMove.playbackRate = 1
    soundMove.play()
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
    }

    stopFalling() {
      this.isFalling = false //stop block falling
      soundBump()
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        if (!gridLocationsOccupied.includes(this.shape[i])){
          gridLocationsOccupied.push(this.shape[i])
        } //and to occupied list
      }
      gridLocationsOccupied.sort()
      console.log(`Occupied (more): ${gridLocationsOccupied}`)
    }


    fallOnSomething() {
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
          console.log('HIT LEFT')
          soundBump()
          return true //Hit left
        }
        if (gridLocationsOccupied.includes(gridLocationLeft)) {
          console.log('HIT OBJECT')
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
          console.log('HIT RIGHT')
          soundBump()
          return true //Hit right
        }
        if (gridLocationsOccupied.includes(gridLocationRight)) {
          console.log('HIT OBJECT')
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
          for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
            this.shape[i] -= 1 //every pixel below
          }
          soundNudge()
        }
        break

        case 38: //UP
        clearInterval(gameLoop)
        console.log(' - Not Moving -')
        break


        case 39: // right
        if (!this.hitSomethingRight()) {
          for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
            this.shape[i] += 1 //every pixel below
          }
          soundNudge()
        }
        break


        case 40: // down
        if (this.fallOnSomething()) {
          this.tetriFalling = false //stop block falling


        } else {
          console.log('vv Moving Down vv')
          for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
            this.shape[i] += 10 //every pixel below
          }
          soundNudge()

        }
        break
      }

      for (let i=0; i < tetriSequence.length; i++) {
        tetriSequence[i].drawTetri()
      }
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


  class TetriA extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'red'
      this.shape = [30, 20, 21, 31]
    }
  }

  class TetriB extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'green'
      this.shape = [30,31,21,11]
    }
  }

  class TetriC extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'blue'
      this.shape = [30,20,10,0]
    }
  }

  class TetriD extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'orange'
      this.shape = [30,31,21,32]
    }
  }

  class TetriE extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'pink'
      this.shape = [30,31,20,10]
    }
  }


  class TetriF extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'cyan'
      this.shape = [30,31,21,22]
    }
  }

  class TetriG extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'purple'
      this.shape = [31,32,20,21]
    }
  }



  function tetriNew() {
    let tetriBaby = 0
    // const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
    const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
    // console.log('New Tetrimino Type: '+ tetriNum)
    switch (tetriNum) {
      case 1:
        tetriBaby = new TetriA('a')
        break
      case 2:
        tetriBaby = new TetriB('b')
        break
      case 3:
        tetriBaby = new TetriC('c')
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
    tetriCurrent.move(e.which)
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


  for (let i=0; i < tetriSequence.length; i++) {
    tetriSequence[i].drawTetri()
  }

  function removeOccurances(array, element) {
    return array.filter(el => el !== element)
  }

  function dropRowsAbove(rowsToRemove) {
    console.log(`Occupied (current): ${gridLocationsOccupied}`)
    console.log('Row above dropper')
    for (let i=0; i<rowsToRemove.length; i++){ //loop through all removed lines
      console.log('Removing row: '+rowsToRemove[i])
      for (let j=0; j<tetriSequence.length; j++) { //loop through all blocks
        for (let k=0; k<tetriSequence[j].shape.length; k++) { //loop through all blocks
          if (tetriSequence[j].shape[k] < (rowsToRemove[i]*10)) {
            console.log('Removing index: '+tetriSequence[j].shape[k])
            // gridLocationsOccupied = removeOccurances(gridLocationsOccupied, tetriSequence[j].shape[k])
            tetriSequence[j].shape[k] += 10
          }
        }
      }
      for (let l=0; l<gridLocationsOccupied.length; l++) {
        gridLocationsOccupied[l] +=10
      }
      console.log(`Occupied (less): ${gridLocationsOccupied}`)
    }

  }

  function removeRows() {
    // console.log('Row remover....')
    for (let i=0; i<tetriSequence.length; i++){ //loop through all blocks
      // console.log('checking block: '+i)
      const numberPixels = tetriSequence[i].shape.length
      for (let j=numberPixels-1 ; j>=0; j--) {//loop through all block locations
        if (rowsToRemove.includes(Math.floor(tetriSequence[i].shape[j]/10))){
          console.log('Remove '+tetriSequence[i].shape[j])
          gridLocationsOccupied = removeOccurances(gridLocationsOccupied, tetriSequence[i].shape[j]) //Updates list of occupied spaces.
          tetriSequence[i].shape.splice(j,1)
        }
      } // finish each block
      // gridClear()
      tetriSequence[i].drawTetri()
    }
  }



  function checkRow(rowNumber) {
    // console.log('Checking row '+rowNumber)
    for (let j=0; j<10; j++) {    // Loop through all cells
      // console.log('Cell '+j)
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
      console.log('Completed rows: '+ rowsToRemove)
      removeRows()
      dropRowsAbove(rowsToRemove)
    } else {
      console.log('No rows to remove')
    }
  }






  function clockTick() {
    tetriCurrent.fallOnSomething()

    if (!tetriCurrent.isFalling) {
      checkFullRows()
      tetriNew(tetriCurrent)
    }

    gridClear()
    tetriCurrent.fall()

    // draws all block
    for (let i=0; i < tetriSequence.length; i++) {
      tetriSequence[i].drawTetri()
    }
  }



// createBoard()
console.log('make first')
tetriNew(tetriCurrent)
console.log('start')

  const gameLoop = setInterval(clockTick,gameSpeed)

})
