class TetriA {
  constructor(type, anchor){
    this.type = type
    this.anchor = anchor
    this.shape = [
      [1,1],
      [1,1]
    ]
  }
  fall(){
    console.log('falling...')
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
    $gridSquares.siblings().eq(this.anchor).addClass('fillRed')
  }

}

class TetriB {
  constructor(type, anchor){
    this.type = type
    this.anchor = anchor
    this.shape = [1,1,1,1]
  }
  fall(){
    console.log('falling...')
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
    $gridSquares.siblings().eq(this.anchor).addClass('fillGreen')
  }
}

class TetriC {
  constructor(type, anchor){
    this.type = type
    this.anchor = anchor
    this.shape = [
      [1,1,1,1]
    ]
  }
  fall(){
    console.log('falling...')
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
    $gridSquares.siblings().eq(this.anchor).addClass('fillBlue')
  }

}


var tetri001 = new TetriA('TypeA', 0)
var tetri002 = new TetriB('TypeB', 45)
var tetri003 = new TetriC('TypeC', 18)




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
//
// class Tetrimino { // eslint-disable-line no-unused-vars
//   constructor(color, shape) {
//     this.color = color
//     this.shape = shape
//   }
//   rotate() {
//   console.log(`${this.name}`)
//   }
//
//   fall() {
//
//   }
//
// }
//
// class Cube extends Tetrimino { // eslint-disable-line no-unused-vars
//   constructor(color) {
//     super(color, [
//       { row: -1, col: -1 },
//       { row: -1, col: 1 },
//       { row: 1, col: -1 },
//       { row: 1, col: 1 }
//     ])
//   }
// }
//
//
//
// class User {
//
//   constructor(name) {
//     this.name = name;
//   }
//
//   sayHi() {
//     alert(this.name);
//   }
