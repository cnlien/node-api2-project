const express = require('express');
const postsRouter = require('./posts/postsRouter.js');
const server = express();
server.use(express.json());
server.use('/api/posts', postsRouter)

server.get('/', (req,res) => {
    res.send('Node API Project 2')
})
module.exports = server;