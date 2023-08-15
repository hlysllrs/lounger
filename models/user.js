const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = 6

const guestSchema = new Schema({
  name: String
})

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      delete ret.password
      return ret
    }
  }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
  return next()
})

module.exports = {
  User: model('User', userSchema),
  Guest: model('Guest', guestSchema)
} 