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

const List = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  }
};

const Delete = 
  {UC_CODE: `${SUBJECT_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Delete.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Delete schema by Dao createSchema failed.";
    }
  },

  SubjectDaoDeleteFailed: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}subjectDaoDeleteFailed`;
      this.message = "Delete subject by subject Dao delete failed.";
    }
  }
};

const Update = {
  UC_CODE: `${SUBJECT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoUpdateFailed: class extends SubmanMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}subjectDaoUpdateFailed`;
      this.message = "Update subject by subject Dao update failed.";
    }
  }
  
};

module.exports = {
  Update,
  Delete,
  List,
  Get,
  Create
};
