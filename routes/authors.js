const express = require('express');
const router = express.Router();

const Author = require('../models/author');

router.get('/', async (req, res, next) => {
  const authors = await Author.all();
  res.render('authors/index', { title: 'BookedIn || Authors', authors: authors });
});

router.get('/form', async (req, res, next) => {
  res.render('authors/form', { title: 'BookedIn || Authors' });
});

router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body))
  await Author.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the author has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/authors')
});

router.get('/edit', async (req, res, next) => {
  let authorId = req.query.id;
  let author = await Author.get(authorId);
  console.log(author);
  res.render('authors/form', { title: 'BookedIn || Authors', author: author});
});


module.exports = router;