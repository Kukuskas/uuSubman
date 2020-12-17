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
//     if(dToIn.language.en) {
//       dtoIn.language.cz= {
//   "studyForms": { 
//       "fulltime": {
//           "id": "...",
//           "studyMaterialList": [
//               "..."
//           ],
//           "topics": [
//               {
//                   "name": "...", 
//                   "desc": "...", 
//                   "id": "...", 
//                   "studyMaterialList": [
//                       {
//                           "studyMateriaId": "...",
//                           "url": "...",
//                           "name": "..."
//                       }
//                   ]
//               }
//           ]
//       },
//       "parttime": {
//           "id": "...",
//           "studyMaterialList": [
//               "..."
//           ],
//           "topics": [
//               {
//                   "name": "...", //name of the topic
//                   "desc": "...", //description of the topic
//                   "id": "...", //code of the topic
//                   "studyMaterialList": [
//                       {
//                           "studyMateriaId": "...",
//                           "url": "...",
//                           "name": "..."
//                       }
//                   ]
//               }
//           ]
//       }
//   }
// }}
//     if(dToIn.language.en) {
//   dtoIn.language.en= {
//   "studyForms": { 
//       "fulltime": {
//           "id": "...",
//           "studyMaterialList": [
//               "..."
//           ],
//           "topics": [
//               {
//                   "name": "...", 
//                   "desc": "...", 
//                   "id": "...", 
//                   "studyMaterialList": [
//                       {
//                           "studyMateriaId": "...",
//                           "url": "...",
//                           "name": "..."
//                       }
//                   ]
//               }
//           ]
//       },
//       "parttime": {
//           "id": "...",
//           "studyMaterialList": [
//               "..."
//           ],
//           "topics": [
//               {
//                   "name": "...", //name of the topic
//                   "desc": "...", //description of the topic
//                   "id": "...", //code of the topic
//                   "studyMaterialList": [
//                       {
//                           "studyMateriaId": "...",
//                           "url": "...",
//                           "name": "..."
//         }]}]}}}}
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
      throw new Errors.Get.SubmanDoesNotExist(uuAppErrorMap, { subjectId: dtoIn.id });
    }
   // hds 4
    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }


}

module.exports = new SubjectAbl();
