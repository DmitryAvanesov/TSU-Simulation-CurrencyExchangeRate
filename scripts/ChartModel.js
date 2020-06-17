'use strict'

class ChartModel {
  constructor() {
    this.data = [];
    this.initialDate = new Date(2020, 2, 1);
    this.maxRateChange = 1.5;
    this.curExchangeRates = {};
    this.drift = 1;
    this.volatility = 0.01;
    this.timeInterval = 0.0001;
    this.wiener = {
      USD: 0,
      EUR: 0,
      JPY: 0,
      GBP: 0
    };
  }

  generateData(numberOfDays, exchangeRates) {
    this.curExchangeRates = exchangeRates;

    for (let curDay = this.data.length; curDay < numberOfDays; curDay++) {
      this.randomizeExchangeRates();

      var tmpDate = new Date();
      tmpDate.setDate(this.initialDate.getDate() + curDay);

      this.data.push({
        time: tmpDate.toLocaleString().split(',')[0],
        USD: this.curExchangeRates.USD,
        EUR: this.curExchangeRates.EUR,
        JPY: this.curExchangeRates.JPY,
        GBP: this.curExchangeRates.GBP
      });
    }
  }

  randomizeExchangeRates() {
    const standardNormalDistribution = () => {
      const range = 6;
      let value = 0;

      for (let i = 0; i < range * 2; i++) {
        value += Math.random();
      }

      value -= range;
      return value;
    };

    for (const rate in this.curExchangeRates) {
      this.wiener[rate] += Math.sqrt(this.timeInterval) * standardNormalDistribution();
      this.curExchangeRates[rate] = Math.max(0, this.curExchangeRates[rate] * Math.exp((this.drift - this.volatility ** 2 / 2) * this.timeInterval + this.volatility * this.wiener[rate]));
    }
  }
}