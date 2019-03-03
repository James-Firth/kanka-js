const { makeGet } = require('./api');

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
// const { Tag } = require('./tag');
const { User } = require('./user');

let IMAGE_BASE_PATH = 'https://kanka-user-assets.s3.eu-central-1.amazonaws.com/';
class Campaign{
    constructor({id, name, locale, entry, image, visibility, created_at, updated_at, members}) {
        const campaign = {id, name, locale, entry, visibility, created_at, updated_at};

        if (!Array.isArray(members) || members.length < 1) throw new Error('Members missing from campaign');
        
        campaign.members = members.map(value => new User(value.user));

        Object.assign(this, campaign);

        if (image) {
            this.image = `${IMAGE_BASE_PATH}${image}`;
        } else {
            this.image = null;
        }
    }

    get public() { return this.visibility === 'public' }
    get private() { return this.visibility === 'private'}

    get calendars() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'calendars', entityType: Calendar }),
        }
    }

    get characters() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'characters', entityType: Character}),
        };
    };

    get dice_rolls() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'dice_rolls', entityType: DiceRoll}),
        }
    };

    get events() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'events', entityType: Event}),
        }
    };

    get journals() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'journals', entityType: Journal}),
        }
    };

    get locations() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'locations', entityType: Location}),
        }
    };

    get organisations() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'organisations', entityType: Organisation}),
        }
    };

    get families() {
        return {
            get: async (entityID) => await makeGet({campaignID: this.id, id: entityID, pathSuffix: 'families', entityType: Family}),
        }
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

function setImageBasePath(newPath) {
    // TODO: Add url validation
    IMAGE_BASE_PATH = newPath;
}


module.exports = {
    Campaign,
    all,
    getCampaign,
    getUsers,
    setImageBasePath
};
