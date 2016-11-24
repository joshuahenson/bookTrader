import Book from '../models/book';

export function dummyData() {
  Book.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const book1 = new Book({
      title: 'Saga Volume 1',
      author: 'Brian K. Vaughan',
      cover: 'https://imagecomics.com/uploads/releases/Saga_vol1-1.png',
      addedBy: 'User1'
    });
    const book2 = new Book({
      title: 'Saga Volume 2',
      author: 'Brian K. Vaughan',
      cover: 'https://imagecomics.com/uploads/releases/Saga_vol2-1.png',
      addedBy: 'User2'
    });

    Book.create([book1, book2], (error) => {
      if (!error) {
        console.log('creating Books');
      } else {
        console.log('error creating Books', error);
      }
    });
  });
}

export function getBooks(req, res) {
  Book.find().exec((err, books) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ books });
  });
}

export default {
  dummyData,
  getBooks
};
