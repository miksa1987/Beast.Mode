const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: process.env.BEASTMODE_ENV === 'test' ? 'beastmodetest' : 'beastmode',
  allowedFormats: [ 'png', 'jpg', 'gif' ]
})

const imgparser = multer({ storage })

module.exports = {cloudinary, imgparser}
