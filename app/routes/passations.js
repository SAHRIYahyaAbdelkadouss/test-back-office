const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Passations = require('../models/passation');
var authenticate = require('../authenticate');


const passationsRouter = express.Router();

passationsRouter.use(bodyParser.json());


passationsRouter.route('/')
    .get((req, res, next) => {
        Passations.find({})
            .then((passations) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(passations);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyAdmin, (req, res, next) => {
        Passations.create(req.body)
            .then((passation) => {
                console.log('Passation Created ', passation);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(passation);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Passations');
    })
    .delete(authenticate.verifyAdmin, (req, res, next) => {
        Passations.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    
    
module.exports = passationsRouter;
