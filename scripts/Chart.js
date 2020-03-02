'use strict'

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.model = new ChartModel();
    this.chartWidth = 600;
    this.chartHeight = 400;
    this.chartMargin = 10;
  }

  render() {
    this.model.generateData(this.props.numberOfDays);

    return (
      <window.Recharts.LineChart
        width={this.chartWidth}
        height={this.chartHeight}
        data={this.model.data}
        margin={{
          top: this.chartMargin,
          right: this.chartMargin,
          bottom: this.chartMargin,
          left: this.chartMargin
        }}
      >
        <window.Recharts.CartesianGrid strokeDasharray="3 3" />
        <window.Recharts.XAxis dataKey="name" />
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
      lines.push(<window.Recharts.Line type="monotone" dataKey={rate} stroke="#82ca9d" />);
    }

    return lines;
  }
}