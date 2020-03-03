'use strict'

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 0,
      controlsDisabled: true,
      exchangeRates: {
        dollar: 67.05,
        euro: 74.67
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