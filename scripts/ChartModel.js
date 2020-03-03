'use strict'

class ChartModel {
  constructor() {
    this.exchangeRates = {
      dollar: 67.05,
      euro: 74.67
    };

    this.data = [];
    this.initialDate = new Date(2020, 2, 1);
    this.maxRateChange = 1.5;
  }

  generateData(numberOfDays) {
    for (let curDay = this.data.length; curDay < numberOfDays; curDay++) {
      this.randomizeExchangeRates();

      var tmpDate = new Date();
      tmpDate.setDate(this.initialDate.getDate() + curDay);
  
      this.data.push({
        time: tmpDate.toLocaleString().split(',')[0],
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