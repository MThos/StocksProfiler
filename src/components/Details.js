import { useState, useEffect } from 'react';
import axios from 'axios';
import { Subtract, NumberConverter } from '../helper.js';

const Details = () => {
  const stockData = {
    "symbol" : "AAPL",
    "name" : "Apple Inc.",
    "price" : 165.29000000,
    "changesPercentage" : -2.99882670,
    "change" : -5.11000060,
    "dayLow" : 165.04000000,
    "dayHigh" : 171.27000000,
    "yearHigh" : 182.94000000,
    "yearLow" : 122.25000000,
    "marketCap" : 2697433448448.00000000,
    "priceAvg50" : 167.78860000,
    "priceAvg200" : 158.36874000,
    "volume" : 75329376,
    "avgVolume" : 93246216,
    "exchange" : "NASDAQ",
    "open" : 170.62000000,
    "previousClose" : 170.40000000,
    "sharesOutstanding" : 16319398926,
    "timestamp" : 1650233269,
    "date" : "2021-09-25",
    "revenuePerShare" : 21.90354123925411,
    "netIncomePerShare" : 5.669029281123018,
    "operatingCashFlowPerShare" : 6.229345884552985,
    "freeCashFlowPerShare" : 5.56562398361035,
    "cashPerShare" : 3.750552652516527,
    "enterpriseValue" : 2572256053378.728,
    "peRatio" : 26.219656246078664,
    "priceToSalesRatio" : 6.786117248183458,
    "evToSales" : 7.031537772653343,
    "freeCashFlowYield" : 0.03744364922668191,
    "debtToEquity" : 1.729370740212395,
    "debtToAssets" : 0.8202574344305731,
    "netDebtToEBITDA" : 0.7291044048856549,
    "interestCoverage" : 41.19054820415879,
    "dividendYield" : 0.005827647019057021,
    "researchAndDdevelopementToRevenue" : 0.059904269074427925,
    "workingCapital" : 9355000000,
    "date" : "2021-09-25",
    "cik" : "0000320193",
    "calendarYear" : "2021",
    "revenue" : 365817000000,
    "costOfRevenue" : 212981000000,
    "grossProfit" : 152836000000,
    "grossProfitRatio" : 0.4177935962516778,
    "researchAndDevelopmentExpenses" : 21914000000,
    "sellingGeneralAndAdministrativeExpenses" : 21973000000,
    "otherExpenses" : 0.0,
    "operatingExpenses" : 43887000000,
    "costAndExpenses" : 256868000000,
    "interestIncome" : 2843000000,
    "interestExpense" : 2645000000,
    "depreciationAndAmortization" : 11284000000,
    "ebitda" : 123136000000,
    "ebitdaratio" : 0.33660546120054563,
    "operatingIncome" : 108949000000,
    "operatingIncomeRatio" : 0.29782377527561593,
    "totalOtherIncomeExpensesNet" : 258000000,
    "incomeBeforeTax" : 109207000000,
    "incomeBeforeTaxRatio" : 0.2985290459437369,
    "incomeTaxExpense" : 14527000000,
    "netIncome" : 94680000000,
    "netIncomeRatio" : 0.2588179335569424,
    "eps" : 5.67,
    "epsdiluted" : 5.61,
    "weightedAverageShsOut" : 16701272000,
    "weightedAverageShsOutDil" : 16864919000,
    "date" : "2021-09-25",
    "cashAndCashEquivalents" : 34940000000,
    "shortTermInvestments" : 27699000000,
    "cashAndShortTermInvestments" : 62639000000,
    "netReceivables" : 51506000000,
    "inventory" : 6580000000,
    "otherCurrentAssets" : 14111000000,
    "totalCurrentAssets" : 134836000000,
    "propertyPlantEquipmentNet" : 39440000000,
    "goodwill" : 0.0,
    "intangibleAssets" : 0.0,
    "goodwillAndIntangibleAssets" : 0.0,
    "longTermInvestments" : 127877000000,
    "taxAssets" : 0.0,
    "otherNonCurrentAssets" : 48849000000,
    "totalNonCurrentAssets" : 216166000000,
    "otherAssets" : 0.0,
    "totalAssets" : 351002000000,
    "accountPayables" : 54763000000,
    "shortTermDebt" : 15613000000,
    "taxPayables" : 0.0,
    "deferredRevenue" : 7612000000,
    "otherCurrentLiabilities" : 47493000000,
    "totalCurrentLiabilities" : 125481000000,
    "longTermDebt" : 109106000000,
    "deferredRevenueNonCurrent" : 0.0,
    "deferredTaxLiabilitiesNonCurrent" : 0.0,
    "otherNonCurrentLiabilities" : 53325000000,
    "totalNonCurrentLiabilities" : 162431000000,
    "otherLiabilities" : 0.0,
    "capitalLeaseObligations" : 0.0,
    "totalLiabilities" : 287912000000,
    "preferredStock" : 0.0,
    "commonStock" : 57365000000,
    "retainedEarnings" : 5562000000,
    "accumulatedOtherComprehensiveIncomeLoss" : 163000000,
    "othertotalStockholdersEquity" : 0.0,
    "totalStockholdersEquity" : 63090000000,
    "totalLiabilitiesAndStockholdersEquity" : 351002000000,
    "minorityInterest" : 0,
    "totalEquity" : 63090000000,
    "totalLiabilitiesAndTotalEquity" : 351002000000,
    "totalInvestments" : 155576000000,
    "totalDebt" : 124719000000,
    "netDebt" : 89779000000,
    "date" : "2021-09-25",
    "netIncome" : 94680000000,
    "depreciationAndAmortization" : 11284000000,
    "deferredIncomeTax" : -4774000000,
    "stockBasedCompensation" : 7906000000,
    "changeInWorkingCapital" : -28966000000,
    "accountsReceivables" : -10125000000,
    "inventory" : -2642000000,
    "accountsPayables" : 12326000000,
    "otherWorkingCapital" : 9355000000,
    "otherNonCashItems" : 23908000000,
    "netCashProvidedByOperatingActivities" : 104038000000,
    "investmentsInPropertyPlantAndEquipment" : -11085000000,
    "acquisitionsNet" : -33000000,
    "purchasesOfInvestments" : -109689000000,
    "salesMaturitiesOfInvestments" : 106870000000,
    "otherInvestingActivites" : -608000000,
    "netCashUsedForInvestingActivites" : -14545000000,
    "debtRepayment" : -8750000000,
    "commonStockIssued" : 1105000000,
    "commonStockRepurchased" : -85971000000,
    "dividendsPaid" : -14467000000,
    "otherFinancingActivites" : 14730000000,
    "netCashUsedProvidedByFinancingActivities" : -93353000000,
    "effectOfForexChangesOnCash" : 0.0,
    "netChangeInCash" : -3860000000,
    "cashAtEndOfPeriod" : 35929000000,
    "cashAtBeginningOfPeriod" : 39789000000,
    "operatingCashFlow" : 104038000000,
    "capitalExpenditure" : -11085000000,
    "freeCashFlow" : 92953000000,
    "symbol" : "AAPL",
    "beta" : 1.201965,
    "volAvg" : 79766736,
    "mktCap" : 2410929717248,
    "lastDiv" : 0.85,
    "range" : "105.0-157.26",
    "changes" : 2.4200134,
    "companyName" : "Apple Inc.",
    "currency" : "USD",
    "cik" : "0000320193",
    "isin" : "US0378331005",
    "cusip" : "037833100",
    "exchange" : "Nasdaq Global Select",
    "exchangeShortName" : "NASDAQ",
    "industry" : "Consumer Electronics",
    "website" : "http://www.apple.com",
    "ceo" : "Mr. Timothy Cook",
    "sector" : "Technology",
    "country" : "US",
    "fullTimeEmployees" : "147000",
    "phone" : "14089961010",
    "address" : "1 Apple Park Way",
    "city" : "Cupertino",
    "state" : "CALIFORNIA",
    "zip" : "95014",
    "dcfDiff" : 89.92,
    "dcf" : 148.019,
    "ipoDate" : "1980-12-12"
  }

  return(
    <section>
      <div id="details" className="details-flex">
        <div id="details-symbol">{stockData['symbol']}</div>
        <div id="details-name">{stockData['companyName']}</div>      
        <div id="details-money">
          <div>
            <span>PRICE</span>
            <span className="details-green">${NumberConverter(stockData['price'], 2)}</span>
            <span className="details-money-under">{NumberConverter(stockData['change'], 2, 2)}</span>
            <span className="details-money-under">{NumberConverter(stockData['dayLow'], 2)} &#8212; {NumberConverter(stockData['dayHigh'], 2)}</span>
          </div>
          <div>
            <span>MARKET CAP</span>
            <span className="details-green">${NumberConverter(stockData['marketCap'], 2)}</span>
            <span className="details-money-under">{Subtract(stockData['price'] * stockData['sharesOutstanding'], stockData['previousClose'] * stockData['sharesOutstanding'], 2, 2)}</span>
          </div>
          <div>
            <span>VOLUME</span>
            <span className="details-green">{NumberConverter(stockData['volume'], 1)}</span>
            <span className="details-money-under">{Subtract(stockData['volume'], stockData['avgVolume'], 1, 2)}</span>
            <span className="details-money-under">AVG&#183;{NumberConverter(stockData['avgVolume'], 1)}</span>
          </div>
        </div>
        <div id="details-middle-flex">
          <div id="details-flex-left">
            <div>CIK<span className="details-large">{parseInt(stockData['cik'], 10)}</span></div>
            <div>COUNTRY<span className="details-large">{stockData['country']}</span></div>
            <div>CURRENCY<span className="details-large">{stockData['currency']}</span></div>
            <div>EXCHANGE<span className="details-large">{stockData['exchangeShortName']}</span></div>
            <div>SHARES<span className="details-large">{NumberConverter(stockData['sharesOutstanding'], 1)}</span></div>
            <div>FISCAL END<span className="details-large">{stockData['date']}</span></div>
          </div>
          <div id="details-flex-mid">
            <div>EPS<span className="details-large">{NumberConverter(stockData['eps'], 2)}</span></div>
            <div>REVENUE<span className="details-large">{NumberConverter(stockData['sharesOutstanding'] * stockData['revenuePerShare'], 1)}</span></div>
            <div>EBITDA<span className="details-large">{NumberConverter(stockData['ebitda'], 2)}</span></div>
            <div>NET INCOME<span className="details-large">{NumberConverter(stockData['sharesOutstanding'] * stockData['netIncomePerShare'], 1)}</span></div>
            <div>CASH<span className="details-large">{NumberConverter(stockData['sharesOutstanding'] * stockData['cashPerShare'], 1)}</span></div>
            <div>PRICE TO SALES<span className="details-large">{NumberConverter(stockData['priceToSalesRatio'], 2)}</span></div>
          </div>
          <div id="details-flex-right">
            <div>52W HIGH<span className="details-large">{NumberConverter(stockData['yearHigh'], 2)}</span></div>
            <div>52W LOW<span className="details-large">{NumberConverter(stockData['yearLow'], 2)}</span></div>
            <div>50 MA<span className="details-large">{NumberConverter(stockData['priceAvg50'], 2)}</span></div>
            <div>200 MA<span className="details-large">{NumberConverter(stockData['priceAvg200'], 2)}</span></div>
            <div>BETA<span className="details-large">{NumberConverter(stockData['beta'], 2, 1)}</span></div>
            <div>PE<span className="details-large">{NumberConverter(stockData['peRatio'], 2, 1)}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Details;