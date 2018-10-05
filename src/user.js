class User {
    constructor({id, name, avatar, locale, timezone}){
        Object.assign(this, {id, name, avatar, locale, timezone});
    }
}

module.exports = {
    User,
}
