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

router.get('/:id/comments', (req,res) => {
    Posts.findCommentById(req.params.id)
        .then((comment) => {
            comment
                ? res.status(200).json(comment)
                : res.status(404).json({

                })
        })
})

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    !title || !contents
        ? res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        : Posts.insert({ title, contents })
            .then((post) => {
                res.status(201).json(post);
            })
            .catch((err) => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database",
                    err
                })
            })
})

router.post('/:id/comments', (req, res) => {
    const postId = req.params.id;
    const newComment = req.body;
    newComment.post_id = Number(postId);

    !newComment.text
        ? res.status(400).json({errorMessage: "Please provide text for the comment."})
        : Posts.findPostComments(postId)
            .then((comment) => {
                if (comment) {
                    Posts.insertComment(newComment);
                    res.status(201).json(newComment);
                } else {
                    res.status(404).json({error: "The post with the specified ID does not exist."})
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: "There was an error while saving the post to the database",
                    err
                })
            })
})



module.exports = router;