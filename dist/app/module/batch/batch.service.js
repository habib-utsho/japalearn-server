"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchServices = void 0;
const batch_model_1 = __importDefault(require("./batch.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const batch_constant_1 = require("./batch.constant");
const insertBatchToDb = (departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    // const isDeptExistInBatch = await Batch.findOne({department: departmentId})
    const totalBatch = yield batch_model_1.default.find({
        department: departmentId,
    }).countDocuments();
    const batch = yield batch_model_1.default.create({
        department: departmentId,
        batch: totalBatch ? totalBatch + 1 : 1,
        totalStudent: 0,
    });
    return batch;
});
const getAllBatch = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const batchQuery = new QueryBuilder_1.default(batch_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} totalStudent` }))
        .searchQuery(batch_constant_1.batchSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([
        {
            path: 'department',
        },
    ]);
    const result = yield (batchQuery === null || batchQuery === void 0 ? void 0 : batchQuery.queryModel);
    const total = yield batch_model_1.default.countDocuments(batchQuery === null || batchQuery === void 0 ? void 0 : batchQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleBatchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const batch = yield batch_model_1.default.findById(id)
        .populate({
        path: 'department',
        select: '-createdAt -updatedAt -__v',
        populate: {
            path: 'academicFaculty',
            select: '-createdAt -updatedAt -__v',
        },
    })
        .select('-__v');
    return batch;
});
exports.batchServices = {
    insertBatchToDb,
    getAllBatch,
    getSingleBatchById,
};
