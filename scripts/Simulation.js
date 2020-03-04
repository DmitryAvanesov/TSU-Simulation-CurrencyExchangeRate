'use strict'

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 0,
      controlsDisabled: true,
      exchangeRates: {
        USD: 67.05,
        EUR: 74.67,
        JPY: 0.62,
        GBP: 84.56
      }
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleExchangeRatesChange = this.handleExchangeRatesChange.bind(this);
  }

  render() {
    return (
      <div>
        <Settings
          onShowButtonClick={this.handleButtonClick} />
        <Chart
          numberOfDays={this.state.numberOfDays}
          exchangeRates={this.state.exchangeRates}
          onExchangeRatesChange={this.handleExchangeRatesChange} />
        <Controls
          onNextButtonClick={this.handleButtonClick}
          disabled={this.state.controlsDisabled}
          exchangeRates={this.state.exchangeRates} />
      </div>
    );
  }

  handleButtonClick(newNumberOfDays = 1) {
    this.setState({
      numberOfDays: this.state.numberOfDays + parseFloat(newNumberOfDays),
      controlsDisabled: false
    });
  }

  handleExchangeRatesChange(newExchangeRates) {
    this.setState({
      exchangeRates: newExchangeRates
    });
  }
}