// TODO: Maybe split this into a "baseitem" and entity?
// Then the campaign can be a base item but not entity
class Entity {
    constructor({created_at, created_by, id, entity_id, entry, image, is_private, section_id, name, type}, campaignID){
        const entity = {created_at, created_by, id, entity_id, entry, is_private, section_id, name, type};
        this.campaignID = campaignID;
        if (image) {
            this.image = `https://kanka-user-assets.s3.eu-central-1.amazonaws.com/${image}`
        }
        Object.assign(this, entity);
    }

    get public() { return !this.is_private }
    get private() { return this.visibility}

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
