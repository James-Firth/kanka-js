const { Entity } = require('./entity');
const { makeGet } = require('./api');

class Location extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);
        const { map, parent_location_id } = params;

        this.path = 'locations';
        Object.assign(this, { map, parent_location_id });
    }

    async getParent() {
      return await makeGet({campaignID: this.campaignID, id: this.parent_location_id, pathSuffix: 'locations', entityType: Location});
    }
}

module.exports = {
  Location,
}
