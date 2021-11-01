function randomize(number, config) {
    if (!config.random) {
        return
    }
    let max = Math.abs(config.random)
    let min = -max
    const value = Math.random() * (max - min) + min;
    return Math.max(0, number + value)
}

module.exports = {randomize}
