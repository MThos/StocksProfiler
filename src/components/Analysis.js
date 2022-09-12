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
        //console.log(response);
        setPriceTargetsData(response[0]['data']);
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
        <div id="analysis-list">
          { AnalysisList(priceTargetsData) }
        </div>
      </section>
    )
  } else {
    return null;
  }
  
}

const AnalysisList = (priceTargetsData) => {
  const analysis_collection = [];

  priceTargetsData.map((key) => {
    analysis_collection.push(
      <div id="analysis-summary">
        <div id="analyst-row-1" className="analysis-row">
          <div>
            <div className="analysis-small">Price Target</div>
            <div className="analysis-green-small">${key['priceTarget']}</div>
          </div>
          <div>
            <div className="analysis-small">Published</div> 
            <div className="analysis-large">{key['publishedDate'].substring(0, 10)}</div>
          </div>
          <div>
            <div className="analysis-small">Price When Posted</div>
            <div className="analysis-green-small">${key['priceWhenPosted']}</div>
          </div>
        </div>
        <div id="analyst-row-2" className="analysis-row">
          <div>
            <div className="analysis-small">Analyst Name</div>
            <div className="analysis-large">{key['analystName'] ? key['analystName'] : "N/A"}</div>
          </div>
          <div>
            <div className="analysis-small">Publisher</div>
            <div className="analysis-large">{key['newsPublisher'] ? key['newsPublisher'] : "N/A"}</div>
          </div>
          <div>
            <div className="analysis-small">Analyst Company</div>
            <div className="analysis-large">{key['analystCompany'] ? key['analystCompany'] : "N/A"}</div>
          </div>
        </div>
        <div id="analyst-row-3" className="analysis-row">
          <div>
            <div className="analysis-small">Article</div>
            <div className="analysis-medium">
              <a href={key['newsURL']} target="_blank">
                {key['newsTitle'] && key['newsTitle'].length >= 60 ? key['newsTitle'].substring(0, 60) : key['newsTitle']}....
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return analysis_collection;
}

export default Analysis;