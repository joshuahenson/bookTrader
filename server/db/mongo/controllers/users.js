import shortid from 'shortid';
import passport from 'passport';
import sanitizeHtml from 'sanitize-html';
import User from '../models/user';
import task from '../fawnTask';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        userName: req.user.name,
        userId: req.user._id,
        email: req.user.email,
        picture: req.user.picture,
        address: req.user.address,
        requestedFrom: req.user.requestedFrom,
        requestedBy: req.user.requestedBy,
        trades: req.user.trades,
        message: `Welcome ${req.user.name}. You have been logged in.`
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const email = sanitizeHtml(req.body.email);
  const password = sanitizeHtml(req.body.password);
  const name = sanitizeHtml(req.body.name);
  const user = new User({
    email,
    password,
    name
  });

  User.findOne({ email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          userName: req.user.name,
          userId: req.user._id,
          email: req.user.email,
          message: `Welcome ${req.user.name}. Your account has been created.`
        });
      });
    });
  });
}

export function updateProfile(req, res) {
  const email = sanitizeHtml(req.body.email);
  const name = sanitizeHtml(req.body.name);
  const street = sanitizeHtml(req.body.street);
  const city = sanitizeHtml(req.body.city);
  const state = sanitizeHtml(req.body.state);
  const zip = sanitizeHtml(req.body.zip);

  User.update({ _id: req.user._id }, { email, name, address: { street, city, state, zip } }, (err) => {
    if (err) {
      res.status(500).json({ message: 'A server error has occured!' });
    }
    res.json({ email, userName: name, address: { street, city, state, zip } });
  });
}

// TODO: send 409 on duplicate or client side disable button?
export function proposeTrade(req, res) {
  const { book } = req.body;
  book.tradeId = shortid.generate();
  const requestorBook = Object.assign({}, book, { requestorId: req.user._id });
  task.update('users', { _id: book.userId }, { $push: { requestedBy: requestorBook } })
    .update('users', { _id: req.user._id }, { $push: { requestedFrom: book } })
    .run()
    .then(() => {
      res.json(book);
    })
    .catch((err) => {
      res.status(500).end();
      console.log(err);
    });
}

export function acceptTrade(req, res) {
  const { book, findTrade } = req.body;
  // yeah, I really need to come up with better descriptors for people and books
  const { tradeId } = findTrade;
  const trade = {
    tradeId,
    books: [
      {
        bookId: book._id,
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        userId: book.userId
      },
      {
        bookId: findTrade._id,
        title: findTrade.title,
        author: findTrade.author,
        thumbnail: findTrade.thumbnail,
        userId: findTrade.userId,
        name: req.user.name,
        address: req.user.address
      }
    ]
  };
  User.findById(book.userId, (err, doc) => {
    trade.books[0].name = doc.name;
    trade.books[0].address = doc.address;
    task.update('users', { _id: book.userId }, { $pull: { requestedFrom: { tradeId } }, $push: { trades: trade } }) // remove requestor's request
      .update('users', { _id: req.user._id }, { $pull: { requestedBy: { tradeId } }, $push: { trades: trade } }) // remove from book owner
      .run()
      .then(() => {
        res.json(trade);
      })
      .catch((err) => {
        res.status(500).end();
        console.log(err);
      });
  });
}

export function cancelProposal(req, res) {
  const { bookId, ownerId } = req.body;
  task.update('users', { _id: ownerId }, { $pull: { requestedBy: { _id: bookId } } })
    .update('users', { _id: req.user._id }, { $pull: { requestedFrom: { _id: bookId } } })
    .run()
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      res.status(500).end();
      console.log(err);
    });
}

// FUTURE: alert other user or store denied trades.
export function denyTrade(req, res) {
  const { tradeId, requestorId } = req.body;
  task.update('users', { _id: req.user._id }, { $pull: { requestedBy: { tradeId } } })
    .update('users', { _id: requestorId }, { $pull: { requestedFrom: { tradeId } } })
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
  login,
  logout,
  signUp,
  updateProfile,
  proposeTrade,
  acceptTrade,
  cancelProposal,
  denyTrade
};
