require('dotenv').config()
const fs = require('fs')

const key = fs.readFileSync(`${__dirname}/../certs/selfsigned.key`)
const cert = fs.readFileSync(`${__dirname}/../certs/selfsigned.crt`)

const serverOptions = {
  key, cert
}

const MONGODB_URI = process.env.BEASTMODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI
const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET

module.exports = { MONGODB_URI, PORT, SECRET, serverOptions }