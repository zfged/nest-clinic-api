// class Car {
//     constructor(name,engine){
//         this._name = name
//         this._engine = engine
//     }

//     get name(){
//         return this._name
//     }

//     set name(name){
//         this._name = name
//     }

//     get engine(){
//         return this._engine
//     }

//     set engine(engine){
//         this._engine = engine
//     } 
// }

// Car.prototype.speed = 100
// Car.prototype.setSpeed = function (speed){
//     this.speed = speed
// }
// Car.prototype.getSpeed = function (){
//     return this.speed
// }

// const car = new Car('AUDI',3.0)
// car.setSpeed(300)
// console.log(car.speed)



const self = this
const arrow = () => {
    console.log(this === self)
}

function usual (){
    console.log(this === self)
}



