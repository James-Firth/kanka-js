const { getAll, getOne } = require('./api');
const Character = require('./character').Character;
const User = require('./user').User;
const fetch = require('node-fetch');

class Campaign{
    constructor({id, name, locale, entry, image, visibility, created_at, updated_at, members}) {
        const campaign = {id, name, locale, entry, visibility, created_at, updated_at};

        const campaignMembers = members.map(value => new User(value.user));

        campaign.members = campaignMembers;
        Object.assign(this, campaign);

        this.image = `https://kanka-user-assets.s3.eu-central-1.amazonaws.com/${image}`
    }

    get public() { return this.visibility === 'public' }
    get private() { return this.visibility === 'private'}

    get characters() {
        return {
            list: () => { 
                return getAll({campaignID: this.id, pathSuffix: 'characters', type: Character})
                .then(results => results.data); 
            },
            get: (id) => {
                return getOne({campaignID: this.id, pathSuffix: 'characters', id, type: Character})
                .then(results => results.data);
            },
        }
    }

}

function all() {
    return getAll({type: Campaign})
    .then(results => results.data)
    .catch(err => console.error);
}

function get(id) {
    return getOne({campaignID: id, type: Campaign})
    .then(results => results.data)
    .catch(err => console.error);
}

function getUsers(id){
    return generateGetAll({ campaignID: id, pathSuffix: 'users', type: User})
    .then(results => results.data)
}


module.exports = {
    Campaign,
    all,
    get,
    getUsers,
};
