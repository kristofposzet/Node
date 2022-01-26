'use strict';

class GarageService {
  constructor(serviceToCleanGarage) {
    this.srv = serviceToCleanGarage;

    this.garagesList = new Map();
  }

  parkCarInFreeGarage(car) {
    const garages = car.isClassic ? GarageService.GARAGES1 : GarageService.GARAGES2;
    const garage = this.someoneHasFreeSpace(garages);

    if (!garage) {
      throw new Error('Free garage is not found');
    }

    this.wash(garage);
    this.parkWheels(garage, car);

    return garage;
  }

  wash(garage) {
    this.srv.cleaning(garage);
  }

  parkWheels(g, c) {
    this.garagesList.set(g, c);
  }

  someoneHasFreeSpace(garageNumbersToCheckAreTheyPotentiallyFree) {
    return garageNumbersToCheckAreTheyPotentiallyFree.find((garageNumberToCheckIfItsFree) =>
      this.free(garageNumberToCheckIfItsFree)
    );
  }

  free(garageNumber) {
    return !this.garagesList.has(garageNumber);
  }
}

GarageService.GARAGES1 = [1, 7]; // more secure garages
GarageService.GARAGES2 = [2, 3, 4, 5, 6];

module.exports = { GarageService };
