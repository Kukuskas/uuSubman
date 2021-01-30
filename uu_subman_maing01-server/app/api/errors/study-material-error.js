"use strict";

const SubmanMainUseCaseError = require("./subman-main-use-case-error.js");
const STUDY_MATERIAL_ERROR_PREFIX = `${SubmanMainUseCaseError.ERROR_PREFIX}studyMaterial/`;

const Create = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}create/`,
  
};

const List = {
  UC_CODE: `${STUDY_MATERIAL_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

module.exports = {
  List,
  Create
};
