const api = require('./api');
const campaign = require('./campaign');
const Character = require('./character').Character;
const User = require('./user').User;

module.exports = {
    setToken: api.setToken,
    listCampaigns: campaign.all,
    getCampaign: campaign.get,
    getUsersForCampaign: campaign.getUsers,
    classes: {
        Campaign: campaign.Campaign,
        Character,
        User
    }
}
