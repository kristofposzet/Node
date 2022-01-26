'use strict';

class GarageService {
  constructor(garageCleaningService) {
    this.garageCleaningService = garageCleaningService;

    this.garagesWithCar = new Map();
  }

  parkCarInFreeGarage(car) {
    const garages = car.isClassic ? GarageService.GARAGES1 : GarageService.GARAGES2;
    const garage = this.findFreeGarage(garages);

    if (!garage) {
      throw new Error('Free garage is not found');
    }

    this.clean(garage);
    this.parkWheels(garage, car);

    return garage;
  }

  clean(garage) {
    this.garageCleaningService.clean(garage);
  }

  parkWheels(g, c) {
    this.garagesWithCar.set(g, c);
  }

  findFreeGarage(garages) {
    return garages.find((garage) => this.isFree(garage));
  }

  isFree(garageNumber) {
    return !this.garagesWithCar.has(garageNumber);
  }
}

GarageService.SECURE_GARAGES = [1, 7];
GarageService.SIMPLE_GARAGES = [2, 3, 4, 5, 6];

module.exports = { GarageService };
