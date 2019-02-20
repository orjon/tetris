class Tetrimino {
  constructor(tetriName){
    this.tetriName = tetriName
    this.tetriFalling = true
  }


  fellOnSomething() {
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      const gridLocationBelow = this.shape[i]+10 //every pixel below
      if (gridLocationBelow >= 240) {
        soundBump()
        return true //Hit bottom
      } else if (gridLocationsOccupied.includes(gridLocationBelow)) {
        soundBump()
        return true //Hit another block
      }
    }
    return false //Not hit anything
  }

  hitSomethingLeft() {
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      const gridLocationLeft = this.shape[i]-1 //every pixel below
      if (this.shape[i] % 10 === 0) {
        console.log('HIT LEFT')
        soundBump()
        return true //Hit left
      }
      if (gridLocationsOccupied.includes(gridLocationLeft)) {
        console.log('HIT OBJECT')
        soundBump()
        return true //Hit another block
      }
    }
    return false //Not hit anything
  }

  hitSomethingRight() {
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      const gridLocationRight = this.shape[i]+1 //every pixel below
      if ((this.shape[i]+1) % 10 === 0) {
        console.log('HIT RIGHT')
        soundBump()
        return true //Hit right
      }
      if (gridLocationsOccupied.includes(gridLocationRight)) {
        console.log('HIT OBJECT')
        soundBump()
        return true //Hit another block
      }
    }
    return false //Not hit anything
  }

  fall(){
    for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
      this.shape[i] += 10 //every pixel below
    }
    if (this.fellOnSomething()) {
      this.tetriFalling = false //stop block falling

      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        gridLocationsOccupied.push(this.shape[i]) //and to occupied list
      }
      gridLocationsOccupied.sort()
      console.log(`Occupied: ${gridLocationsOccupied}`)
    }
  }


  move(direction){
    gridClear()
    switch (direction) {
      case 37: //left
      if (!this.hitSomethingLeft()) {
        for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
          this.shape[i] -= 1 //every pixel below
        }
        soundNudge()
      }
      break

      case 38: //UP
      clearInterval(gameLoop)
      console.log(' - Not Moving -')
      break


      case 39: // right
      if (!this.hitSomethingRight()) {
        for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
          this.shape[i] += 1 //every pixel below
        }
        soundNudge()
      }
      break


      case 40: // down
      if (this.fellOnSomething()) {
        this.tetriFalling = false //stop block falling

        for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
          gridLocationsOccupied.push(this.shape[i]) //and to occupied list
        }
        gridLocationsOccupied.sort()
        console.log(`Occupied: ${gridLocationsOccupied}`)

      } else {
        console.log('vv Moving Down vv')
        for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
          this.shape[i] += 10 //every pixel below
        }
        soundNudge()

      }
      break
    }

    for (var i=0; i < tetriSequence.length; i++) {
      tetriSequence[i].drawTetri()
    }
  }

  drawTetri() {
    const gridLocations = []
    for (let i=0; i<this.shape.length; i++) {
      gridLocations.push(this.shape[i])
      const gridLocationShifted = this.shape[i]-gridShift
      if (gridLocationShifted >= 0) {
        $gridSquares.siblings().eq(gridLocationShifted).addClass(`${this.color}`)
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