var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var bittsSchema = require('../models/bittsSchema.js');

/* GET /bitts */
router.get('/', function (req, res) {
    bittsSchema.find(function (err, bitts) {
        if (err) return next(err);
        res.json(bitts);
    });
});

/* POST /bitts */
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
    bittsSchema.create(req.body, function (err, post) {
        if (err) return next(err);
        var bittid=post._id;
        console.log(bittid);
        //res.setRequestHeader("Content-type", "text");
        //res.responseText=userid;
        res.send('Hello World!');
    });
});

/* GET /bitts/id */
router.get('/:id', function (req, res, next) {
    bittsSchema.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /bitts/:id */
router.put('/:id', function (req, res, next) {
    bittsSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /bitts/:id */
router.delete('/:id', function (req, res, next) {
    bittsSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /bitts/userid/:userid/ */
router.get('/userid/:userid', function (req, res, next) {
    bittsSchema.find({
        "userid": req.params.userid
    }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* POST /bitts/search/json */
router.post('/search/json', function (req, res, next) {
    bittsSchema.find(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});


module.exports = router;
