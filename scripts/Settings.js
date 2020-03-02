'use strict'

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberOfDays: 0,
      disabled: false
    };

    this.handleNumberOfDaysChange = this.handleNumberOfDaysChange.bind(this);
  }

  render() {
    return (
      <div className='settings'>
        <span className='span-margin-right'>Number of days</span>

        <input
          value={this.numberOfDays}
          onChange={this.handleNumberOfDaysChange}
          type='number'
          disabled={this.state.disabled}>
        </input>

        <button
          onClick={
            () => {
              this.disableSettings();
              this.props.onShowButtonClick(this.state.numberOfDays);
            }
          }
          disabled={this.state.disabled}
        >
          Show
        </button>
      </div>
    );
  }

  handleNumberOfDaysChange(event) {
    this.setState({
      numberOfDays: event.target.value
    });
  }

  disableSettings() {
    this.setState({
      disabled: true
    });
  }
}