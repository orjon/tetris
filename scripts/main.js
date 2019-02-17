$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 200


  const tetriSequence = [tetri001,tetri002,tetri003]
  const gameGridArray = []
  //

  function linearArray(array, length, defaultValue){
    for(var i=0; i < length; i++){
      array.push(defaultValue)
    }
  }

  linearArray(gameGridArray,gameGridTotal,0)

  function clockTick() {
    console.log(tetriSequence)
    for(var i=0; i < tetriSequence.length; i++){
      tetriSequence[i].move(0)
      // console.log('TetriSequence: '+tetriSequence[i].type)
      tetriSequence[i].draw(gameGridArray, $gridSquares)
    }




  }

  gameGridArray[45]=1
  gameGridArray[3]=1
  gameGridArray[9]=1
  gameGridArray[18]=1
  gameGridArray[7]=1

  // //
  // // matrix(gameMatrix,20,10,0)
  //
  // // console.log(gameMatrix)
  // // confirm('Press a button')
  // fillGrid(gameArray)
  console.log(gameGridArray)

  //
  setInterval(clockTick,1000)


})
