const { Car } = require('./models/Car');
const { GarageService } = require('./GarageService');

const car = new Car('Volkswagen', 'Golf', 2002, false);
console.log(car.toString());
