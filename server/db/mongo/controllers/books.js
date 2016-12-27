import { search } from 'google-books-search';
import Book from '../models/book';

export function getBooks(req, res) {
  Book.find().exec((err, books) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ books });
  });
}

export function findBook(req, res) {
  search(req.body.title, (err, results) => {
    if (err) {
      console.error(err);
    }
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
  Book.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    if (!err) {
      res.status(200).end();
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
