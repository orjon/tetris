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



  function createBoard() {
    let gridNumbers = '' //40 //starting point for visible grid
    for (let i=0; i<20; i++){ //Create 20 rows of..

      $('<div></div>').addClass('row').appendTo('#gameGrid') //Divs with .row, with
    }
    for (let j=0; j<10; j++) {
      $('.row').append('<div>'+gridNumbers+'</div>') //10 Divs with gridNumbers++
      // gridNumbers++
    }
    $('#gameGrid .row').children().addClass('square') //
  }

createBoard()


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
