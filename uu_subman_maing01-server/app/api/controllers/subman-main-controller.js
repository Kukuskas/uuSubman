"use strict";
const SubmanMainAbl = require("../../abl/subman-main-abl.js");

class SubmanMainController {
  init(ucEnv) {
    return SubmanMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubmanMainController();
