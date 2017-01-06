import { search } from 'google-books-search';
import Book from '../models/book';
import User from '../models/user';
import task from '../fawnTask';

export function getBooks(req, res) {
  Book.find().exec((err, books) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ books });
  });
}

// google books api search
export function findBook(req, res) {
  search(req.body.title, (err, rawResults) => {
    if (err) {
      console.error(err);
    }
    const results = rawResults.map((book) => {
      const newBook = Object.assign({}, book, { thumbnail: book.thumbnail.replace('http', 'https') });
      return newBook;
    });
    res.json({ results });
  });
}

// Currently saves multiple copies of books in individual documents resulting in showing of duplicates
// I currently like that it shows abundance of books but I may want to change that
export function addBook(req, res) {
  const { thumbnail, title, author } = req.body;
  const newBook = new Book({ thumbnail, title, author, userId: req.user._id });
  newBook.save((err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}

export function getBook(req, res) {
  Book.findById(req.params.id).exec((err, book) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ book });
  });
}

export function deleteBook(req, res) {
  // See if there are any pending trades
  User.findOne({ _id: req.user._id, requestedBy: { $elemMatch: { _id: req.params.id } } }, (err, doc) => {
    if (err) {
      res.status(500).send(err);
    }
    if (doc) { // Remove pending trades and book.
      // find all requests that contain the book to be removed
      const requests = doc.requestedBy.filter(r => r._id === req.params.id);
      task.remove(Book, { _id: req.params.id, userId: req.user._id });
      task.update(User, { _id: req.user._id }, { $pull: { requestedBy: { _id: req.params.id } } });
      // loop over all requests for user's book and remove from other user's doc
      requests.forEach((request) => {
        task.update(User, { _id: request.requestorId }, { $pull: { requestedFrom: { _id: req.params.id } } });
      });
      task.run()
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end();
      });
    } else { // No pending trades so we'll just remove the book
      Book.findOneAndRemove({ _id: req.params.id, userId: req.user._id }, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).end();
        }
      });
    }
  });
}

export default {
  getBooks,
  findBook,
  addBook,
  getBook,
  deleteBook
};
