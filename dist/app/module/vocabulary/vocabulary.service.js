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
exports.vocabularyServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const vocabulary_constant_1 = require("./vocabulary.constant");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const vocabulary_model_1 = require("./vocabulary.model");
const lesson_model_1 = __importDefault(require("../lesson/lesson.model"));
const insertVocabularyToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingVocabulary = yield vocabulary_model_1.Vocabulary.findOne({ name: payload.word });
    if (existingVocabulary) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Vocabulary already exists');
    }
    const lesson = yield lesson_model_1.default.findOne({
        number: payload.lessonNumber,
    });
    if (!lesson) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson not found with this lesson number');
    }
    lesson.vocabularyCount += 1;
    yield lesson.save();
    const vocabulary = yield vocabulary_model_1.Vocabulary.create(payload);
    return vocabulary;
});
const getAllVocabulary = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabularyQuery = new QueryBuilder_1.default(vocabulary_model_1.Vocabulary.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort}` }))
        .searchQuery(vocabulary_constant_1.vocabularySearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery();
    const result = yield (vocabularyQuery === null || vocabularyQuery === void 0 ? void 0 : vocabularyQuery.queryModel);
    const total = yield vocabulary_model_1.Vocabulary.countDocuments(vocabularyQuery === null || vocabularyQuery === void 0 ? void 0 : vocabularyQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleVocabularyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = yield vocabulary_model_1.Vocabulary.findById(id).select('-__v');
    return vocabulary;
});
const updateVocabularyById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.lessonNumber) {
        const lesson = yield lesson_model_1.default.findOne({
            number: payload.lessonNumber,
        });
        if (!lesson) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson not found with this lesson number');
        }
        const vocabulary = yield vocabulary_model_1.Vocabulary.findById(id);
        if (vocabulary) {
            if (vocabulary.lessonNumber !== payload.lessonNumber) {
                const oldLesson = yield lesson_model_1.default.findOne({
                    number: vocabulary.lessonNumber,
                });
                if (oldLesson) {
                    oldLesson.vocabularyCount -= 1;
                    yield oldLesson.save();
                }
                lesson.vocabularyCount += 1;
                yield lesson.save();
            }
        }
        else {
            throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Vocabulary not found with this id');
        }
    }
    const vocabulary = yield vocabulary_model_1.Vocabulary.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!vocabulary) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Vocabulary not found!');
    }
    return vocabulary;
});
const deleteVocabularyById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = yield vocabulary_model_1.Vocabulary.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return vocabulary;
});
exports.vocabularyServices = {
    insertVocabularyToDb,
    getAllVocabulary,
    getSingleVocabularyById,
    updateVocabularyById,
    deleteVocabularyById,
};
