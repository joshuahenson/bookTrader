/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';

const usersController = controllers && controllers.users;
const booksController = controllers && controllers.books;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
    app.post('/updateprofile', usersController.updateProfile);
    app.post('/proposeTrade', usersController.proposeTrade);
    app.post('/acceptTrade', usersController.acceptTrade);
    app.post('/cancelProposal', usersController.cancelProposal);
    app.post('/denyTrade', usersController.denyTrade);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  // book routes
  if (booksController) {
    app.get('/getBooks', booksController.getBooks);
    app.get('/getBook/:id', booksController.getBook);
    app.delete('/getBook/:id', booksController.deleteBook);
    app.post('/findBook', booksController.findBook);
    app.post('/addBook', booksController.addBook);
  } else {
    console.warn(unsupportedMessage('books routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
      })
    );
  }
};
