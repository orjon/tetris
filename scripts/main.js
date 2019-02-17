$(() => {

  console.log('hello')

  const $gridSquares = $('.square')

  //
  // const gameGridWidth = 10
  // const gameGridHeight = 20
  const gameGridTotal = 210

  // const gameMatrix = []
  const gameArray = []
  //


  // function matrix (array, rows, cols, defaultValue){
  //   // Creates all lines:
  //   for(var i=0; i < rows; i++){
  //     // Creates an empty line
  //     array.push([])
  //     // Adds cols to the empty line:
  //     array[i].push( new Array(cols))
  //     for(var j=0; j < cols; j++){
  //       // Initializes:
  //       array[i][j] = defaultValue
  //     }
  //   }
  // }


  function linearArray(array, length, defaultValue){
    for(var i=0; i < length; i++){
      array.push(defaultValue)
    }
  }

  function fillGrid(array) {
    for (let i=0; i<gameGridTotal; i++){
      switch (array[i]) {
        case 0:
        // $gridSquares.siblings().eq(i).removeClass('.fillRed')
        $gridSquares.siblings().eq(i).addClass('empty')

        break
        case 1:
        console.log('Found 1 @: '+i)

        $gridSquares.siblings().eq(i).addClass('fillRed')
        break
      }
    }
  }


  function gravity(){
    console.log('GRAVITY LOOP')
    // console.log('gravity test range: '+(gameArray.length - 11) + ' to '+0)
    for (let i = gameArray.length - 11; i >= 0; --i){

      // console.log('gameArray i: '+i+ ' +10: ' +(i+10))
      if ((gameArray[i] === 1) && (gameArray[i+10] === 0 )) {
        console.log('Block: '+i +' moved to '+ (i+10))
        gameArray[i] = 0
        gameArray[i+10] = 1

      } else {
        console.log('else')
      }
    }
    fillGrid(gameArray)
  }





  // matrix(gameArray,1,gameGridTotal,'0')
  linearArray(gameArray,gameGridTotal,0)

  for (let i = 200; i < 210; i++) {
    console.log('Filling array '+i + ' with null')
    gameArray[i] = null
  }
  gameArray[45]=1
  gameArray[3]=1
  gameArray[9]=1
  gameArray[18]=1
  gameArray[7]=1

  // //
  // // matrix(gameMatrix,20,10,0)
  //
  // // console.log(gameMatrix)
  // // confirm('Press a button')
  // fillGrid(gameArray)
  console.log(gameArray)

  //
  setInterval(gravity,500)


})
