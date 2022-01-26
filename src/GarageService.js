'use strict';

export class GarageService {
  constructor(serviceToCleanGarage) {
    this.srv = serviceToCleanGarage;

    this.garagesList = new Map();
  }

  parkCarInFreeGarage(pCar) {
    const garages = pCar.clsscCr ? GarageService.GARAGES1 : GarageService.GARAGES2;
    const g = this.someoneHasFreeSpace(garages);

    if (!g) {
      throw new Error('Free garage is not found');
    }

    this.wash(g);
    this.parkWheels(g, pCar);

    return g;
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
