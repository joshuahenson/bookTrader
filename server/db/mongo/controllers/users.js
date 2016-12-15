import passport from 'passport';
import sanitizeHtml from 'sanitize-html';
import mongoose from 'mongoose';
import Fawn from 'fawn';
import User from '../models/user';

Fawn.init(mongoose);
const task = Fawn.Task();

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
  const userId = req.body.userId;

  User.update({ _id: userId }, { email, name, address: { street, city, state, zip } }, (err) => {
    if (err) {
      res.status(500).json({ message: 'A server error has occured!' });
    }
    res.json({ email, userName: name, address: { street, city, state, zip } });
  });
}

// TODO: send 409 on duplicate or client side disable button?
export function proposeTrade(req, res) {
  const { bookId, bookOwnerId, requestorId } = req.body;
  task.update('users', { _id: bookOwnerId }, { $push: { requestedBy: { book: bookId, userId: requestorId } } })
  .update('users', { _id: requestorId }, { $push: { requestedFrom: { book: bookId, userId: bookOwnerId } } })
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
  proposeTrade
};
