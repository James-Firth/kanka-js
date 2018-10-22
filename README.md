# Kanka JS

A wrapper for the Kanka API written in javascript. 


This wrapper works with both async/await and Promises.

```js
const kanka = require('kanka');

// First set your API token.
// Alternatively export the environmental variable KANKA_TOKEN="myToken"
const token = 'myAPIToken';
kanka.setToken(token);

// Grab an individual campaign, or list all of them.
// NOTE: If you have a lot of campaigns (over 45) this version not work for you as I haven't implemented pagination.

async function runExample(){
    console.log("Start");
    try {
        let campaignList = await kanka.listCampaigns();
        // Some types come back as Pages. For those types look at the data key
        let campaignNames = campaignList.data.map(x => `"${x.name}"`);
        console.log(`Campaign Names: ${campaignNames}\n`);

        let camp = await kanka.getCampaign(campaignList.data[0].id);
        console.log(`Looking at Campaign: "${camp.name}"\n`);

        let characters = await camp.characters.get();
        console.log(`Characters: ${characters.map(x => ' '+x.name)}\n`);

        let person = await camp.characters.get(characters[0].id);
        let attributes = await person.attributes.get();
        console.log(`Attributes for ${person.name}: ${attributes.map(x => x.name+': '+x.value+'\n')}\n`);


        let relations = await person.relations.get();
        console.log(`Relations for ${person.name}: ${relations}\n`);

        let notes = await person.notes.get();
        console.log(`Notes for ${person.name}: ${notes}\n`);

        let calendar = await camp.calendars.get();
        console.log(`Calendars: ${calendar.map(x => ' '+x.name)}\n`);

        let events = await camp.events.get();
        console.log(`Events: ${events.map(x => ' '+x.name)}\n`);

    } catch(e) {
        throw e;
    }
}

runExample();
```
