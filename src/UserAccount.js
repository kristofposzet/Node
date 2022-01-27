'use strict';

const UNIT_RATE = 0.8;
class UserAccount {
  constructor() {
    this.paymentDates = [];
    this.services = [];
  }

  recalculateBalance() {
    for (const service of this.services) {
      const tariffs = service.getTariffs();
      const h = this.calculationHistoryService.retrieveHistory(service);

      //find last calculation date
      let latest = UserAccount.EPOCH_TIMESTAMP;

      for (const p of this.paymentDates) {
        latest = Math.max(p.getTime(), latest);
      }
      const d = new Date(latest);

      let highestTariff = 0;
      if (tariffs.length) {
        for (const tariff of tariffs) {
          const tariffType = tariff.getType();
          highestTariff = Math.max(
            highestTariff,
            this.calculateUnapplied(tariff, d, h, tariffType, service)
          );
        }
      }

      h.applyRecalculation(highestTariff, UNIT_RATE);
      this.balance.updateBalance(highestTariff);
    }
  }

  calculateUnapplied(tariff, lastCalculationDate, h, t, service) {
    const fees = h.getAllFees(tariff, service);
    let sum = 0;

    for (const date of fees.keys()) {
      if (date > lastCalculationDate) {
        sum += fees.get(date) * (t.isUnitBased() ? UNIT_RATE : 1) + tariff.getAdditionalFee();
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
