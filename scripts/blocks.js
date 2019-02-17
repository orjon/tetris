class Tetrimino {
  constructor(type){
    this.type = type
  }
}


var tetrimino1 = new Tetrimino('TypeB')

console.log(tetrimino1)




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
