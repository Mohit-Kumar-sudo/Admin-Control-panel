const createError = require("http-errors");
const Model = require("../Models/question.model");
const mongoose = require("mongoose");
const ModelName = "Content";
const moment = require("moment");

module.exports = {
  create: async (req, res, next) => {
    try {
      const data = req.body;
      data.instrument = data.instrument[0];
      data.partyRole = data.partyRole[0];
      data.created_by = req.user ? req.user : "unauth";
      data.updated_by = req.user ? req.user : "unauth";
      data.created_at = Date.now();
      const newData = new Model(data);
      const result = await newData.save();
      if (result) {
        res.send({ success: true, msg: "Data inserted successfully." });
      } else {
        res.send({ success: false, msg: "Failed to insert data." });
      }
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  },
  get: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest("Invalid Parameters");
      }
      const result = await Model.findById({ _id: mongoose.Types.ObjectId(id) });
      if (!result) {
        throw createError.NotFound(`No ${ModelName} Found`);
      }
      if (result) {
        res.send({ success: true, msg: "Detail Fetched", data: result });
      } else {
        res.send({ success: false, msg: "Failed to Fetch Detail" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const { name, is_active, page, limit, sort } = req.query;
      const _page = page ? parseInt(page) : 1;
      const _limit = limit ? parseInt(limit) : 20;
      const _skip = (_page - 1) * _limit;
      const _sort = sort ? sort : "+name";
      const query = {};
      if (name) {
        query.name = new RegExp(name, "i");
      }
      console.log(req.query);
      const result = await Model.aggregate([
        {
          $match: query,
        },
        {
          $skip: _skip,
        },
        {
          $sort: { created_at: -1 },
        },
      ]);
      if (result) {
        res.send({
          success: true,
          msg: "Data Fetched",
          data: result,
          count: result.length,
        });
      } else {
        res.send({ success: false, msg: "Failed to Fetch Data" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) {
        throw createError.BadRequest("Invalid Parameters");
      }
      if (!data) {
        throw createError.BadRequest("Invalid Parameters");
      }
      data.updated_at = Date.now();
      const result = await Model.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: data }
      );
      if (result) {
        res.send({ success: true, msg: "Data Updated Successfully" });
      } else {
        res.send({ success: false, msg: "Failed to Update Data" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest("Invalid Parameters");
      }
      const deleted_at = Date.now();
      const result = await Model.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { is_active: false, deleted_at } }
      );
      if (result) {
        res.send({ success: true, msg: "Data Deleted Successfully" });
      } else {
        res.send({ success: false, msg: "Failed to Delete Data" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },
  restore: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest("Invalid Parameters");
      }
      const restored_at = Date.now();
      const result = await Model.updateOne(
        { _id: mongoose.Types.ObjectId(id) },
        { $set: { is_active: true, restored_at } }
      );
      if (result) {
        res.send({ success: true, msg: "Data Restored Successfully" });
      } else {
        res.send({ success: false, msg: "Failed to Restore Data" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },

  getQuestions: async (req, res, next) => {
    try {
      const data = req.params;
      const userData = req.body;
      if (!data) {
        throw createError.BadRequest("Invalid Parameters");
      }
      let partyName = userData.customer_name;
      let document_id = userData.document_id;
      let deed_id = userData.deed_id;
      let dateAndTime = userData.dateAndTime;
      let photo_id = userData.photo_id;
      data.instrumentId = parseInt(data.instrumentId);
      data.partyTypeId = parseInt(data.partyTypeId);
      const question = await Model.find(
        {
          "instrument.id": data.instrumentId,
          "partyRole.partyTypeId": data.partyTypeId,
          videoKYCTypeEn: data.vkycType,
          is_active: true,
        },
        { questionEn: 1, questionHi: 1, videoKYCTypeEn: 1, videoKYCTypeHi: 1 }
      );
      if (question.length) {
        question.forEach((element) => {
          element.questionEn = element.questionEn.replace(
            /{#var#}/gi,
            partyName
          );
          element.questionEn = element.questionEn.replace(
            /{#var1#}/gi,
            deed_id
          );
          element.questionEn = element.questionEn.replace(
            /{#var2#}/gi,
            document_id
          );
          element.questionEn = element.questionEn.replace(
            /{#var3#}/gi,
            dateAndTime
          );
          element.questionEn = element.questionEn.replace(
            /{#var4#}/gi,
            photo_id
          );
          element.questionHi = element.questionHi.replace(
            /{#var#}/gi,
            partyName
          );
          element.questionHi = element.questionHi.replace(
            /{#var1#}/gi,
            deed_id
          );
          element.questionHi = element.questionHi.replace(
            /{#var2#}/gi,
            document_id
          );
          element.questionHi = element.questionHi.replace(
            /{#var3#}/gi,
            dateAndTime
          );
          element.questionHi = element.questionHi.replace(
            /{#var4#}/gi,
            photo_id
          );
        });
        function getRandomItem(question) {
          const randomIndex = Math.floor(Math.random() * question.length);
          const item = question[randomIndex];
          return item;
        }
        const result = getRandomItem(question);
        res.send({ success: true, data: result });
      } else {
        res.send({ success: false, msg: "No questions Found" });
      }
    } catch (error) {
      next(error);
    }
  },

  filterQuestion: async (req, res, next) => {
    try {
      const instrumentId = req.params.instrumentId;
      const partyTypeId = req.params.partyTypeId;
      if (!instrumentId) {
        throw createError.BadRequest("Please send Instrument Id");
      }
      if (!partyTypeId) {
        throw createError.BadRequest("Please send Party Type Id");
      }
      const result = await Model.find({ is_active: true });
      let newResult = result.filter((o) => {
        if (
          o.instrument.id == instrumentId &&
          o.partyRole.partyTypeId == partyTypeId
        ) {
          return o;
        }
      });
      if (newResult) {
        res.send({
          success: true,
          msg: "Data Fetched",
          data: newResult,
          count: newResult.length,
        });
      } else {
        res.send({ success: false, msg: "Failed to Fetch Data" });
      }
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Bad Request"));
      next(error);
    }
  },
};
