const { Entity } = require('./entity');
const { makeGet } = require('./api');

const { Character } = require('./character');

class Organisation extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);
        const { members } = params;

        this.path = 'organisations';
        Object.assign(this, { members });
    }

    get members() {
        return {
            get: async () => await makeGet({campaignID: this.id, pathSuffix: `organisations/${this.id}/organisation_members`, entityType: Characters}),
        }
    };
}

module.exports = {
  Organisation,
}
