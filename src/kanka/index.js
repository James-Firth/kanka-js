const api = require('./api');
const Calendar = require('./calendar').Calendar;
const campaign = require('./campaign');
const Character = require('./character').Character;
const User = require('./user').User;

module.exports = {
    setToken: api.setToken,
    listCampaigns: campaign.all,
    getCampaign: campaign.getCampaign,
    getUsersForCampaign: campaign.getUsers,
    classes: {
        Calendar,
        Campaign: campaign.Campaign,
        Character,
        User
    }
}
