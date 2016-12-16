import mongoose from 'mongoose';
import shortid from 'shortid';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String,
  author: String,
  thumbnail: String,
  userId: String
});

export default mongoose.model('Book', bookSchema);
