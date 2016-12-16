import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  thumbnail: String,
  userId: String
});

export default mongoose.model('Book', bookSchema);
