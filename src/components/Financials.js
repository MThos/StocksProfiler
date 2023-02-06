import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NumberConverter } from '../helper.js';
import LoadingIcon from './LoadingIcon.js';
import Button from './Button';
import NoData from './NoData.js';

const Financials = () => {
  const [annualData, setAnnualData] = useState([]);
  const [quarterlyData, setQuarterlyData] = useState([]);
  const [displayType, setDisplayType] = useState("annual");
  const [isLoading, setLoading] = useState(true);

  const active = (localStorage.getItem('active')) ? localStorage.getItem('active') : 'AAPL';

  const onClick = (e) => {
    e.preventDefault();
    setDisplayType(e.target.id);
  }

  useEffect(() => {
    try {
      setLoading(true);

      const endPoints = [
        'http://localhost:8000/annual',
        'http://localhost:8000/quarterly'
      ];

      axios.all(endPoints.map((endPoint) => axios.get(endPoint, { params: { symbol: active }})))
      .then((response) => {
        console.log(response);
        setAnnualData(response[0]['data'][0]);
        setQuarterlyData(response[1]['data'][0]);
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

  if ((annualData && quarterlyData) && 
       Object.keys(annualData).length > 0 &&
       Object.keys(quarterlyData).length > 0) {
    return(
      <section className="fade-in">
        {<div id="details" className="details-flex">
          <div id="details-symbol">
            {
              displayType === 'annual' ? 
                annualData['symbol'] :
                quarterlyData['symbol']
            }
          </div>
          <div className="border-top">
            { /* empty */ }
          </div>
          <div id="financial-header" className="flex-row">
            <Button name="annual" displayText={annualData['period'] + ' ' + annualData['calendarYear']} onClick={onClick} active={displayType === 'annual' ? 'yes' : 'no'} />
            <div className="financial-datestamp">
              {
                displayType === 'annual' ? 
                  annualData['period'] + '·' + annualData['calendarYear'] :
                  quarterlyData['period'] + '·' + quarterlyData['calendarYear']
              }
            </div>
            <Button name="quarterly" displayText={quarterlyData['period'] + ' ' + quarterlyData['calendarYear']} onClick={onClick} active={displayType === 'quarterly' ? 'yes' : 'no'} />
          </div>
          <div id="details-middle-flex">
            <div id="details-flex-left">
              <div>
                <span>YEAR</span>
                <span className="details-large">
                  {
                    displayType === 'annual' ? 
                      annualData['calendarYear'] : 
                      quarterlyData['calendarYear']
                  }
                </span>
              </div>
              <div>
                <span>PERIOD</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['period'] : quarterlyData['period']}
                </span>
              </div>
              <div>
                <span>DATE</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['date'] : quarterlyData['date']}
                </span>
              </div>
              <div>
                <span>FILLING DATE</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['fillingDate'] : quarterlyData['fillingDate']}
                </span>
              </div>
              <div>
                <span>CIK</span>
                <span className="details-large">
                  {displayType === 'annual' ? parseInt(annualData['cik'], 10) : parseInt(quarterlyData['cik'], 10)}
                </span>
              </div>
              <div>
                <span>CURRENCY</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['reportedCurrency'] : quarterlyData['reportedCurrency']}
                </span>
              </div>
              <div>
                <span>EBITDA</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['ebitda'], 2) : NumberConverter(quarterlyData['ebitda'], 2)}
                </span>
              </div>
              <div>
                <span>EBITDA RATIO</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['ebitdaratio'], 2) : NumberConverter(quarterlyData['ebitdaratio'], 2)}
                </span>
              </div>
              <div>
                <span>EPS</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['eps'] : quarterlyData['eps']}
                </span>
              </div>
              <div>
                <span>EPS DILUTED</span>
                <span className="details-large">
                  {displayType === 'annual' ? annualData['epsdiluted'] : quarterlyData['epsdiluted']}
                </span>
              </div>
              <div>
                <span>SHARES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['weightedAverageShsOut'], 1) : NumberConverter(quarterlyData['weightedAverageShsOut'], 1)}
                </span>
              </div>
            </div>
            <div id="details-flex-mid">
              <div>
                <span>REVENUE</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['revenue'], 2, 1) : NumberConverter(quarterlyData['revenue'], 2)}
                </span>
              </div>
              <div>
                <span>COST OF REVENUE</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['costOfRevenue'], 1, 1) : NumberConverter(quarterlyData['costOfRevenue'], 1, 1)}
                </span>
              </div>
              <div>
                <span>GROSS PROFIT</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['grossProfit'], 2, 1) : NumberConverter(quarterlyData['grossProfit'], 2, 1)}
                </span>
              </div>
              <div>
                <span>GROSS PROFIT RATIO</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['grossProfitRatio'], 1, 1) : NumberConverter(quarterlyData['grossProfitRatio'],)}
                </span>
              </div>
              <div>
                <span>NET INCOME</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['netIncome'], 1, 1) : NumberConverter(quarterlyData['netIncome'], 1, 1)}
                </span>
              </div>
              <div>
                <span>NET INCOME RATIO</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['netIncomeRatio'], 2, 1) : NumberConverter(quarterlyData['netIncomeRatio'], 2, 1)}
                </span>
              </div>
              <div>
                <span>INTEREST INCOME</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['interestIncome'], 2, 1) : NumberConverter(quarterlyData['interestIncome'], 2, 1)}
                </span>
              </div>
              <div>
                <span>OPERATING INCOME</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['operatingIncome'], 2, 1) : NumberConverter(quarterlyData['operatingIncome'], 2, 1)}
                </span>
              </div>
              <div>
                <span>OPERATING INCOME RATIO</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['operatingIncomeRatio'], 2, 1) : NumberConverter(quarterlyData['operatingIncomeRatio'], 2, 1)}
                </span>
              </div>
              <div>
                <span>INCOME BEFORE TAX</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['incomeBeforeTax'], 2, 1) : NumberConverter(quarterlyData['incomeBeforeTax'], 2, 1)}
                </span>
              </div>
              <div>
                <span>INCOME BEFORE TAX RATIO</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['incomeBeforeTaxRatio'], 2, 1) : NumberConverter(quarterlyData['incomeBeforeTaxRatio'], 2, 1)}
                </span>
              </div>
            </div>
            <div id="details-flex-right">
              <div>
                <span>R&D EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['researchAndDevelopmentExpenses'], 2) : NumberConverter(quarterlyData['researchAndDevelopmentExpenses'], 2)}
                </span>
              </div>
              <div>
                <span>ADMINISTRATIVE EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['generalAndAdministrativeExpenses'], 2) : NumberConverter(quarterlyData['generalAndAdministrativeExpenses'], 2)}
                </span>
              </div>
              <div>
                <span>MARKETING EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['sellingAndMarketingExpenses'], 2) : NumberConverter(quarterlyData['sellingAndMarketingExpenses'], 2)}
                </span>
              </div>
              <div>
                <span>GENERAL EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['sellingGeneralAndAdministrativeExpenses'], 2) : NumberConverter(quarterlyData['sellingGeneralAndAdministrativeExpenses'], 2)}
                </span>
              </div>
              <div>
                <span>OTHER EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['otherExpenses'], 2) : NumberConverter(quarterlyData['otherExpenses'], 2)}
                </span>
              </div>
              <div>
                <span>OPERATING EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['operatingExpenses'], 2, 1) : NumberConverter(quarterlyData['operatingExpenses'], 2, 1)}
                </span>
              </div>
              <div>
                <span>COSTS AND EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['costAndExpenses'], 2, 1) : NumberConverter(quarterlyData['costAndExpenses'], 2, 1)}
                </span>
              </div>
              <div>
                <span>INTEREST EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['interestExpense'], 2, 1) : NumberConverter(quarterlyData['interestExpense'], 2, 1)}
                </span>
              </div>
              <div>
                <span>OTHER INCOME EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['totalOtherIncomeExpensesNet'], 2, 1) : NumberConverter(quarterlyData['totalOtherIncomeExpensesNet'], 2, 1)}
                </span>
              </div>
              <div>
                <span>INCOME TAX EXPENSES</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['incomeTaxExpense'], 2, 1) : NumberConverter(quarterlyData['incomeTaxExpense'], 2, 1)}
                </span>
              </div>
              <div>
                <span>DEPRECIATION</span>
                <span className="details-large">
                  {displayType === 'annual' ? NumberConverter(annualData['depreciationAndAmortization'], 2, 1) : NumberConverter(quarterlyData['depreciationAndAmortization'], 2, 1)}
                </span>
              </div>
            </div>
          </div>
        </div>}
      </section>
    )
  } else {
    return (
      <NoData page="financials" />
    );
  }
  
}

export default Financials;