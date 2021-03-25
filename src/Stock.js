import React, { useEffect, useState } from 'react';
//import {Chart} from 'react-charts'
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export const Stock = () => {

    const API_KEY = '${process.env.REACT_APP_ALPHA_API_KEY}';

    const [stockChartXValues, setStockChartXValues] = useState();
    const [stockChartYValues, setStockChartYValues] = useState();

    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    useEffect(() => {
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=${API_KEY}")
        .then(res => res.json())
        .then(
            function(data) {
                for (var key in data['Time Series (Daily)']) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                  }
                //console.log(stockChartXValuesFunction);
                setStockChartXValues(stockChartXValuesFunction);
                setStockChartYValues(stockChartYValuesFunction);
                //console.log(stockChartXValues);
            }
        )
    }, [])

    

    return (
      <div>
        <h1>Portfolio Tracker</h1>
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
    </div>
        
    )
}

export default Stock