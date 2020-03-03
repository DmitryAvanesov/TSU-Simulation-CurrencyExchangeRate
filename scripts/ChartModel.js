'use strict'

class ChartModel {
  constructor() {
    this.data = [];
    this.initialDate = new Date(2020, 2, 1);
    this.maxRateChange = 1.5;
    this.curExchangeRates = {};
  }

  generateData(numberOfDays, exchangeRates) {
    this.curExchangeRates = exchangeRates;

    for (let curDay = this.data.length; curDay < numberOfDays; curDay++) {
      this.randomizeExchangeRates();

      var tmpDate = new Date();
      tmpDate.setDate(this.initialDate.getDate() + curDay);
  
      this.data.push({
        time: tmpDate.toLocaleString().split(',')[0],
        dollar: this.curExchangeRates.dollar,
        euro: this.curExchangeRates.euro
      });
    }
  }

  randomizeExchangeRates() {
    for (const rate in this.curExchangeRates) {
      this.curExchangeRates[rate] = Math.max(0, (this.curExchangeRates[rate] + (Math.random() * (2 * this.maxRateChange) - this.maxRateChange)).toFixed(2));
    }
  }
}