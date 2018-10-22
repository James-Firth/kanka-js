// TODO: Maybe split this into a "baseitem" and entity?
// Then the campaign can be a base item but not entity
const { makeGet } = require('./api');

class EntityBase {
    constructor({created_at, updated_at}){
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

class Attribute extends EntityBase {
    constructor(params, campaignID) {
        super(params, campaignID);
        const { default_order, value } = params;

        this.path = `entities/${this.entity_id}/attributes`;
        Object.assign(this, { default_order, value });
    }
}

class EntityEvent extends EntityBase {
    constructor(params, campaignID) {
        super(params, campaignID);
        const { calendar_id, comment, date, is_recurring, length, recurring_until } = params;

        this.path = `entities/${this.entity_id}/entity_events`;
        Object.assign(this, { calendar_id, comment, date, is_recurring, length, recurring_until });
    }
}

class Relation extends EntityBase {
    constructor(params, campaignID) {
        super(params, campaignID);
        const { owner_id, target_id, relation } = params;

        this.path = `entities/${this.entity_id}/relations`;
        Object.assign(this, { owner_id, target_id, relation });
    }
}

class EntityNote extends EntityBase {
    constructor(params, campaignID) {
        super(params, campaignID);
        const { owner_id, target_id, relation } = params;

        this.path = `entities/${this.entity_id}/entity_notes`;
        Object.assign(this, { owner_id, target_id, relation });
    }
}

class Entity extends EntityBase{
    constructor({created_at, updated_at, created_by, id, entity_id, entry, image, is_private, section_id, name, type}, campaignID){
        super({created_at, updated_at})
        const entity = { created_by, id, entity_id, entry, is_private, section_id, name, type};
        this.campaignID = campaignID;
        if (image) {
            this.image = `https://kanka-user-assets.s3.eu-central-1.amazonaws.com/${image}`
        }
        Object.assign(this, entity);
    }

    get public() { return !this.is_private }
    get private() { return this.visibility}

    get attributes() {
        return {
            get: async (id) => await makeGet({campaignID: this.campaignID, id, pathSuffix: `entities/${this.entity_id}/attributes`, entityType: Attribute}),
        }
    };

    get entity_events() {
        return {
            get: async (id) => await makeGet({campaignID: this.campaignID, id, pathSuffix: `entities/${this.entity_id}/entity_events`, entityType: EntityEvent}),
        }
    };

    get notes() {
        return {
            get: async (id) => await makeGet({campaignID: this.campaignID, id, pathSuffix: `entities/${this.entity_id}/entity_notes`, entityType: EntityNote}),
        }
    };

    get relations() {
        return {
            get: async (id) => await makeGet({campaignID: this.campaignID, id, pathSuffix: `entities/${this.entity_id}/relations`, entityType: Relation}),
        }
    };
    // attributes
    // events
    // notes
    // relations

    update(pathName) {
        console.log(`TODO: UPDATE campaign ${this.campaignID} with path ${pathName}`)
        // Probably make use of campaign ID
        // TODO: Maybe make this an upsert instead?
    }

    create(pathName) {
        // TODO: 
        console.log(`TODO: CREATE campaign ${this.campaignID} with path ${pathName}`)

    }

    delete(pathName) {
        console.log(`TODO: DELETE campaign ${this.campaignID} with path ${pathName}`)
        // TODO: Implement
    }

}

module.exports = Entity;
