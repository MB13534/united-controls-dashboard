const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  generateCRUDRoutes,
} = require("../../middleware/generateCRUDRoutes.js");
const { ListStations } = require("../../models");

const router = generateCRUDRoutes({
  middleware: [
    checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  ],
  model: ListStations,
  ndxField: "station_ndx",
  additionalRequests: [
    {
      type: "GET",
      path: "/alerts",
      request: (req, res, next) => {
        ListStations.findAll({
          attributes: ["station_ndx", "station_desc", "meas_category"],
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
