import React from 'react';
import PropTypes from 'prop-types';
import {VictoryBar, VictoryChart, VictoryTheme} from 'victory-native';

function BarChart({data, xField, yField}) {
  return (
    <VictoryChart width={350} theme={VictoryTheme.material}>
      <VictoryBar data={data} x={xField} y={yField} />
    </VictoryChart>
  );
}

BarChart.PropTypes = {
  data: PropTypes.array,
  xField: PropTypes.string,
  yField: PropTypes.string,
};

BarChart.defaultProps = {
  data: [],
  xField: '',
  yField: '',
};

export default BarChart;
