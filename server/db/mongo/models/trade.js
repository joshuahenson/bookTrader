import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tradeSchema = new Schema({
  title: String,
  author: String,
  thumbnail: String,
  userId: String,
  requestorId: String
});

export default mongoose.model('Trade', tradeSchema);
