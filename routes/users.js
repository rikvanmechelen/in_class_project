const express = require('express');
const router = express.Router();
const helpers = require('./helpers')

const User = require('../models/user');

router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) return
  res.render('users/register', { title: 'BookedIn || Users' });
});

router.post('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) return
  console.log('body: ' + JSON.stringify(req.body));
  const user = User.getByEmail(req.body.email)
  if (user) {
    res.render('users/register', {
      title: 'BookedIn || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `A user with this email already exists`}
    });
  } else {
    User.add(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `the user has been created!`,
    };
    res.redirect(303, '/');
  }
});

router.get('/login', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) return
  res.render('users/login', { title: 'BookedIn || Login' });
});

router.post('/login', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) return
  console.log('body: ' + JSON.stringify(req.body));
  const user = User.login(req.body)
  if (user) {
    req.session.currentUser = user
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'You are now logged in',
    };
    res.redirect(303, '/');
  } else {
    res.render('users/login', {
      title: 'BookedIn || Login',
      flash: {
        type: 'danger',
        intro: 'Error!',
        message: `Wrong email and password combination or the user could not be found`}
    });
  }
});

router.post('/logout', async (req, res, next) => {
  delete req.session.currentUser
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: 'You are now logged out',
  };
  res.redirect(303, '/');
});


module.exports = router;