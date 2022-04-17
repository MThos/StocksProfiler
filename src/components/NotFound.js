const NotFound = () => {
  return(
    <section id="not-found">
      <div id="not-found-title">-404%</div>
      <div id="not-found-description">
        <p>This is embarrassing but,</p>
        <p>We cannot find the page you have requested.</p>
        <p>Don't worry, it could be our fault ...</p>
        <br/>
        <p className="bold red">... or its stock has been heavily shorted!</p>
      </div>
    </section>
  )
}

export default NotFound;