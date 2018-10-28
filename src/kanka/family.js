const { Entity } = require('./entity');

class Family extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);

        this.path = 'families';
        Object.assign(this, params);
    }
}

module.exports = {
    Family,
}
