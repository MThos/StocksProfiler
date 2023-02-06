import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import LoadingIcon from './LoadingIcon.js';
import NoData from './NoData'

const Charts = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';
  let data = [];
  
  if (historicalData && historicalData.length > 0) {
    data = 
      historicalData.map((history) => (
        createData(
          history.date, 
          history.open.toFixed(2), 
          history.high.toFixed(2), 
          history.low.toFixed(2), 
          history.close.toFixed(2), 
          history.volume, 
          history.changePercent.toFixed(2) + '%')
      ));
  }

  const data_1m = data.slice(0, 20).reverse();
  const data_3m = data.slice(0, 60).reverse();
  const data_6m = data.slice(0, 120).reverse();
  const data_1y = data.slice(0, 250).reverse();
  const data_5y = data.slice(0, 1250).reverse();
  const data_mx = data.reverse();
  const current_close = data_1y.map((row) => row.close);

  function createData(date, open, high, low, close, volume, change) {
    return { date, open, high, low, close, volume, change };
  };

  const tooltipContentStyle = {
    border: "2px solid black",
    fontWeight: "600",
    padding: "15px",
    textAlign: "center",
    textTransform: "uppercase"
  };

  const tooltipLabelStyle = {
    fontWeight: "600",
    fontSize: "1.2rem",
    paddingBottom: "15px",
    textAlign: "center"
  };

  const legendWrapperStyle = {
    paddingTop: "20px",
    paddingLeft: "20px"
  }

  useEffect(() => {
    try {
      setLoading(true);
      
      const options = {
        method: 'GET',
        url: 'http://localhost:8000/dailyhistory',
        params: { symbol: active }
      };
  
      axios.request(options).then((response) => {
        //console.log(response.data.historical);
        setHistoricalData(response.data.historical);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingIcon />
    )
  }

  if (historicalData && Object.keys(historicalData).length > 0) {
  return (
    <section id="chart" className="fade-in">
      <div id="chart-symbol">
        {active}
      </div>
      <ResponsiveContainer width={"80%"} height={500} id="daily-chart">
        <AreaChart data={data_1y}>
          <XAxis dataKey="date" dy={10} />
          <YAxis dataKey="close" dx={-5} domain={['dataMin', 'dataMax']} />
          <Tooltip offset={100} separator={': '} contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} />
          <Legend wrapperStyle={legendWrapperStyle} iconSize={20} />
          <ReferenceLine y={current_close.at(-1)} stroke="black" strokeWidth={2} label="">
            <Label value={`$${current_close.at(-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} position="insideTop" offset={10} stroke="black" strokeWidth={1} fontWeight={400} fontSize={'1.1rem'} />
          </ReferenceLine>
          <Area type="monotone" dataKey="close" stroke="black" strokeWidth={1} fillOpacity={0.6} fill="mediumslateblue" />
          <Area type="monotone" dataKey="open" stroke="black" strokeWidth={0} fillOpacity={0} fill="black" />
          <Area type="monotone" dataKey="low" stroke="red" strokeWidth={0} fillOpacity={0} fill="black" />
          <Area type="monotone" dataKey="high" stroke="mediumseagreen" strokeWidth={0} fillOpacity={0} fill="black" />
          <Area type="monotone" dataKey="change" stroke="black" strokeWidth={0} fillOpacity={0} fill="black" />
        </AreaChart>
      </ResponsiveContainer>
    </section>)
  } else {
    return (
      <NoData page="charts" />
    );
  }
}

export default Charts;
