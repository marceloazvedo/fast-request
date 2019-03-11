module.exports = codes => status => codes.reduce((acc, code) => {
    acc = status != code
    return acc
}, true)
