const { makeGet } = require('./api');
const { Calendar } = require('./calendar');
const { Character } = require('./character');
const { User } = require('./user');

class Campaign{
    constructor({id, name, locale, entry, image, visibility, created_at, updated_at, members}) {
        const campaign = {id, name, locale, entry, visibility, created_at, updated_at};

        if (!Array.isArray(members) || members.length < 1) throw new Error('Members missing from campaign');
        
        campaign.members = members.map(value => new User(value.user));

        Object.assign(this, campaign);

        this.image = `https://kanka-user-assets.s3.eu-central-1.amazonaws.com/${image}`
    }

    get public() { return this.visibility === 'public' }
    get private() { return this.visibility === 'private'}

    get calendars() {
        return {
            get: async (id) => await makeGet({campaignID: this.id, pathSuffix: 'calendars', entityType: Calendar }),
        }
    }

    get characters() {
        return {
            get: async (id) => await makeGet({campaignID: this.id, pathSuffix: 'characters', entityType: Character}),
        };
    };


    get users() {
        return {
            get: async () => await makeGet({ campaignID: this.id, pathSuffix: 'users', entityType: User })
        }
    }
}

function all() {
    return makeGet({entityType: Campaign})
    .catch(err => {
        throw err;
    });
}

function getCampaign(id) {
    return makeGet({campaignID: id, entityType: Campaign})
    .catch(err => {
        throw err;
    });
}

function getUsers(id){
    return makeGet({ campaignID: id, pathSuffix: 'users', entityType: User})
    .then(results => results.data)
    .catch(err => {
        throw err;
    });
}


module.exports = {
    Campaign,
    all,
    getCampaign,
    getUsers,
};
