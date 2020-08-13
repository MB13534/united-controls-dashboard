const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  generateCRUDRoutes,
} = require("../../middleware/generateCRUDRoutes.js");
const {
  ListContactGroups,
  ContactsGroupsMerged,
  AssocContactsGroups,
} = require("../../models");

const router = generateCRUDRoutes({
  middleware: [
    checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  ],
  model: ListContactGroups,
  ndxField: "group_ndx",
  additionalRequests: [
    {
      type: "GET",
      path: "/merged",
      request: (req, res, next) => {
        ContactsGroupsMerged.findAll()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            next(err);
          });
      },
    },
    {
      type: "GET",
      path: "/assoc/contacts",
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
  ],
});

module.exports = router;
