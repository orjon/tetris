const startPosition = 34

const tetriSequence = []
let tetriCount = 0

class Tetrimino {
  constructor(tetriName){
    this.tetriName = tetriName
    this.tetriFalling = true
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
        $gridSquares.siblings().eq(tempIndex).addClass(`${this.color}`)
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
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'red'
    this.shape = [30, 20, 21, 31]
  }
}

class TetriB extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'green'
    this.shape = [30,31,21,11]
  }
}

class TetriC extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'blue'
    this.shape = [30,20,10,0]
  }
}

class TetriD extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'orange'
    this.shape = [30,31,21,32]
  }
}

class TetriE extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'pink'
    this.shape = [30,31,20,10]
  }
}


class TetriF extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'cyan'
    this.shape = [30,31,21,22]
  }
}

class TetriG extends Tetrimino{
  constructor(teriName, tetriFalling){
    super(teriName, tetriFalling)
    this.color = 'purple'
    this.shape = [31,32,20,21]
  }
}



function tetriNew() {
  let tetriBaby = 0
  const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
  console.log('New Tetrimino No: '+ tetriNum)
  switch (tetriNum) {
    case 1:
    tetriBaby = new TetriA('A')
    // tetriBaby = new TetriA(`tetri${tetriCount}`)
    break
    case 2:
    tetriBaby = new TetriB('b')
    break
    case 3:
    tetriBaby = new TetriC('c')
    break
    case 4:
    tetriBaby = new TetriD('d')
    break
    case 5:
    tetriBaby = new TetriE('e')
    break
    case 6:
    tetriBaby = new TetriF('f')
    break
    case 7:
    tetriBaby = new TetriG('h')
    break
  }
  console.log(tetriBaby)
  tetriSequence.push(tetriBaby)
  console.log('Tetri Seq: '+tetriSequence)
  tetriCount++
  console.log('Number of Tetriminos: '+ tetriCount)
}
