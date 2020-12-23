"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {

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

  async delete(awid, id) {
    await super.deleteOne({ awid, id });
     
  }

  async update(uuObject) {
    let filter = { id: uuObject.id, awid: uuObject.awid };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
}

module.exports = SubjectMongo;
