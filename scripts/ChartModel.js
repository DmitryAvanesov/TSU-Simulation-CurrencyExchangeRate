'use strict'

class ChartModel {
  constructor() {
    this.exchangeRates = {
      dollar: 67.05,
      euro: 74.67
    };

    this.data = [];
    this.maxDecrease = 0.85;
    this.maxIncrease = 1.15;
  }

  generateData(numberOfDays) {
    this.randomizeExchangeRates();

    for (let day = 0; day < numberOfDays; day++) {
      this.data.push({
        name: day,
        dollar: this.exchangeRates.dollar,
        euro: this.exchangeRates.euro
      });
    }
  }

  randomizeExchangeRates() {
    for (const rate in this.exchangeRates) {
      this.exchangeRates[rate] = (this.exchangeRates[rate] * (Math.random() * (this.maxIncrease - this.maxDecrease) + this.maxDecrease)).toFixed(2);
    }
  }
}