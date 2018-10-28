const { Entity } = require('./entity');

class Event extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);

        this.path = 'events';
        Object.assign(this, params);
    }
}

module.exports = {
  Event,
}
