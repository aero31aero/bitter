var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

/* GET /users. */
router.get('/', function (req, res) {
    //res.send('respond with a resource');
    usersSchema.find({}, function (err, users) {
        if (err) {
            return next(err);
        }
        res.json(users);
    });
});

/* GET /users/:id. */
router.get('/:id', function (req, res) {
    //res.send('respond with a resource');
    usersSchema.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

/* DELETE /users/:id. */
router.delete('/:id', function (req, res) {
    //res.send('respond with a resource');
    usersSchema.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send("success");
    });
});

/* UPADTE /users/:id. */
router.put('/:id', function (req, res) {
    //res.send('respond with a resource');
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
});

/* POST /users. */
router.post('/', function (req, res, next) {
    //res.send('respond with a resource');
    usersSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        
        res.send('success');
    });
});

module.exports = router;