const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");

const { ListContactGroups } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

/**
 * GET /api/contact-groups
 * Endpoint used to retrieve all contact groups
 */
router.get("/", (req, res, next) => {
  ListContactGroups.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * GET /api/contact-groups/:id
 * Endpoint used to retrieve a single contact group
 */
router.get("/:id", (req, res, next) => {
  ListContactGroups.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * POST /api/contact-groups/
 * Endpoint used to create a new contact group
 */
router.post("/", (req, res, next) => {
  ListContactGroups.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

/**
 * PUT /api/contact-groups/:id
 * Endpoint used to update an existing contact group
 */
router.put("/:id", (req, res, next) => {
  ListContactGroups.update(req.body, {
    where: {
      group_ndx: req.params.id,
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
