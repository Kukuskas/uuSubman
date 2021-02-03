"use strict";
const StudyMaterialAbl = require("../../abl/study-material-abl.js");

class StudyMaterialController {

  delete(ucEnv) {
    return StudyMaterialAbl.delete(ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return StudyMaterialAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return StudyMaterialAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyMaterialController();
