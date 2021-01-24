"use strict";
const StudyMaterialAbl = require("../../abl/study-material-abl.js");

class StudyMaterialController {

  create(ucEnv) {
    return StudyMaterialAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyMaterialController();
