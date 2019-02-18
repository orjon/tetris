  const startPosition = 34

  let tetriCount = 0
  const tetriSequence = []

class Tetrimino {
  constructor(anchor){
    this.anchor = anchor
    this.falling = true
  }

  // fall(gameGridArray){
  //   for (let i=0; i<this.shape.length; i++) { //for each shape pixel
  //     let tempIndex = this.anchor+this.shape[i]
  //     if ((gameGridArray[tempIndex+10] === 0) && (tempIndex+10 >= 10) && this.falling){
  //       gameGridArray[this.anchor]=0 //declare empty
  //       this.anchor += 10
  //     } else {
  //       this.falling = false
  //     }
  //   }
  // }

  showLocation(gameGridArray){
    let tempArray = []
    for (let i=0; i<this.shape.length; i++) {
      tempArray.push(this.anchor+this.shape[i])
    }
    return `${tempArray}`
  }

  checkStop(gameGridArray){
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      let tempIndex = this.anchor+this.shape[i]+10

      if ((gameGridArray[tempIndex] === 0) && (tempIndex >= 10)){
        return 'FALLING'
        // return true
      }
    }
    return 'STOPPED'
    // return false
  }


  checkBelow(gameGridArray){
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      let indexBelow = this.anchor+this.shape[i]+10 //every pixel below
      if (indexBelow > 229) {
        return 'Touched bottom'
      }
      if (gameGridArray[indexBelow] === 1) {
        return 'Obstruction'
        // return true
      }
    }
    return 'Free to fall'
    // return false
  }



  // fall(gameGridArray){
  //   if ((gameGridArray[this.anchor+10] === 0) && (this.anchor+10 >= 10) && this.falling){
  //     gameGridArray[this.anchor]=0 //declare empty
  //     this.anchor += 10
  //   } else {
  //     this.falling = false
  //   }
  // }

  clearGridLocation(gameGridArray) {
    console.log('Clear grid location')
    let indexTemp = 0
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      indexTemp = this.anchor+this.shape[i] //every pixel below
      gameGridArray[indexTemp] = 0
    }
  }

  fall(gameGridArray){
    // let indexTemp = 0
    if ((gameGridArray[this.anchor+10] === 0) && (this.anchor+10 >= 10) && this.falling){
      // for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      //   indexTemp = this.anchor+this.shape[i] //every pixel below
      //   gameGridArray[indexTemp] = 0
      // }
      this.anchor += 10
    } else {
      this.falling = false
    }
  }



  move(gameGridArray, direction){
    console.log('Anchor: '+this.anchor)
    switch (direction) {
      case 'left':
      if (gameGridArray[this.anchor-1]===0){
        console.log(`${this.type} << Moving left`)
        gameGridArray[this.anchor]=0 //declare empty
        this.anchor--
      }
      break
      case 0:
      console.log(`${this.type} - Not Moving -`)
      break
      case 'right':
      if (gameGridArray[this.anchor+1]===0){
        console.log(`${this.type} Moving Right >>`)
        gameGridArray[this.anchor]=0 //declare empty
        this.anchor++
      }
      break
    }
  }
  draw(gameGridArray, $gridSquares) {
    // console.log('Anchor: '+this.anchor)
    // console.log('This shape length ' + this.shape.length)
    for (let i=0; i<this.shape.length; i++) {
      let tempIndex = (this.anchor+this.shape[i])
      gameGridArray[tempIndex]= 1 //fill in virtual grid
      if (tempIndex > 39) {
        $gridSquares.siblings().eq(tempIndex-40).addClass(`${this.color}`)
      }
    }
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
    this.color = 'red'
    this.shape = [0, -10, -9, 1]
  }
}

class TetriB extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'green'
    this.shape = [0,1,-9,-19]
  }
}

class TetriC extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'blue'
    this.shape = [0,-10,-20,-30]
  }
}

class TetriD extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'orange'
    this.shape = [0,1,2,-9]
  }
}

class TetriE extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'pink'
    this.shape = [0,-20,-10,1]
  }
}


class TetriF extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'cyan'
    this.shape = [0,1,-9,-8]
  }
}

class TetriG extends Tetrimino{
  constructor(anchor, falling){
    super(anchor, falling)
    this.color = 'purple'
    this.shape = [-10,-9,1,2]
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
