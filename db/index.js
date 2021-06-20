import mongoose from 'mongoose'

const {
  DB_USER,
  DB_PASSWORD,
  DB_DOMAIN
} = process.env

export default () => mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}.ixe4n.mongodb.net/g2i?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
