var crypto = require('crypto');

class Util {

    encryptPassword = (password) => {
        return crypto.createHash('sha256').update(password).digest('base64');
    }

    hashBindingSalt = (hash) => {
        return this.encryptPassword(hash + hash.slice(31, 40));
    }
}

module.exports = {
    Util
}