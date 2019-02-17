$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 200

  let tetriCount = 0
  const tetriSequence = []
  const gameGridArray = []

  function anyFalling() {
    console.log('tetriSequence.length: '+ tetriSequence.length)
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
      temp = new TetriA(0,'red')
      break
      case 2:
      temp = new TetriB(1,'green')
      break
      case 3:
      temp = new TetriC(2,'blue')
      break
      case 4:
      temp = new TetriD(3,'orange')
      break
      case 5:
      temp = new TetriA(4,'red')
      break
      case 6:
      temp = new TetriB(5,'green')
      break
      case 7:
      temp = new TetriC(6,'blue')
      break
    }
    tetriSequence.push(temp)
    tetriCount++
    console.log('Number of Tetriminos: '+ tetriCount)
  }

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      tetriSequence[(tetriSequence.length-1)].move(-1)
      console.log('left')
      break
      case 38:
       // up
      console.log('up')
      break
      case 39: // right
      tetriSequence[tetriSequence.length-1].move(1)
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
    console.log('=========')
    console.log(tetriSequence)
    if (anyFalling()=== false) {
      tetriNew()
    }

    // console.log(tetriSequence)
    gridClear()
    for(var i=0; i < tetriSequence.length; i++){
      tetriSequence[i].fall(gameGridArray)
      tetriSequence[i].draw(gameGridArray, $gridSquares)

      // console.log('TetriSequence: '+tetriSequence[i].type)
    }




  }

  console.log(gameGridArray)


  setInterval(clockTick,100)


})
