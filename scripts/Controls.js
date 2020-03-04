'use strict'

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.model = new ControlsModel();
    this.state = {
      toBuy: null,
      toSell: null,
      buyCurrency: 'ruble',
      sellCurrency: 'ruble'
    };

    this.handleNextDayButtonClick = this.handleNextDayButtonClick.bind(this);
    this.handleToBuyInputChange = this.handleToBuyInputChange.bind(this);
    this.handleBuyCurrencySelectChange = this.handleBuyCurrencySelectChange.bind(this);
    this.handleSellCurrencySelectChange = this.handleSellCurrencySelectChange.bind(this);
  }

  render() {
    return (
      <div className='panel' style={{ opacity: this.props.disabled ? 0.75 : 1 }}>
        <button
          className='next-day-button'
          onClick={async () => {
            await this.props.onNextButtonClick();
            this.handleNextDayButtonClick();
          }}
          disabled={this.props.disabled}
        >
          Next day
        </button>

        <ul className='budget'>
          {this.renderBudget()}
        </ul>

        <div className='purchase'>
          <div>
            <span>Buy</span>

            <input
              value={this.state.toBuy}
              onChange={this.handleToBuyInputChange}
              type='number'
              disabled={this.props.disabled}
            >
            </input>

            <select
              onChange={this.handleBuyCurrencySelectChange}
              disabled={this.props.disabled}
            >
              {this.renderCurrencies()}
            </select>
          </div>

          <div>
            <span>for</span>

            <div className='conversion'>
              {this.state.toSell}
            </div>

            <select
              onChange={this.handleSellCurrencySelectChange}
              disabled={this.props.disabled}
            >
              {this.renderCurrencies()}
            </select>

            <button>Confirm</button>
          </div>
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

  handleNextDayButtonClick(event) {
    this.setState({
      toSell: (this.state.toBuy * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2)
    });
  }

  handleToBuyInputChange(event) {
    this.setState({
      toBuy: event.target.value === '' ? 0 : Math.max(0, parseFloat(event.target.value)),
      toSell: (event.target.value === '' ? 0 : Math.max(0, parseFloat(event.target.value)) * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2)
    });
  }

  handleBuyCurrencySelectChange(event) {
    this.setState({
      buyCurrency: event.target.value,
      toSell: (this.state.toBuy * ((event.target.value == 'ruble' ? 1 : this.props.exchangeRates[event.target.value]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2)
    });
  }

  handleSellCurrencySelectChange(event) {
    this.setState({
      sellCurrency: event.target.value,
      toSell: (this.state.toBuy * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (event.target.value == 'ruble' ? 1 : this.props.exchangeRates[event.target.value]))).toFixed(2)
    });
  }
}