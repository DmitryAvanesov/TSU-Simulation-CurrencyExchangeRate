'use strict'

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 0,
      controlsDisabled: true
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  render() {
    return (
      <div>
        <Settings
          onShowButtonClick={this.handleButtonClick} />
        <Chart
          numberOfDays={this.state.numberOfDays} />
        <Controls
          onNextButtonClick={this.handleButtonClick}
          disabled={this.state.controlsDisabled} />
      </div>
    );
  }

  handleButtonClick(newNumberOfDays = 1) {
    this.setState({
      numberOfDays: this.state.numberOfDays + parseFloat(newNumberOfDays),
      controlsDisabled: false
    });
  }
}