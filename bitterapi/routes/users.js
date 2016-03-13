var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var usersSchema = require('../models/usersSchema.js');

/* GET /users */
router.get('/', function (req, res) {
    usersSchema.find({},{"password":false},function (err, users) {
        if (err) return next(err);
        for(var i = 0; i < users.length; i++) {
            delete users[i].password;
        }
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
        var userid = post._id;
        console.log(userid);
        //res.setRequestHeader("Content-type", "text");
        //res.responseText=userid;
        res.send('success');
    });
});

/* GET /users/id */
router.get('/:id', function (req, res, next) {
    usersSchema.findById(req.params.id,{"password":false}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /users/:id */
router.put('/:id', function (req, res, next) {
    usersSchema.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.send("success");
    });
});

/* DELETE /users/:id */
router.delete('/:id', function (req, res, next) {
    usersSchema.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.send("success");
    });
});

/* POST /users/search/authenticate/ */
router.post('/search/authenticate', function (req, res, next) {
    usersSchema.count(req.body, function (err, usercount) {
        if (err) res.send("fail");
        console.log(usercount);
        if (usercount !=1) {
            res.send('fail');
        }
        if(usercount==1){
            usersSchema.find(req.body, {"password":false}, function (err, user) {
                res.json(user);
            });
        }
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
