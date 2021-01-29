"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudyMaterialMongo extends UuObjectDao {

  async createSchema(){
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(subject) {
    return await super.insertOne(subject);
  }

  async get(awid, id) {
    return await super.findOne({ awid, id });
  }
  
  async list(awid, pageInfo) {
    return await super.find({ awid }, pageInfo);
  }
}

module.exports = StudyMaterialMongo;
