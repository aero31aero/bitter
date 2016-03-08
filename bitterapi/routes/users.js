var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

/* GET /users */
router.get('/', function (req, res) {
    usersSchema.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* POST /users */
router.post('/', function (req, res, next) {
    console.log(req.body)
//    if (!req.headers.authorization) {
//        res.json({
//            error: 'No credentials sent!'
//        })
//    } else {
//        var encoded = req.headers.authorization.split(' ')[1];
//        var decoded = new Buffer(encoded, 'base64').toString('utf8');
//        console.log(encoded);
//        console.log(decoded);
//    }
    usersSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        var userid=post._id;
        console.log(userid);
        //res.setRequestHeader("Content-type", "text");
        //res.responseText=userid;
        res.send('Hello World!');
    });
});

/* GET /users/id */
router.get('/:id', function (req, res, next) {
    usersSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /users/:id */
router.put('/:id', function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /users/:id */
router.delete('/:id', function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /users/username/:username/password/:password */
router.get('/username/:username/password/:password', function (req, res, next) {
    usersSchema.find({
        "username": req.params.username,
        "password": req.params.password
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /users/search/json */
router.post('/search/json', function (req, res, next) {
    usersSchema.find(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
