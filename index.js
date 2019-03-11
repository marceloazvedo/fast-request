const axios = require('axios')
const validateStatus = require('./lib/validate-status')
const mountRequest = require('./lib/mount-request')

const getRequest = (data, headers, endPoint, validateStatus) => {
    return new Promise((resolve, reject) => {
        console.log(mountRequest(data, headers, endPoint, validateStatus))
        axios(mountRequest(data, headers, endPoint, validateStatus))
        .then((response) => resolve(response))
        .catch((err) => reject(err))
    })
}

module.exports = (endPoints, baseUrl, codesNotValid = []) => (data, endPointName, optionalHeaders = {}) => {
    const endPoint = endPoints[endPointName]
    endPoint.url = baseUrl + endPoint.url
    const validateStatusFuncion = validateStatus(codesNotValid)
    const request = getRequest(data, optionalHeaders, endPoint, validateStatusFuncion)
    return new Promise((resolve, reject) => {
        request
            .then((response) => resolve(response))
            .catch(err => reject(err))
    })
}