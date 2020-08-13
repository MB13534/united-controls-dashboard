const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  generateCRUDRoutes,
} = require("../../middleware/generateCRUDRoutes.js");
const { ListContacts, AssocContactsGroups } = require("../../models");

const router = generateCRUDRoutes({
  middleware: [
    checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  ],
  model: ListContacts,
  ndxField: "contact_ndx",
  additionalRequests: [
    {
      type: "GET",
      path: "/assoc/contact-groups",
      request: (req, res, next) => {
        AssocContactsGroups.findAll()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            next(err);
          });
      },
    },
    {
      type: "POST",
      path: "/:id/assoc/contact-groups",
      request: (req, res, next) => {
        AssocContactsGroups.destroy({
          where: {
            contact_ndx: req.params.id,
          },
        })
          .then(() => {
            return AssocContactsGroups.bulkCreate(req.body);
          })
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            next(err);
          });
      },
    },
  ],
});

module.exports = router;
