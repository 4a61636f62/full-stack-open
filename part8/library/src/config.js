require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = 'ddfjkgjh345rlcvkj2354j4265678u58ijdfg'

module.exports = {
  MONGODB_URI,
  JWT_SECRET
}