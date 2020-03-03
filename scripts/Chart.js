'use strict'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.model = new ChartModel();
    this.chartWidth = 600;
    this.chartHeight = 400;
    this.chartMargin = 20;
  }

  render() {
    this.model.generateData(this.props.numberOfDays);

    return (
      <window.Recharts.LineChart
        width={this.chartWidth}
        height={this.chartHeight}
        data={this.model.data.slice()}
        margin={{
          top: this.chartMargin,
          right: this.chartMargin,
          bottom: this.chartMargin,
          left: this.chartMargin
        }}
      >
        <window.Recharts.CartesianGrid />
        <window.Recharts.XAxis dataKey='time' />
        <window.Recharts.YAxis />
        <window.Recharts.Tooltip />
        <window.Recharts.Legend />
        {this.renderLines()}
      </window.Recharts.LineChart>
    );
  }

  renderLines() {
    const lines = [];

    for (const rate in this.model.exchangeRates) {
      lines.push(<window.Recharts.Line
        type='linear'
        dataKey={rate}
        stroke={'#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6)}
        dot={false} />);
    }

    return lines;
  }
}