const router = require('express').Router();
const Post = require('../models/posts.model');

router.route('/:post').get((req, res) => {
    const postEndpoint = req.params.post;
    Post.findOne({postEndpoint: postEndpoint})
        .then(post => {
            if (post) {
                res.render('post', post);
            } else {
                res.render('404');
            }
        })
        .catch(err => res.status(400).json({error: err}));
      
});

module.exports = router;