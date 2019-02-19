/* eslint-disable no-unused-vars */


$(() => {

  console.log('hello')

  const $gridSquares = $('.square')
  const tetriSequence = []
  let   tetriCount = 0
  const gridLocationsOccupied = []
  const gameGridArray = []
  const gameSpeed = 500
  const gridShift = 40
  let tetriCurrent = []
  const gameGridTotal = 240
  const startPosition = 34
  let rowsToRemove = []




  function clockTick() {
    // if (anyFalling() === false) {
    //   checkLines()
    //   tetriNew(tetriCurrent)
    // }

    // gridClear()
    // tetriSequence[tetriSequence.length-1].fall()
    //
    // // draws all block
    // for (var i=0; i < tetriSequence.length; i++) {
    //   tetriSequence[i].drawTetri()
    // }
  }


  const gameLoop = setInterval(clockTick,gameSpeed)

})
