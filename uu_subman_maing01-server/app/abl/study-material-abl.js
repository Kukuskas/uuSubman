"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-material-error.js");

const WARNINGS = {
  listUnsupportedKeys:{
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys:{
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  }
};

class StudyMaterialAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyMaterial");
  }

  async delete(dtoIn) {
      let validationResult = this.validator.validate("studyMaterialDeleteDtoInType", dtoIn);
      let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.deleteUnsupportedKeys.code,
        Errors.Delete.InvalidDtoIn
      );
      await this.dao.delete(dtoIn.id);
      let dtoOut = {};
      dtoOut.uuAppErrorMap = uuAppErrorMap;
      return dtoOut;
    
  }

  async list(awid, dtoIn) {
    let validationResult = this.validator.validate("studyMaterialListDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut = await this.dao.list();
    // hds 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


  async create(awid, dtoIn) {
    
  }

}

module.exports = new StudyMaterialAbl();
