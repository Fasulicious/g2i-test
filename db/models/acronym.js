import mongoose, { Schema } from 'mongoose'

const AcronymSchema = new Schema({
  acronym: {
    type: String,
    unique: true,
    required: true
  },
  definition: {
    type: String,
    required: true
  }
})

export default mongoose.model('acronym', AcronymSchema)
