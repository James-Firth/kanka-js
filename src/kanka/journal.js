const { Entity } = require('./entity');

class Journal extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);

        this.path = 'journals';
        Object.assign(this, params);
    }
}

module.exports = {
    Journal,
}
