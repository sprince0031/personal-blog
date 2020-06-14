const router = require('express').Router();
const postsRouter = require('./root');

router.route('/:postName').get((req, res) => {
    let objToPass = postsRouter.posts.find(post => {
        return post.title === req.params.postName;
    });
      
    if (objToPass) {
        res.render('post', objToPass);
    } else {
        res.render('404');
    }
});

module.exports = router;