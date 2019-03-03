const fetch = require('node-fetch');
const { Page } = require('./page');

let token = null || process.env.KANKA_TOKEN;
let code = null || process.env.KANKA_CODE;
let DEBUG = false || process.env.DEBUG;
let BASE_URL = 'https://kanka.io/api/1.0/campaigns';

function setDomain(newDomain) {
    // TODO: Add url validation
    BASE_URL = `https://${newDomain}/api/1.0/campaigns`;
}

function setToken(newToken) {
    if (!newToken || typeof newToken !== 'string') throw new Error('Must provide an access token');
    token = newToken;
}

function setCode(newCode) {
    if (!newCode || typeof newCode !== 'string') throw new Error('Must provide an code');
    code = newCode;
}

// TODO: Optimize cache
let cache = {};

async function makeGet({campaignID, pathSuffix, id, entityType, noCache = false}) {
    const useCache = (true !== noCache); // nice flag, but confusing so flipping it.

    let requestPath = `${BASE_URL}${campaignID ? '/'+campaignID : ''}`;

    if (pathSuffix) {
        if (typeof pathSuffix !== 'string') throw new Error('Must provide path suffix');
        requestPath = `${requestPath}/${pathSuffix}`;
    }

    if (id) {
        requestPath = `${requestPath}/${id}`;
    }

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
        if (!results.data) throw new Error(results.message);

        try {
            let returnData;
            if (Array.isArray(results.data)) {
                if (results.meta) {
                    returnData = new Page(results, {campaignID, entityType})
                } else {
                    returnData = results.data.map(value => new entityType(value, campaignID));
                }
            } else {
                returnData = new entityType(results.data, campaignID);
            }

            cache[requestPath] = returnData;
            return returnData;
        } catch(e) {
            throw e;
        }
    })
}

module.exports = {
    makeGet,
    setToken,
    setDomain,
}
