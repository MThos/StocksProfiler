import React from 'react';

const NoData = (props) => {
  const active = localStorage.getItem('active');
  
  return(
    <section className="fade-in">
        <div id="no-symbol" className="no-symbol-flex">
          <div id="no-symbol-found">
            <div>You searched for the stock: <span>{active}</span></div>
            <img id="no-symbol-img" src="./images/line-graph.png" alt="line graph" />
            <div>We were unable to find {props.page} data for that ticker</div>
            <div id="no-symbol-found-sm">Let us know if you believe this is an error</div>
          </div>
        </div>
      </section>
  )
}

export default NoData;