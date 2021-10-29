function sleep (milliseconds) {
    const start = new Date().getTime()
    for (let i = 0; i < Infinity; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break
      }
    }
  }

  function simulateBlocking(desiredBlockingTime) {
      sleep(desiredBlockingTime+50)
  }

  module.exports = { simulateBlocking }