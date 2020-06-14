const router = require('express').Router();
const Post = require('../models/posts.model');

router.route('/:postName').get((req, res) => {
    const postTitle = req.params.postName;
    Post.findOne({postTitle: postTitle})
        .then(post => {
            if (post) {
                res.render('post', post);
            } else {
                res.render('404');
            }
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
      
    // if (post) {
    //     res.render('post', post);
    // } else {
    //     res.render('404');
    // }
});

module.exports = router;