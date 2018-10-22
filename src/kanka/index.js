const api = require('./api');
const campaign = require('./campaign');


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

module.exports = {
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
