'use strict'

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='panel'>
        <button
          onClick={() => this.props.onNextButtonClick()}
          disabled={this.props.disabled} >
          >
        </button>
      </div>
    );
  }
}