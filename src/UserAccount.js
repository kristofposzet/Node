'use strict';

const UNIT_RATE = 0.8;
class UserAccount {
  constructor() {
    this.paymentDates = [];
    this.services = [];
  }

  recalculateBalance() {
    for (const service of this.services) {
      const h = this.calculationHistoryService.retrieveHistory(service);
      let highestTariff = this.getHighestTariff(service, h);

      h.applyRecalculation(highestTariff, UNIT_RATE);
      this.balance.updateBalance(highestTariff);
    }
  }

  getHighestTariff(service, h) {
    const tariffs = service.getTariffs();
    let highestTariff = 0;
    if (tariffs.length) {
      for (const tariff of tariffs) {
        highestTariff = Math.max(
          highestTariff,
          this.calculateUnapplied(tariff, h.getAllFees(tariff, service))
        );
      }
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
        sum +=
          fees.get(date) * (tariff.getType().isUnitBased() ? UNIT_RATE : 1) +
          tariff.getAdditionalFee();
      }
    }
    return sum;
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
