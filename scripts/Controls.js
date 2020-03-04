'use strict'

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.model = new ControlsModel();
  }

  render() {
    return (
      <div className='panel' style={{opacity: this.props.disabled ? 0.75 : 1}}>
        <button
          className='next-day-button'
          onClick={() => this.props.onNextButtonClick()}
          disabled={this.props.disabled}
        >
          Next day
        </button>

        <ul className='budget'>
          {this.renderBudget()}
        </ul>

        <div className='purchase'>
          <span>Buy</span>

          <input
            type='number'
            disabled={this.props.disabled}
          >
          </input>

          <select disabled={this.props.disabled}>
            {this.renderCurrencies()}
          </select>

          <span>for</span>

          <select disabled={this.props.disabled}>
            {this.renderCurrencies()}
          </select>

          <button>Confirm</button>
        </div>
      </div>
    );
  }

  renderBudget() {
    var listItems = [];

    for (const currency in this.model.budget) {
      listItems.push(<li>{currency}: {this.model.budget[currency]}</li>);
    }

    return listItems;
  }

  renderCurrencies() {
    var options = [];

    for (const currency in this.model.budget) {
      options.push(<option value={currency}>{currency}</option>);
    }

    return options;
  }
}