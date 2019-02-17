$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 200


  const tetriSequence = [tetri001,tetri002,tetri003, tetri004, tetri005, tetri006, tetri007, tetri008]
  const gameGridArray = []


  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        console.log('left')
        break
      case 38: // up
        console.log('up')
        break
      case 39: // right
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
    $gridSquares.siblings().addClass('empty')
  }



  function clockTick() {
    tetriNew()
    // console.log(tetriSequence)
    gridClear()
    for(var i=0; i < tetriSequence.length; i++){
      tetriSequence[i].fall(gameGridArray)
      tetriSequence[i].draw(gameGridArray, $gridSquares)

      // console.log('TetriSequence: '+tetriSequence[i].type)
    }




  }

  console.log(gameGridArray)


  setInterval(clockTick,250)


})
