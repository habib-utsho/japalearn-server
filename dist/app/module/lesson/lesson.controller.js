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
exports.lessonController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const lesson_service_1 = require("./lesson.service");
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertLesson = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lesson = yield lesson_service_1.lessonServices.insertLessonToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Lesson inserted successfully!',
        data: lesson,
    });
}));
const getAllLessons = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield lesson_service_1.lessonServices.getAllLessons(req.query);
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Lessons retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
const getLessonById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lesson = yield lesson_service_1.lessonServices.getSingleLessonById(Number((_a = req.params) === null || _a === void 0 ? void 0 : _a.lessonNumber));
    if (!lesson) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Lesson not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Lesson retrieved successfully!',
        data: lesson,
    });
}));
const updateLessonById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lessonId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const updatedLesson = yield lesson_service_1.lessonServices.updateLessonById(lessonId, req.body);
    if (!updatedLesson) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Lesson not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Lesson updated successfully!',
        data: updatedLesson,
    });
}));
const deleteLessonById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lessonId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const deletedLesson = yield lesson_service_1.lessonServices.deleteLessonById(lessonId);
    if (!deletedLesson) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Lesson not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Lesson deleted successfully!',
        data: deletedLesson,
    });
}));
exports.lessonController = {
    insertLesson,
    getAllLessons,
    getLessonById,
    updateLessonById,
    deleteLessonById,
};
