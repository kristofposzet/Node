export class Car {
  constructor(manufacturer, model, year, isClassic) {
    this.manufacturer = manufacturer;
    this.model = model;
    this.year = year;
    //is car classic or not?
    this.isClassic = isClassic;
  }

  toString() {
    return `${this.manufacturer} ${this.model} [${this.year}] ${this.isClassic ? 'C' : 'S'}`;
  }
}
