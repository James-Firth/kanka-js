# Kanka JS

A wrapper for the Kanka API written in javascript. 


```js
const kanka = require('kanka');

const token = 'myAPIToken';

// First set your API token.
// Alternatively export the environmental variable KANKA_TOKEN="myToken"
kanka.setToken(token);

// Grab an individual campaign, or list all of them.
// NOTE: If you have a lot of campaigns (over 45) this version not work for you as I haven't implemented pagination.
kanka.listCampaigns()
.then(campaigns => {
    if (!Array.isArray(campaigns)) throw new Error('Campaigns is not an array');
    return campaigns[0];
})
.then(camp => {
    return camp.characters.list();
})
.then(chars => {
    console.log('Character list:');
    console.log(chars);
})
.catch((err) => {
    console.error("An error occured:");
    console.dir(err);
})
```
