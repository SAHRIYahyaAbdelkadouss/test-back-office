const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Questions = require("../models/question");
var authenticate = require("../authenticate");

const questionsRouter = express.Router();

questionsRouter.use(bodyParser.json());

questionsRouter
  .route("/")
  .get((req, res, next) => {
    Questions.find({})
      .then(
        (questions) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(questions);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.verifyAdmin, (req, res, next) => {
    Questions.create(req.body)
      .then(
        (passation) => {
          console.log("Passation Created ", passation);
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(passation);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .put(authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Questions");
  })
  .delete(authenticate.verifyAdmin, (req, res, next) => {
    Questions.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = questionsRouter;
