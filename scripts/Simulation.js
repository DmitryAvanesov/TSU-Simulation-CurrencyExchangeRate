'use strict'

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 0
    }

    this.handleShowButtonClick = this.handleShowButtonClick.bind(this);
  }

  render() {
    return (
      <div>
        <Settings
          onShowButtonClick={this.handleShowButtonClick} />
        <Chart
          numberOfDays={this.state.numberOfDays} />
      </div>
    );
  }

  handleShowButtonClick(newNumberOfDays) {
    this.setState({
      numberOfDays: newNumberOfDays
    });
  }
}