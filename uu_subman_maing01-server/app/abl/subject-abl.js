"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");
const ObjectId = require('mongodb').ObjectID;

const AUTHORITIES_PROFILE = "Authorities";

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.Get.UC_CODE}unsupportedKeys`,
  },
  listUnsupportedKeys: {
    code: `${Errors.List.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.Update.UC_CODE}unsupportedKeys`,
  },
  addTopicUnsupportedKeys: {
    code: `${Errors.AddTopic.UC_CODE}unsupportedKeys`,
  },
  deleteTopicUnsupportedKeys: {
    code: `${Errors.DeleteTopic.UC_CODE}unsupportedKeys`,
  },
  updateTopicUnsupportedKeys: {
    code: `${Errors.UpdateTopic.UC_CODE}unsupportedKeys`,
  },
  addStudyMaterialUnsupportedKeys: {
    code: `${Errors.AddStudyMaterial.UC_CODE}unsupportedKeys`,
  },

  deleteStudyMaterialUnsupportedKeys: {
    code: `${Errors.AddStudyMaterial.UC_CODE}unsupportedKeys`,
  }

};

class SubjectAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.subjectDao = DaoFactory.getDao("subject");
    this.studyMaterialDao = DaoFactory.getDao("studyMaterial");
  }

  async studyMaterialList(awid, dtoIn) {
        // hds 2, 2.1
        let validationResult = this.validator.validate("studyMaterialListDtoInType", dtoIn);
        // hds 2.2, 2.3, A4, A5
        let uuAppErrorMap = ValidationHelper.processValidationResult(
          dtoIn,
          validationResult,
          WARNINGS.getUnsupportedKeys.code,
          Errors.Get.InvalidDtoIn
        );
    
        let lang = dtoIn.language;
        let form = dtoIn.formOfStudy;
        // hds 3
        let subject = await this.dao.get(awid, dtoIn.id);
        let studyMaterialList = await this.studyMaterialDao.list()
        lang == "cs"
          ? form == "fulltime"
            ? subject = subject.language.cs.formOfStudy.fulltime.studyMaterialList
              : subject = subject.language.cs.formOfStudy.parttime.studyMaterialList
                : form == "fulltime"
            ? subject = subject.language.en.formOfStudy.fulltime.studyMaterialList
            : subject = subject.language.en.formOfStudy.parttime.studyMaterialList
               
        if (!subject) {
          throw new Errors.Get.SubjectDoesNotExist(uuAppErrorMap, { subjectId: dtoIn.id });
        }

       const result = studyMaterialList.itemList.filter(item => subject.includes((item.id).toHexString()));    
        // hds 4
        result.uuAppErrorMap = uuAppErrorMap;
        return result;
    
  }

  async deleteStudyMaterial(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectDeleteStudyMaterialDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteStudyMaterialUnsupportedKeys.code,
      Errors.DeleteStudyMaterial.InvalidDtoIn
    );

    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.DeleteStudyMaterial.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    // hds 4
    let lang = dtoIn.language;
    let form = dtoIn.formOfStudy;
    let x = dtoIn.data.id

    lang == "cs"
      ? form == "fulltime"
        ? subject.language.cs.formOfStudy.fulltime.studyMaterialList =
        subject.language.cs.formOfStudy.fulltime.studyMaterialList.filter(studyMaterialList => studyMaterialList !== x)
        : subject.language.cs.formOfStudy.parttime.studyMaterialList =
        subject.language.cs.formOfStudy.parttime.studyMaterialList.filter(studyMaterialList => studyMaterialList !== x)
      : form == "fulltime"
        ? subject.language.en.formOfStudy.fulltime.studyMaterialList =
        subject.language.en.formOfStudy.fulltime.studyMaterialList.filter(studyMaterialList => studyMaterialList !== x)
        : subject.language.en.formOfStudy.parttime.studyMaterialList =
        subject.language.en.formOfStudy.parttime.studyMaterialList.filter(studyMaterialList => studyMaterialList !== x)
    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(subject);
      dtoOut = await this.studyMaterialList(awid, {
        id :dtoIn.id,
        language: lang,
        formOfStudy: form
      })
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.DeleteStudyMaterial.SubjectDaoDeleteStudyMaterialFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

 
  async addStudyMaterial(awid, dtoIn) {

    let validationResult = this.validator.validate("subjectAddStudyMaterialDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.addStudyMaterialUnsupportedKeys.code,
      Errors.AddStudyMaterial.InvalidDtoIn
    );


    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.AddTopic.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    // hds 7rs

    let lang = dtoIn.language;
    let form = dtoIn.formOfStudy;
    let dtoInlink = dtoIn.data.baseUri.replace(/^https?:\/\/(www\.)?/, "")
    let studyMaterialId;
    let studyMaterials = await this.studyMaterialDao.list() 
    
    studyMaterials= studyMaterials.itemList.some(studyMaterials => {

      if (studyMaterials.baseUri.replace(/^https?:\/\/(www\.)?/, "") == dtoInlink) {
        studyMaterialId = studyMaterials.id;
      }
      return studyMaterials.baseUri.replace(/^https?:\/\/(www\.)?/, "") == dtoInlink
    });

    let id;
    
    let subjectStudyMaterials;
    lang == "cs"
      ? form == "fulltime"
        ? subjectStudyMaterials = subject.language.cs.formOfStudy.fulltime.studyMaterialList
          .some(subjectStudyMaterials => {
            id = subjectStudyMaterials
            return subjectStudyMaterials == studyMaterialId
          }) : subjectStudyMaterials = subject.language.cs.formOfStudy.parttime.studyMaterialList
            .some(subjectStudyMaterials => {
              return subjectStudyMaterials == studyMaterialId
            }) : form == "fulltime"
        ? subjectStudyMaterials = subject.language.en.formOfStudy.fulltime.studyMaterialList
          .some(subjectStudyMaterials => {
            return subjectStudyMaterials == studyMaterialId
          }) : subjectStudyMaterials = subject.language.en.formOfStudy.parttime.studyMaterialList
            .some(subjectStudyMaterials => {
              return subjectStudyMaterials == studyMaterialId
            })
    let dtoOut;
    let dtoOut2;
    
      if (!studyMaterials) {
        try {
        dtoIn.awid = awid;
        dtoOut = await this.studyMaterialDao.create(dtoIn.data) 

      }catch (e) {
        if (e instanceof ObjectStoreError) {
          // A10
          throw new Errors.AddStudyMaterial.SubjectDaoAddStudyMaterialFailed({ uuAppErrorMap }, e);
        }
        throw e;
      } 
      studyMaterialId = dtoOut.id
      dtoOut.uuAppErrorMap = uuAppErrorMap;
    }
      if ( !subjectStudyMaterials) {
        
        try{
          dtoIn.awid = awid;
        let lang = dtoIn.language;
        let form = dtoIn.formOfStudy;
studyMaterialId = studyMaterialId.toHexString()
        lang == "cs"
          ? form == "fulltime"
            ? subject.language.cs.formOfStudy.fulltime.studyMaterialList.push( studyMaterialId )
            : subject.language.cs.formOfStudy.parttime.studyMaterialList.push( studyMaterialId)
          : form == "fulltime"
            ? subject.language.en.formOfStudy.fulltime.studyMaterialList.push(studyMaterialId )
            : subject.language.en.formOfStudy.parttime.studyMaterialList.push( studyMaterialId);
         
      //  dtoOut2 = await this.dao.update(subject),
        dtoOut = await this.dao.update(subject),
        dtoOut = await this.studyMaterialList(awid, {
          id :dtoIn.id,
          language: lang,
          formOfStudy: form
        })
        }
      
     catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.AddStudyMaterial.SubjectDaoAddStudyMaterialFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
 // dtoOut2.uuAppErrorMap = uuAppErrorMap
 dtoOut.uuAppErrorMap = uuAppErrorMap
}else {

  try {
    dtoOut = await this.studyMaterialList(awid, {
      id :dtoIn.id,
      language: lang,
      formOfStudy: form
    })
    
  } catch (e) {
    if (e instanceof ObjectStoreError) {
      // A10
     
      throw new Errors.AddStudyMaterial.SubjectDaoAddStudyMaterialFailed({ uuAppErrorMap }, e);
    }
    throw e
  }
  dtoOut.uuAppErrorMap = uuAppErrorMap
 // 
}     
    // hds 8   
    return  dtoOut
      
  }


  async updateTopic(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectUpdateTopicDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateTopicUnsupportedKeys.code,
      Errors.UpdateTopic.InvalidDtoIn
    );

    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.UpdateTopic.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    // hds 4

    // hds 7rs
    let lang = dtoIn.language;
    let form = dtoIn.formOfStudy;
    // let x = subject.language.cs.formOfStudy.parttime.topics.pop()
    let x = dtoIn.data.id
    lang == "cs"
      ? form == "fulltime"
        ? subject.language.cs.formOfStudy.fulltime.topics =
        subject.language.cs.formOfStudy.fulltime.topics.map(topic => topic.id == x ? dtoIn.data : topic)
        : subject.language.cs.formOfStudy.parttime.topics =
        subject.language.cs.formOfStudy.parttime.topics.map(topic => topic.id == x ? dtoIn.data : topic)
      : form == "fulltime"
        ? subject.language.en.formOfStudy.fulltime.topics =
        subject.language.en.formOfStudy.fulltime.topics.map(topic => topic.id == x ? dtoIn.data : topic)
        : subject.language.en.formOfStudy.parttime.topics =
        subject.language.en.formOfStudy.parttime.topics.map(topic => topic.id == x ? dtoIn.data : topic)
    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(subject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.UpdateTopic.SubjectDaoUpdateTopicFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }



  async deleteTopic(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectDeleteTopicDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteTopicUnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.DeleteTopic.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }


    // hds 7rs
    let lang = dtoIn.language;
    let form = dtoIn.formOfStudy;
    // let x = subject.language.cs.formOfStudy.parttime.topics.pop()
    let x = dtoIn.data.id



    lang == "cs"
      ? form == "fulltime"
        ? subject.language.cs.formOfStudy.fulltime.topics =
        subject.language.cs.formOfStudy.fulltime.topics.filter(topic => topic.id !== x)
        : subject.language.cs.formOfStudy.parttime.topics =
        subject.language.cs.formOfStudy.parttime.topics.filter(topic => topic.id !== x)
      : form == "fulltime"
        ? subject.language.en.formOfStudy.fulltime.topics =
        subject.language.en.formOfStudy.fulltime.topics.filter(topic => topic.id !== x)
        : subject.language.en.formOfStudy.parttime.topics =
        subject.language.en.formOfStudy.parttime.topics.filter(topic => topic.id !== x)
    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(subject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.DeleteTopic.SubjectDaoDeleteTopicFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    // hds 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

  async addTopic(awid, dtoIn) {
    let validationResult = this.validator.validate("subjectAddTopicDtoInType", dtoIn);
    // hds 2.2, 2.3, A3, A4
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.addTopicUnsupportedKeys.code,
      Errors.AddTopic.InvalidDtoIn
    );

    // hds 3
    let subject = await this.dao.get(awid, dtoIn.id);
    // A5
    if (!subject) {
      throw new Errors.AddTopic.SubjectDoesNotExist({ uuAppErrorMap }, { subjectId: dtoIn.id });
    }

    // hds 7rs
    let lang = dtoIn.language;
    let form = dtoIn.formOfStudy;
    // let x = subject.language.cs.formOfStudy.parttime.topics.pop()
    let newTopic = {
      id: ObjectId().toHexString(),
      name: "",
      desc: "example",
      studyMaterialList: [{ baseUri: "", name: "" , type: "books"}]
    }

    lang == "cs"
      ? form == "fulltime"
        ? subject.language.cs.formOfStudy.fulltime.topics.push(newTopic)
        : subject.language.cs.formOfStudy.parttime.topics.push(newTopic)
      : form == "fulltime"
        ? subject.language.en.formOfStudy.fulltime.topics.push(newTopic)
        : subject.language.en.formOfStudy.parttime.topics.push(newTopic);
    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(subject);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        // A10
        throw new Errors.AddTopic.SubjectDaoAddTopicFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
    // hds 8
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
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
    let dtoOut = {};
    dtoOut.uuAppErrorMap = uuAppErrorMap;
    return dtoOut;
  }

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

    let dtoOut = await this.dao.list(awid);
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
      formOfStudy: {
        fulltime: {
          id: "1",
          studyMaterialList: [],
          topics: [
            {
              name: "Example fulltime",
              desc: "Lorem Ipsum",
              id: "00",
              studyMaterialList: [{ baseUri: "", name: "" , type: "books"}],
            },
          ],
        },
        parttime: {
          id: "2",
          studyMaterialList: [],
          topics: [
            {
              name: "Example parttime",
              desc: "lorem Ipsum",
              id: "00",
              studyMaterialList: [{ baseUri: "", name: "" , type: "books"}],
            },
          ],
        },
      },
    };

    dtoIn.language = { cs: studyForms, en: studyForms };
    dtoIn.students = [{ uuIdentity: "", formOfStudy: "fulltime" }];


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
