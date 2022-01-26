export class Car {
  constructor(sManufacturer, sModel, iYear, clsscCr) {
    this.sManufacturer = sManufacturer;
    this.sModel = sModel;
    this.iYear = iYear;
    //is car classic or not?
    this.clsscCr = clsscCr;
  }

  toString() {
    return `${this.sManufacturer} ${this.sModel} [${this.iYear}] ${this.clsscCr ? 'C' : 'S'}`;
  }
}
