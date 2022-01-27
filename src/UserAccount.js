'use strict';

const UNIT_RATE = 0.8;
class UserAccount {
  constructor() {
    this.paymentDates = [];
    this.services = [];
  }

  recalculateBalance() {
    for (const service of this.services) {
      this.recalculateService(service);
    }
  }

  recalculateService(service) {
    const history = this.calculationHistoryService.retrieveHistory(service);
    this.payTariff(history, this.getHighestTariff(service, history));
  }

  payTariff(history, highestTariff) {
    history.applyRecalculation(highestTariff, UNIT_RATE);
    this.balance.updateBalance(highestTariff);
  }

  getHighestTariff(service, history) {
    const tariffs = service.getTariffs();
    let highestTariff = 0;
    for (const tariff of tariffs) {
      highestTariff = Math.max(
        highestTariff,
        this.calculateUnapplied(tariff, history.getAllFees(tariff, service))
      );
    }
    return highestTariff;
  }

  getLastCalculationDate() {
    let latest = UserAccount.EPOCH_TIMESTAMP;

    for (const p of this.paymentDates) {
      latest = Math.max(p.getTime(), latest);
    }
    return new Date(latest);
  }

  calculateUnapplied(tariff, fees) {
    let sum = 0;
    for (const date of fees.keys()) {
      if (date > this.getLastCalculationDate()) {
        sum += this.calculateFee(fees.get(date), tariff);
      }
    }
    return sum;
  }

  calculateFee(fee, tariff) {
    return fee * this.getRate(tariff) + tariff.getAdditionalFee();
  }

  getRate(tariff) {
    const isUnitBased = tariff.getType().isUnitBased();
    return isUnitBased ? UNIT_RATE : 1;
  }

  setCalculationHistoryService(calculationHistoryService) {
    this.calculationHistoryService = calculationHistoryService;
  }

  setServices(services) {
    this.services = services;
  }

  setBalance(balance) {
    this.balance = balance;
  }

  setPaymentDates(paymentDates) {
    this.paymentDates = paymentDates;
  }
}

UserAccount.EPOCH_TIMESTAMP = 0;

module.exports = { UserAccount };
