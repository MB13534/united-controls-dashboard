const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  generateCRUDRoutes,
} = require("../../middleware/generateCRUDRoutes.js");
const { AlertRequestsConfig } = require("../../models");

const router = generateCRUDRoutes({
  middleware: [
    checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  ],
  model: AlertRequestsConfig,
  ndxField: "alert_request_ndx",
  additionalRequests: [
    {
      type: "DELETE",
      path: "/:id",
      request: (req, res, next) => {
        AlertRequestsConfig.destroy({
          where: { alert_request_ndx: req.params.id },
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
