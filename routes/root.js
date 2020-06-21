const router = require('express').Router();
const Post = require('../models/posts.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => {
            res.render('home', {posts: posts});
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/about').get((req, res) => {
    res.render('about');
});

router.route('/contact').get((req, res) => {
    res.render('contact');
});

module.exports = router;