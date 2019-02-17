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
      this.anchor--
      break
      case 0:
      console.log(`${this.type} - Not Moving -`)
      break
      case 1:
      console.log(`${this.type} Moving Right >>`)
      this.anchor++
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


// var tetri001 = new TetriA(0,'red')
// var tetri002 = new TetriB(45,'green')
// var tetri003 = new TetriC(48,'blue')
// var tetri004 = new TetriD(18,'orange')
// var tetri005 = new TetriA(65,'red')
// var tetri006 = new TetriB(61,'green')
// var tetri007 = new TetriC(104,'blue')
// var tetri008 = new TetriD(4,'orange')


// new TetriD(18,'orange')
// new TetriA(65,'red')
// new TetriB(61,'green')
// new TetriC(104,'blue')
// new TetriD(4,'orange')
