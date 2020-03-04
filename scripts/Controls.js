'use strict'

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toBuy: 0,
      toSell: 0,
      buyCurrency: 'ruble',
      sellCurrency: 'ruble',
      budget: {
        ruble: 50000,
        dollar: 300,
        euro: 100
      }
    };

    this.handleNextDayButtonClick = this.handleNextDayButtonClick.bind(this);
    this.handleToBuyInputChange = this.handleToBuyInputChange.bind(this);
    this.handleBuyCurrencySelectChange = this.handleBuyCurrencySelectChange.bind(this);
    this.handleSellCurrencySelectChange = this.handleSellCurrencySelectChange.bind(this);
    this.handleConfirmButtonClick = this.handleConfirmButtonClick.bind(this);
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

            <button onClick={this.handleConfirmButtonClick}>Confirm</button>
          </div>
        </div>
      </div>
    );
  }

  renderBudget() {
    var listItems = [];

    for (const currency in this.state.budget) {
      listItems.push(<li>{currency}: {this.state.budget[currency]}</li>);
    }

    return listItems;
  }

  renderCurrencies() {
    var options = [];

    for (const currency in this.state.budget) {
      options.push(<option value={currency}>{currency}</option>);
    }

    return options;
  }

  handleNextDayButtonClick(event) {
    this.setState({
      toSell: parseFloat((this.state.toBuy * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2))
    });

    console.log(typeof(this.state.toSell));
  }

  handleToBuyInputChange(event) {
    this.setState({
      toBuy: event.target.value === '' ? 0 : Math.max(0, parseFloat(event.target.value)),
      toSell: parseFloat((event.target.value === '' ? 0 : Math.max(0, parseFloat(event.target.value)) * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2))
    });
  }

  handleBuyCurrencySelectChange(event) {
    this.setState({
      buyCurrency: event.target.value,
      toSell: parseFloat((this.state.toBuy * ((event.target.value == 'ruble' ? 1 : this.props.exchangeRates[event.target.value]) / (this.state.sellCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.sellCurrency]))).toFixed(2))
    });
  }

  handleSellCurrencySelectChange(event) {
    this.setState({
      sellCurrency: event.target.value,
      toSell: parseFloat((this.state.toBuy * ((this.state.buyCurrency == 'ruble' ? 1 : this.props.exchangeRates[this.state.buyCurrency]) / (event.target.value == 'ruble' ? 1 : this.props.exchangeRates[event.target.value]))).toFixed(2))
    });
  }

  handleConfirmButtonClick() {
    if (this.state.toSell <= this.state.budget[this.state.sellCurrency]) {
      var newBudget = this.state.budget;

      newBudget[this.state.sellCurrency] = parseFloat((this.state.budget[this.state.sellCurrency] - this.state.toSell).toFixed(2));
      newBudget[this.state.buyCurrency] = parseFloat((this.state.budget[this.state.buyCurrency] + this.state.toBuy).toFixed(2));

      this.setState({
        budget: newBudget
      });
    }
    else {
      alert('You don\'t have enough money my dude');
    }
  }
}