const express = require("express");
const { checkAccessToken, checkPermission } = require("../middleware/auth.js");

const { ExampleView } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/example/example-view
router.get("/example-view", (req, res, next) => {
  ExampleView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
