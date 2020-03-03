'use strict'

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.model = new ControlsModel();
  }

  render() {
    return (
      <div className='panel'>
        <button
          onClick={() => this.props.onNextButtonClick()}
          disabled={this.props.disabled} >
          Next day
        </button>

        <ul>
          {this.renderExchangeRates()}
        </ul>
      </div>
    );
  }

  renderExchangeRates() {
    var listItems = [];

    for (const sum in this.model.budget) {
      listItems.push(<li>{sum}: {this.model.budget[sum]}</li>);
    }

    return listItems;
  }
}