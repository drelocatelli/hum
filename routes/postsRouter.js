const express = require('express');
const app = express();
const router = express.Router();
const Post = require('../schemas/PostSchema')
const sanitize = require('mongo-sanitize')

router.get('/', (req, res) => {
    Post.find()
    .populate("postedBy")
    .sort({ 'createdAt': -1 })
    .then((results) => {
        res.send(results)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

router.post('/', (req, res) => {

    let posts = sanitize(req.body.posts)

    let data = {
        content: posts,
        postedBy: req.session.user
    }

    if(posts == ''){
        res.send({'error': 'posts cannot be empty'})
    }

    Post.create(data)
        .then(newPost => {
            res.status(200).send(newPost)
        }).catch(err => {
            res.status(400).send(err)
        })
    
});

module.exports = router;