const express = require('express');
const Posts = require('../data/db.js');
const router = express.Router();

router.get('/', (req,res) => {
    Posts.find(req.query)
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((err) => {
            res.status(500).json({
                error: "The posts information could not be retrieved.",
                err
            })
        })
})

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then((post) => {
            post
                ? res.status(200).json(post)
                : res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
        })
        .catch((err) => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
                err
            })
        })
})

module.exports = router;