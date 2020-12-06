"use strict";
const SubmanMainAbl = require("../../abl/subman-main-abl.js");

class SubmanMainController {

  load(ucEnv) {
    return SubmanMainAbl.load(ucEnv.getUri().getAwid(), ucEnv.getSession());
  }
  init(ucEnv) {
    return SubmanMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubmanMainController();
