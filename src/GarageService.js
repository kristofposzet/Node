'use strict';

class GarageService {
  constructor(garageCleaningService) {
    this.garageCleaningService = garageCleaningService;

    this.garagesList = new Map();
  }

  parkCarInFreeGarage(car) {
    const garages = car.isClassic ? GarageService.GARAGES1 : GarageService.GARAGES2;
    const garage = this.findFreeGarage(garages);

    if (!garage) {
      throw new Error('Free garage is not found');
    }

    this.wash(garage);
    this.parkWheels(garage, car);

    return garage;
  }

  wash(garage) {
    this.garageCleaningService.cleaning(garage);
  }

  parkWheels(g, c) {
    this.garagesList.set(g, c);
  }

  findFreeGarage(garages) {
    return garages.find((garage) => this.free(garage));
  }

  free(garageNumber) {
    return !this.garagesList.has(garageNumber);
  }
}

GarageService.SECURE_GARAGES = [1, 7];
GarageService.SIMPLE_GARAGES = [2, 3, 4, 5, 6];

module.exports = { GarageService };
