"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudyMaterialsMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(studyMaterial) {
    return await super.insertOne(studyMaterial);
  }

}

module.exports = StudyMaterialsMongo;
