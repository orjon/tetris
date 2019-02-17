class Tetrimino {
  constructor(anchor){
    this.anchor = anchor
    this.falling = true
  }
  fall(gameGridArray){

    if ((gameGridArray[this.anchor+10] === 0) && (this.anchor+10 >= 10) && this.falling){
      gameGridArray[this.anchor]=0
      // console.log('falling...')
      this.anchor += 10
    } else {
      this.falling = false
    }
  }
  move(direction){
    switch (direction) {
      case -1:
      console.log(`${this.type} << Moving left`)
      break
      case 0:
      console.log(`${this.type} - Not Moving -`)
      break
      case 1:
      console.log(`${this.type} Moving Right >>`)
      break
    }
  }
  draw(gameGridArray, $gridSquares) {
    gameGridArray[this.anchor] = 1
    $gridSquares.siblings().eq(this.anchor).addClass(`${this.color}`)
  }
  destroy() {
    // tetriSequence = tetriSequence.filter( u => {
    //   return u.
    // })
  }

}


class TetriA extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.type = 'TetriA'
    this.color = 'red'
    this.shape = [
      [1,1],
      [1,1]
    ]
  }


}

class TetriB extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.type = 'TetriB'
    this.color = 'green'
    this.shape = [1,1,1,1]
  }
}

class TetriC extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.type = 'TetriC'
    this.color = 'blue'
    this.shape = [
      [1,1]
    ]
  }
}

class TetriD extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.type = 'TetriD'
    this.color = 'orange'
    this.shape = [
      [1,1]
    ]
  }
}


var tetri001 = new TetriA(0,'red')
var tetri002 = new TetriB(45,'green')
var tetri003 = new TetriC(48,'blue')
var tetri004 = new TetriD(18,'orange')
var tetri005 = new TetriA(65,'red')
var tetri006 = new TetriB(61,'green')
var tetri007 = new TetriC(104,'blue')
var tetri008 = new TetriD(4,'orange')


function tetriNew() {
  const tetriNum = (Math.floor(Math.random() * 7)+1) //find random mole
  console.log(tetriNum)
}

//
// function fillGrid(array) {
//   for (let i=0; i<gameGridTotal; i++){
//     switch (array[i]) {
//       case 0:
//       // $gridSquares.siblings().eq(i).removeClass('.fillRed')
//       // console.log('Found 0 @: '+i)
//         $gridSquares.siblings().eq(i).addClass('empty')
//         break
//       case 1:
//       // console.log('Found 1 @: '+i)
//         $gridSquares.siblings().eq(i).addClass('fillRed')
//         break
//     }
//   }
// }
//
//
// function gravity(){
//   console.log('GRAVITY LOOP')
//   // console.log('gravity test range: '+(gameArray.length - 11) + ' to '+0)
//   // for (let i = gameArray.length - 11; i >= 0; --i){
//   //
//   //   // console.log('gameArray i: '+i+ ' +10: ' +(i+10))
//   //   if ((gameArray[i] === 1) && (gameArray[i+10] === 0 )) {
//   //     console.log('Block: '+i +' moved to '+ (i+10))
//   //     gameArray[i] = 0
//   //     gameArray[i+10] = 1
//   //
//   //   } else {
//   //     console.log('else')
//   //   }
//   // }
//   fillGrid(gameArray)
// }


//
