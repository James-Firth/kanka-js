const fetch = require('node-fetch');
let token = null || process.env.KANKA_TOKEN;
let DEBUG = false || process.env.DEBUG;

// fetches all the
function getAll({campaignID = '', pathSuffix, type}) {
    let requestPath = `https://kanka.io/api/v1/campaigns/${campaignID}`;

    if (pathSuffix) requestPath += `/${pathSuffix}`

    if (DEBUG) console.log(`Request path: ${requestPath}`)
    return fetch(requestPath, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .then( resObj => {
        if (!resObj.data) throw new Error(resObj.message);
        return resObj;
    })
    .then( results => {
        const mappedData = results.data.map(value => new type(value, campaignID));
        delete results.data;
        results.data = mappedData;

        return results;
    })
}

function getOne({campaignID, pathSuffix, id, type}) {
    if (!campaignID) throw new Error('Missing campaign ID');
    
    let requestPath = `https://kanka.io/api/v1/campaigns/${campaignID}`;

    if (!pathSuffix || typeof pathSuffix !== 'string') throw new Error('Must provide path suffix');

    requestPath = `${requestPath}/${pathSuffix}`;

    if (id) requestPath = `${requestPath}/${id}`

    return fetch(requestPath, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .then( results => new type(results.data, campaignID))
}

function setToken(newToken) {
    if (!newToken || typeof newToken !== 'string') throw new Error('Must provide an access token');
    token = newToken;
}

module.exports = {
    getAll,
    getOne,
    setToken,
}
