$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 240
  const startPosition = 34

  let tetriCount = 0
  const tetriSequence = []
  const gameGridArray = []

  function anyFalling() {
    // console.log('tetriSequence.length: '+ tetriSequence.length)
    if (tetriSequence.length === 0) {
      return false
    } else if (tetriSequence[tetriSequence.length-1].falling) {
      return true
    } else {
      return false
    }
  }



  function tetriNew() {
    let temp = 0
    const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
    console.log('New Tetrimino No: '+ tetriNum)
    switch (tetriNum) {
      case 1:
      temp = new TetriA(startPosition)
      break
      case 2:
      temp = new TetriB(startPosition)
      break
      case 3:
      temp = new TetriC(startPosition)
      break
      case 4:
      temp = new TetriD(startPosition)
      break
      case 5:
      temp = new TetriE(startPosition)
      break
      case 6:
      temp = new TetriF(startPosition)
      break
      case 7:
      temp = new TetriG(startPosition)
      break
    }
    tetriSequence.push(temp)
    tetriCount++
    // console.log('Number of Tetriminos: '+ tetriCount)
  }

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      tetriSequence[(tetriSequence.length-1)].move(gameGridArray,'left')
      console.log('left')
      break
      case 38:
      // up
      console.log('up')
      break
      case 39: // right
      tetriSequence[tetriSequence.length-1].move(gameGridArray,'right')
      console.log('right')
      break
      case 40: // down
      console.log('down')
      break
      default: return // exit this handler for other keys
    }
    e.preventDefault() // prevent the default action (scroll / move caret)
  })


  function linearArray(array, length, defaultValue){
    for(var i=0; i < length; i++){
      array.push(defaultValue)
    }
  }

  linearArray(gameGridArray,gameGridTotal,0)

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

  function clockTick() {
    console.log('--------------')
    if (anyFalling()=== false) {
      tetriNew()
    }

    gridClear()

    for(var i=0; i < tetriSequence.length; i++){
      console.log(i + ': '+tetriSequence[i].showLocation(gameGridArray))
console.log(gameGridArray)
      console.log(tetriSequence[i].checkBelow(gameGridArray))
      tetriSequence[i].fall(gameGridArray)
      tetriSequence[i].draw(gameGridArray, $gridSquares)
      // console.log(tetriSequence[i].showLocation(gameGridArray))
    }
  }

  console.log(gameGridArray)

  setInterval(clockTick,200)


})
