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
exports.lessonServices = void 0;
const lesson_model_1 = __importDefault(require("./lesson.model"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const lesson_constant_1 = require("./lesson.constant");
const appError_1 = __importDefault(require("../../errors/appError"));
const http_status_codes_1 = require("http-status-codes");
const insertLessonToDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingLesson = yield lesson_model_1.default.findOne({ name: payload.name });
    if (existingLesson) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson name already exists');
    }
    const existingLessonNumber = yield lesson_model_1.default.findOne({ number: payload.number });
    if (existingLessonNumber) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson number already exists');
    }
    const lesson = yield lesson_model_1.default.create(payload);
    return lesson;
});
const getAllLessons = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const lessonQuery = new QueryBuilder_1.default(lesson_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort}` }))
        .searchQuery(lesson_constant_1.lessonSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (lessonQuery === null || lessonQuery === void 0 ? void 0 : lessonQuery.queryModel);
    const total = yield lesson_model_1.default.countDocuments(lessonQuery === null || lessonQuery === void 0 ? void 0 : lessonQuery.queryModel.getFilter());
    return { data: result, total };
});
const getSingleLessonById = (lessonNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_model_1.default.findOne({ number: lessonNumber }).select('-__v');
    return lesson;
});
const updateLessonById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name) {
        const existingLesson = yield lesson_model_1.default.findOne({ name: payload.name });
        if (existingLesson && existingLesson._id.toString() !== id) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson name already exists');
        }
    }
    if (payload.number) {
        const existingLesson = yield lesson_model_1.default.findOne({ number: payload.number });
        if (existingLesson && existingLesson._id.toString() !== id) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Lesson number already exists');
        }
    }
    const lesson = yield lesson_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return lesson;
});
const deleteLessonById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return lesson;
});
exports.lessonServices = {
    insertLessonToDb,
    getAllLessons,
    getSingleLessonById,
    updateLessonById,
    deleteLessonById,
};
