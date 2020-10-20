"use strict";
const SubAppAbl = require("../../abl/sub-app-abl.js");

class SubAppController {
  init(ucEnv) {
    return SubAppAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubAppController();
