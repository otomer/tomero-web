const express = require("express");
const apiRouter = express.Router();

var router = function(mongoose) {
  apiRouter
    .route("/journey/list/:memberId/:isExpert*?")
    .get(function(request, response) {
      response.send("OK");
    });
  return apiRouter;
};

module.exports = router;
