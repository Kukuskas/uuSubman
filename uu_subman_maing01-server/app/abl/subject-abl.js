"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`
  }
};

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.subjectDao = DaoFactory.getDao("subject");
  }


  async delete(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectDeleteDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    await this.dao.delete(awid, dtoIn.id);
    return uuAppErrorMap;
  };

  async list(awid, dtoIn, session, authorizationResult) {

    // hds 2, 2.1
    let validationResult = this.validator.validate("subjectListDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.listUnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);

    let dtoOut = await this.dao.list(awid)
    // hds 4
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }


  async create(awid, dtoIn, session, authorizationResult) {
   
    let validationResult = this.validator.validate("subjectCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    const studyForms = {
      studyForms: {
        fulltime: {
          id: "1",
          studyMaterialList: [],
          topics: [
            {
              name: "Example fulltime",
              desc: "Lorem Ipsum",
              id: "00",
              studyMaterialList: []
            }
          ]
        },
        parttime: {
          id: "2",
          studyMaterialList: [],
          topics: [
            {
              name: "Example parttime",
              desc: "lorem Ipsum",
              id: "00",
              studyMaterialList: []
            }
          ]
        }
      }
    }
    
      dtoIn.language =  {cs:studyForms, en: studyForms}
      dtoIn.students = [{ uuIdentity: "", formOfStudy: "fulltime" }]
   


    dtoIn.awid = awid;
    let dtoOut;

    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A3
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
    }
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async get(awid, dtoIn, session, authorizationResult) {

    // hds 2, 2.1
    let validationResult = this.validator.validate("subjectGetDtoInType", dtoIn);
    // hds 2.2, 2.3, A4, A5
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);


    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    if (!subject) {
      throw new Errors.Get.SubjectDoesNotExist(uuAppErrorMap, { subjectId: dtoIn.id });
    }
    // hds 4
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }


  async update(awid, dtoIn, session, authorizationResult) {
    // hds 2, 2.1
    let validationResult = this.validator.validate("subjectUpdateDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.Update.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    // hds 4
    dtoIn.uuIdentity = session.getIdentity().getUuIdentity();
    //dtoIn.visibility = authorizationResult.getAuthorizedProfiles().includes(AUTHORITIES_PROFILE);


    // hds 7rs

    try {
      dtoIn.awid = awid;
      subject = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.Update.SubjectDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

}

module.exports = new SubjectAbl();
