'use strict'

class ChartModel {
  constructor() {
    this.exchangeRates = {
      dollar: 67.05,
      euro: 74.67
    };

    this.data = [];
    this.maxRateChange = 1.5;
  }

  generateData(numberOfDays) {
    for (let day = this.data.length; day < numberOfDays; day++) {
      this.randomizeExchangeRates();

      this.data.push({
        name: day,
        dollar: this.exchangeRates.dollar,
        euro: this.exchangeRates.euro
      });
    }
  }

  randomizeExchangeRates() {
    for (const rate in this.exchangeRates) {
      this.exchangeRates[rate] = Math.max(0, (this.exchangeRates[rate] + (Math.random() * (2 * this.maxRateChange) - this.maxRateChange)).toFixed(2));
    }
  }
}