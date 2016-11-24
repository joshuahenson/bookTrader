import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  author: String,
  cover: String,
  addedBy: String
});

export default mongoose.model('Book', bookSchema);
