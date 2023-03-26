import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label, CartesianGrid } from 'recharts';
import LoadingIcon from './LoadingIcon.js';
import NoData from './NoData'
import Button from './Button.js';

const Charts = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [displayType, setDisplayType] = useState("1m");
  const [isLoading, setLoading] = useState(true);
  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';
  let data = [];
  let data_display = [];
  
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
  
  if (displayType === "1w") {
    data_display = data.slice(0, 5).reverse();
  } else if (displayType === "1m") {
    data_display = data.slice(0, 20).reverse();
  } else if (displayType === "3m") {
    data_display = data.slice(0, 60).reverse();
  } else if (displayType === "6m") {
    data_display = data.slice(0, 120).reverse();
  } else if (displayType === "1y") {
    data_display = data.slice(0, 250).reverse();
  } else if (displayType === "5y") {
    data_display = data.slice(0, 1250).reverse();
  } else {
    data_display = data.reverse();
  }

  const current_close = data_display.map((row) => row.close);
  const min_close = Math.min(...current_close);
  const max_close = Math.max(...current_close);

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

  const onClick = (e) => {
    e.preventDefault();
    setDisplayType(e.target.id);
  }

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
      <div id="chart-buttons">
        <Button name="1w" displayText="1W" onClick={onClick} active={displayType === '1w' ? 'yes' : 'no'} />
        <Button name="1m" displayText="1M" onClick={onClick} active={displayType === '1m' ? 'yes' : 'no'} />
        <Button name="3m" displayText="3M" onClick={onClick} active={displayType === '3m' ? 'yes' : 'no'} />
        <Button name="6m" displayText="6M" onClick={onClick} active={displayType === '6m' ? 'yes' : 'no'} />
        <Button name="1y" displayText="1Y" onClick={onClick} active={displayType === '1y' ? 'yes' : 'no'} />
        <Button name="5y" displayText="5Y" onClick={onClick} active={displayType === '5y' ? 'yes' : 'no'} />
        <Button name="mx" displayText="MX" onClick={onClick} active={displayType === 'mx' ? 'yes' : 'no'} />
      </div>
      <ResponsiveContainer width={"80%"} height={400} id="daily-chart">
        <AreaChart data={data_display}>
          <XAxis dataKey="date" dy={10} />
          <YAxis dataKey="close" dx={-5} width={100} type="number" domain={[min_close, max_close]} />
          <Tooltip offset={100} separator={': '} contentStyle={tooltipContentStyle} labelStyle={tooltipLabelStyle} />
          <Legend wrapperStyle={legendWrapperStyle} iconSize={20} />
          <ReferenceLine y={current_close.at(-1)} stroke="black" strokeWidth={2} label="">
            <Label value={`$${current_close.at(-1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} position="left" offset={10} stroke="black" strokeWidth={0.5} fontWeight={400} fontSize={'1.1rem'} />
          </ReferenceLine>
          <CartesianGrid strokeDasharray="1 1" />
          <Area type="monotone" dataKey="close" stroke="black" strokeWidth={1.2} fillOpacity={0.8} fill="mediumslateblue" animationDuration={2000} />
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
