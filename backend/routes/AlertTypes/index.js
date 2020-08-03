const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");

const {
  generateCRUDRoutes,
} = require("../../middleware/generateCRUDRoutes.js");
const { ListAlertTypes } = require("../../models");

const router = generateCRUDRoutes({
  middleware: [
    checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE),
  ],
  model: ListAlertTypes,
  ndxField: "alert_type_ndx",
});

module.exports = router;
