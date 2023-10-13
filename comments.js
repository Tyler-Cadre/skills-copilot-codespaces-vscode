// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');

// Create comment
router.post('/create', function(req, res) {
  var comment = new Comment();
  comment.author = req.body.author;
  comment.body = req.body.body;
  comment.post = req.body.post;

  comment.save(function(err) {
    if (err) res.send(err);
    res.json({ message: 'Comment created!' });
  });
});

// Get all comments
router.get('/', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) res.send(err);
    res.json(comments);
  });
});

// Get comment by id
router.get('/:comment_id', function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err);
    res.json(comment);
  });
});

// Update comment by id
router.put('/:comment_id', function(req, res) {
  Comment.findById(req.params.comment_id, function(err, comment) {
    if (err) res.send(err);
    comment.body = req.body.body;

    comment.save(function(err) {
      if (err) res.send(err);
      res.json({ message: 'Comment updated!' });
    });
  });
});

// Delete comment by id
router.delete('/:comment_id', function(req, res) {
  Comment.remove({ _id: req.params.comment_id }, function(err, comment) {
    if (err) res.send(err);
    res.json({ message: 'Successfully deleted' });
  });
});

module.exports = router;