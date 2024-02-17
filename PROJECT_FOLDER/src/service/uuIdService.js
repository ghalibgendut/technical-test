const randomUUID = require('crypto')

class UuidServiceClass {
    
    static uuIdVar = (fileName) => {
        const fileSplit = fileName.split('.')
        const fileExt = '.'+fileSplit[fileSplit.length - 1]
        let resUuId = crypto.randomUUID()+fileExt

        return resUuId
    }
}

module.exports = UuidServiceClass