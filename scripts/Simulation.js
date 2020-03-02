'use strict'

class Simulation extends React.Component {
  constructor(props) {
    super(props);

    this.handleShowButtonClick = this.handleShowButtonClick.bind(this);
  }

  render() {
    return (
      <Settings
        onShowButtonClick={this.handleShowButtonClick} />
    );
  }

  handleShowButtonClick(numberOfDays) {
    
  }
}