$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 240



  const gameGridArray = []
  let occupiedArray = []







  function anyFalling() {
    console.log('> tetriSequence.length: '+ tetriSequence.length)
    console.log('Falling: '+tetriSequence[tetriSequence.length-1])
    if (tetriSequence.length === 0) {
      return false // New game coniditon
    } else if (tetriSequence[tetriSequence.length-1].tetriFalling) {
      return true
    } else {
      return false
    }
  }





  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      tetriSequence[(tetriSequence.length-1)].move(gameGridArray,'left')
      console.log('left')
      break
      case 38:
      clearInterval(gameLoop)
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





  function gameOver(){
    // console.log('Lowest value: '+ Math.min(...occupiedArray))
  }

  function listNonZero(gameGridArray) {
    occupiedArray = []
    for(var i=0; i < gameGridArray.length; i++){
      if (gameGridArray[i] != 0) {
        occupiedArray.push(i)
      }
    }
    console.log('Occupied: '+occupiedArray)
  }

  function clockTick() {
    console.log('--------------')
    if (anyFalling()=== false) {
      tetriNew()
    }

    gridClear()

    // for(var i=0; i < tetriSequence.length-1; i++) {
    //   console.log(i + ': '+tetriSequence[i].showLocation(gameGridArray))
    //   tetriSequence[i].draw(gameGridArray, $gridSquares)
    // }

    //Draw non-moving shapes
    // for(var i=0; i < tetriSequence.length-1; i++) {
    //   console.log(i + ': '+tetriSequence[i].showLocation(gameGridArray))
    //   tetriSequence[i].draw(gameGridArray, $gridSquares)
    // }
    //
    // //Draw moving shape
    // tetriSequence[tetriSequence.length-1].clearGridLocation(gameGridArray)
    // tetriSequence[tetriSequence.length-1].fall(gameGridArray)
    // tetriSequence[tetriSequence.length-1].draw(gameGridArray, $gridSquares)
    // listNonZero(gameGridArray)
    // gameOver()
  }

  console.log(gameGridArray)

  let gameLoop = setInterval(clockTick,1000)








})
