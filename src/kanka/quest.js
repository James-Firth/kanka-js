const { Entity } = require('./entity');

const { Character } = require('./character');
const { Location } = require('./location');


class Quest extends Entity{
    constructor(params, campaignID) {
        super(params, campaignID);
        const { character_id, is_completed, quest_id, characters, locations } = params;

        this.path = 'quests';
        Object.assign(this, { character_id, is_completed, quest_id, characters, locations });
    }

    // TODO: Get quest chars/locations working
    // get characters() {
    //   return {
    //       get: async (id) => await makeGet({campaignID: this.id, pathSuffix: `quest/${this.quest_id}/quest_characters`, entityType: Character}),
    //   };
    // };

    // get locations() {
    //   return {
    //       get: async (id) => await makeGet({campaignID: this.id, pathSuffix: `quest/${this.quest_id}/quest_location`, entityType: Location}),
    //   };
    // };
}

module.exports = {
  Quest,
}
