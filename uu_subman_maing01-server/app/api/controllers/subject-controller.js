"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  studyMaterialList(ucEnv) {
    return SubjectAbl.studyMaterialList(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  deleteStudyMaterial(ucEnv) {
    return SubjectAbl.deleteStudyMaterial(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  addStudyMaterial(ucEnv) {
    return SubjectAbl.addStudyMaterial(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  updateTopic(ucEnv) {
    return SubjectAbl.updateTopic(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  deleteTopic(ucEnv) {
    return SubjectAbl.deleteTopic(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  addTopic(ucEnv) {
    return SubjectAbl.addTopic(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return SubjectAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  delete(ucEnv){
    return SubjectAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return SubjectAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return SubjectAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  create(ucEnv) {
    return SubjectAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

}

module.exports = new SubjectController();
