const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user.model');
const Post = require('../models/posts.model');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.route('/login').get((req, res) => {
    if(req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.route('/login').post((req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, err => {
        if (err) {
            res.status(400).json({error: err});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        }
    })
    
});

router.route('/logout').get((req, res) => {
    req.logout();
    res.redirect('/');
})

router.route('/register').post((req, res) => {
    console.log(req.body.username, req.body.password);
    User.register({username: req.body.username}, req.body.password, (err, user) => {
        if (err) {
            res.status(400).json({error: err});
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            });
        }
    });    
});

const secretKey = process.env.SECRETKEY;
router.route('/alohomora').post((req, res) => {
    if (req.body.magicWord === 'alohomora') {
        res.json({secretKey: secretKey});
    } else {
        res.json({error: 'Avada Kedavra!'})
    }
});

router.route('/compose').get((req, res) => {
    if (req.isAuthenticated()) {
        res.render('compose', {edit: false});
    } else {
        res.status(401).json({error: '401: Unauthorised'});
    }
    
});

function parsePostTitle(title) {
    let titleParts;
    if (title.includes('/#/')) {
        const titleArray = title.split('/#/');
        titleParts = {
            endpoint: titleArray[0].replace(/\s+/g, '-').toLowerCase(),
            postTitle: titleArray[1]
        }
    } else {
        titleParts = {
            endpoint: title.replace(/\s+/g, '-').toLowerCase(),
            postTitle: title
        }
    }
    return titleParts;
}

router.route('/compose').post((req, res) => {
    if (req.isAuthenticated()) {
        const titleObject = parsePostTitle(req.body.postTitle);
        console.log(titleObject.postTitle, titleObject.endpoint);
        const content = req.body.content.split("\r\n");
        const description = req.body.description;
        const language = req.body.language;
        const newPost = new Post({
            postTitle: titleObject.postTitle,
            postEndpoint: titleObject.endpoint,
            postContent: content,
            postLanguage: language,
            postDescription: description
        });

        newPost.save((err, document) => {
            if (err) {
                console.log(err);
                res.send(err.message);
            } else {
                if (document) {
                    res.redirect('/posts/' + titleObject.endpoint);
                }
            }
        });
    } else {
        res.status(401).json({error: '401: Unauthorised'});
    }
});

module.exports = router;