import React from 'react';
import AnimateStyled from 'animate-styled';

const NotFound = () => {
  return(
    <section id="not-found">
    <AnimateStyled name="fadeIn" iterationCount="1" duration="1s">
      <div id="not-found-title">-404%</div>
      <div id="not-found-description">
        <p>This is embarrassing but,</p>
        <p>We cannot find the page you have requested.</p>
        <p>Don't worry, it could be our fault ...</p>
        <br/>
        <p className="bold red">... or its stock has been heavily shorted!</p>
      </div>
    </AnimateStyled>
    </section>
  )
}

export default NotFound;