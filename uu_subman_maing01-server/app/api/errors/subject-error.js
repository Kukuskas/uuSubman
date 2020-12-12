"use strict";

const SubmanMainUseCaseError = require("./subman-main-use-case-error.js");
const SUBJECT_ERROR_PREFIX = `${SubmanMainUseCaseError.ERROR_PREFIX}subject/`;

const Create = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoCreateFailed: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Create subject by subject Dao create failed.";
    }
  },
};


const Get = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubmanDoesNotExist: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}subjectDoesNotExist`;
      this.message = "Subman does not exist.";
    }
  } 
};

module.exports = {
  Get,
  Create
};
