import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NumberConverter } from '../helper.js';

const Analysis = () => {
  const [priceTargetsData, setPriceTargetsData] = useState([]);
  const [priceTargetConsensusData, setPriceTargetConsensusData] = useState([]);
  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';

  useEffect(() => {
    try {
      const endPoints = [
        'http://localhost:8000/pricetargets',
        'http://localhost:8000/pricetargetconsensus'
      ];

      axios.all(endPoints.map((endPoint) => axios.get(endPoint, { params: { symbol: active }})))
      .then((response) => {
        console.log(response);
        setPriceTargetsData(response[0]['data'][0]);
        setPriceTargetConsensusData(response[1]['data'][0]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, [])

  if (Object.keys(priceTargetsData).length > 0 && 
      Object.keys(priceTargetConsensusData).length > 0) {
    return(
      <section className="fade-in">        
        <div id="analysis" className="analysis-flex">
          <div id="analysis-symbol">
            {priceTargetConsensusData['symbol']}
          </div>
          <div id="analysis-consensus-details">
            <div>
              <span>HIGH</span>
              <span className="analysis-green">
                ${NumberConverter(priceTargetConsensusData['targetHigh'], 2)}
              </span>
            </div>
            <div>
              <span>CONSENSUS</span>
              <span className="analysis-green">
                ${NumberConverter(priceTargetConsensusData['targetConsensus'], 2)}
              </span>
            </div>
            <div>
              <span>LOW</span>
              <span className="analysis-green">
                ${NumberConverter(priceTargetConsensusData['targetLow'], 2)}
              </span>
            </div>            
          </div>
        </div>
      </section>
    )
  } else {
    return null;
  }
  
}

export default Analysis;