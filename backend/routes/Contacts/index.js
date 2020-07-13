const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");

const { ListContacts } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

/**
 * GET /api/contacts
 * Endpoint used to retrieve all contacts
 */
router.get("/", (req, res, next) => {
  ListContacts.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/contacts/:id
 * Endpoint used to retrieve a single contact
 */
router.get("/:id", (req, res, next) => {
  ListContacts.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /api/contacts/
 * Endpoint used to create a new contact
 */
router.post("/", (req, res, next) => {
  ListContacts.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /api/contacts/:id
 * Endpoint used to update an existing contact
 */
router.put("/:id", (req, res, next) => {
  ListContacts.update(req.body, {
    where: {
      contact_ndx: req.params.id,
    },
    returning: true,
  })
    .then((data) => {
      res.json(data[1][0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
