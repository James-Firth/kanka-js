const api = require('./api');
const campaign = require('./campaign');


const { Entity, setImageBasePath } = require('./entity');
const { Calendar } = require('./calendar');
const { Character } = require('./character');
const { DiceRoll } = require('./dice_roll');
const { Event } = require('./event');
const { Family } = require('./family');
const { Journal } = require('./journal');
const { Location } = require('./location');
const { Organisation } = require('./organisation');
const { Page } = require('./page');
const { Quest } = require('./quest');
const { User } = require('./user');

function setDomains({ topLevelDomain = 'kanka.io',
    imageBasePath = 'https://kanka-user-assets.s3.eu-central-1.amazonaws.com/'}){
    api.setDomain(topLevelDomain);
    campaign.setImageBasePath(imageBasePath);
    setImageBasePath(imageBasePath);
}

function useDevServer() {
    setDomains({ topLevelDomain: 'dev.kanka.io', imageBasePath: 'https://dev.kanka.io/storage/'})
}

// TODO: FINISH EXPORTING API AND DEV/PROD MODE
module.exports = {
    setDomains,
    useDevServer,
    setToken: api.setToken,
    listCampaigns: campaign.all,
    getCampaign: campaign.getCampaign,
    getUsersForCampaign: campaign.getUsers,
    classes: {
        Calendar,
        Campaign: campaign.Campaign,
        Character,
        DiceRoll,
        Event,
        Family,
        Journal,
        Location,
        Organisation,
        Page,
        Quest,
        User
    }
}
