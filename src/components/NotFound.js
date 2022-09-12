import React from 'react';

const NotFound = () => {
  return(
    <section id="not-found" className="fade-in">
      <div id="not-found-top">
        <p>This is embarrassing &#8212; we cannot find that page.<br/>Don't worry, it could be our fault ...</p>
      </div>
      <div id="not-found-title">-404%</div>
      <div id="not-found-bottom">... or its stock has been heavily shorted!</div>
      <div id="not-found-code">Error Code: 404 - Page Not Found</div>
    </section>
  )
}

export default NotFound;