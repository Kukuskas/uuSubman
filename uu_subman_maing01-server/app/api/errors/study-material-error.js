"use strict";

const SubmanMainUseCaseError = require("./subman-main-use-case-error.js");
const STUDY_MATERIAL_ERROR_PREFIX = `${SubmanMainUseCaseError.ERROR_PREFIX}studyMaterial/`;

const Create = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}create/`,
  
};

module.exports = {
  Create
};
