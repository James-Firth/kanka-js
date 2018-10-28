const { Entity } = require('./entity');

class DiceRoll extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);
        const { system, parameters } = params;
        
        this.path = 'dice_rolls';
        Object.assign(this, { system, parameters });
    }
}

module.exports = {
  DiceRoll,
}
