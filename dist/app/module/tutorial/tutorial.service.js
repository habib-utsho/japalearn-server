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
exports.tutorialServices = void 0;
const tutorial_model_1 = __importDefault(require("./tutorial.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const tutorial_constant_1 = require("./tutorial.constant");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const insertTutorialToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.default.create(payload);
    return tutorial;
});
const getAllTutorials = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorialQuery = new QueryBuilder_1.default(tutorial_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort}` }))
        .searchQuery(tutorial_constant_1.tutorialSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery(['lesson']);
    const result = yield (tutorialQuery === null || tutorialQuery === void 0 ? void 0 : tutorialQuery.queryModel);
    const total = yield tutorial_model_1.default.countDocuments(tutorialQuery === null || tutorialQuery === void 0 ? void 0 : tutorialQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleTutorialById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.default.findById(id).populate('lesson').select('-__v');
    if (!tutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found');
    }
    return tutorial;
});
const updateTutorialById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    if (!tutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found');
    }
    return tutorial;
});
const deleteTutorialById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!tutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found');
    }
    return tutorial;
});
exports.tutorialServices = {
    insertTutorialToDb,
    getAllTutorials,
    getSingleTutorialById,
    updateTutorialById,
    deleteTutorialById,
};
