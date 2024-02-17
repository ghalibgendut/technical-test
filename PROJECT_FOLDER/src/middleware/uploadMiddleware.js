const multer = require('multer')
const path = require('path')
const UuidServiceClass = require('../service/uuIdService')
const destination = path.join(__dirname, '../../assets')

class UploadMiddleware {
    static upload = multer ({
        limits: {
            fileSize: 2600000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(jpg|jpeg|png|zip|pdf)$/)) {
                return cb(new Error('Format File tidak sesuai!'))
            }
            cb(undefined, true)
        }
    })

    static storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(undefined, destination)
        },
        filename: (req, file, cb) => {
            const name = UuidServiceClass.uuIdVar(file.originalname)
            cb(undefined, name)
        }
    })

    static uploadFile = multer({storage: this.storage, fileFilter: this.fileFilter})
}

module.exports = UploadMiddleware