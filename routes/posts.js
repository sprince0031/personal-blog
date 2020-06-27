const router = require('express').Router();
const Post = require('../models/posts.model');

router.route('/:postEndpoint').get((req, res) => {
    const postEndpoint = req.params.postEndpoint;
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

router.route('/:postEndpoint/edit').get((req, res) => {
    if (req.isAuthenticated()) {
        const postEndpoint = req.params.postEndpoint;
        Post.findOne({postEndpoint: postEndpoint})
            .then(post => {
                if (post) {
                    res.render('edit', post);
                } else {
                    res.render('404');
                }
            })
            .catch(err => res.status(400).json({error: err}));
    } else {
        res.status(401).json({error: '401: Unauthorised'});
    }
});

router.route('/:postEndpoint/edit').post((req, res) => {
    if (req.isAuthenticated()) {
        const postEndpoint = req.params.postEndpoint;
        const content = req.body.content.split("\r\n");
        const description = req.body.description;
        if (content.length != 0 && description != "") {
            Post.findOneAndUpdate({postEndpoint: postEndpoint}, {postContent: content, postDescription: description})
                .then(post => {
                    if (post) {
                        res.redirect('/posts/' + post.postEndpoint);
                    } else {
                        res.render('404');
                    }
                })
                .catch(err => res.status(400).json({error: err}));
    }
    } else {
        res.status(401).json({error: '401: Unauthorised'});
    }
    
});

router.route('/:postEndpoint/delete').delete((req, res) => {
    if (req.isAuthenticated()) {
        const id = req.query.id;
        Post.findByIdAndDelete(id)
            .then(deletedPost => {
                if (deletedPost) {
                    res.json({deleted: true});
                } else {
                    res.status(500).json({deleted: false});
                }
            })
            .catch(err => res.status(400).json({error: err}));
    } else {
        res.status(401).json({error: '401: Unauthorised'});
    }
    
});

module.exports = router;