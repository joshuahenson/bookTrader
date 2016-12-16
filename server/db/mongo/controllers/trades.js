import mongoose from 'mongoose';
import Fawn from 'fawn';

Fawn.init(mongoose);
const task = Fawn.Task();

// TODO: send 409 on duplicate or client side disable button?
export function proposeTrade(req, res) {
  const id = mongoose.Types.ObjectId();
  const { book, requestorId } = req.body;
  book.tradeId = id.toString();
  const requestorBook = Object.assign({}, book, { requestorId });
  const tradeBook = Object.assign({}, requestorBook, { _id: id });
  task.update('users', { _id: book.userId }, { $push: { requestedBy: requestorBook } })
    .update('users', { _id: requestorId }, { $push: { requestedFrom: book } })
    .save('trades', tradeBook)
    .run()
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end();
      console.log(err);
    });
}

export default {
  proposeTrade
};
