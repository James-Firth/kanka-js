const fetch = require('node-fetch');
let token = null || process.env.KANKA_TOKEN;
let DEBUG = false || process.env.DEBUG;


// TODO: Optimize cache
let cache = {};

// fetches anything that has a list.
async function getAll({campaignID = '', pathSuffix, type, noCache = false}) {
    const useCache = (true !== noCache); // nice flag, but confusing so flipping it.
    let requestPath = `https://kanka.io/api/v1/campaigns/${campaignID}`;

    if (pathSuffix) requestPath += `/${pathSuffix}`

    if (DEBUG) console.log(`Request path: ${requestPath}`)


    if (cache[requestPath] && useCache) {
        console.log(`Hit Cache for ${requestPath}`);
        return Promise.resolve(cache[requestPath]);
    }

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

        // Store in cache
        cache[requestPath] = results;
        return results;
    })
}

async function getOne({campaignID, pathSuffix, id, type, noCache = false}) {
    const useCache = (true !== noCache); // nice flag, but confusing so flipping it.
    if (!campaignID) throw new Error('Missing campaign ID');
    
    let requestPath = `https://kanka.io/api/v1/campaigns/${campaignID}`;

    if (pathSuffix && typeof pathSuffix !== 'string') throw new Error('Must provide path suffix');

    requestPath = `${requestPath}/${pathSuffix ? pathSuffix : ''}`;

    if (id) requestPath = `${requestPath}/${id}`

    if (cache[requestPath] && useCache) {
        console.log(`Hit Cache for ${requestPath}`);
        return Promise.resolve(cache[requestPath]);
    }

    return fetch(requestPath, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .then( results => {

        try {
            const itemInstance = new type(results.data, campaignID);

            cache[requestPath] = itemInstance;
            return itemInstance;
        } catch(e) {
            throw e;
        }
    })
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
