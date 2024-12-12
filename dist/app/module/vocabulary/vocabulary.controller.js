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
exports.vocabularyController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const vocabulary_service_1 = require("./vocabulary.service");
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertVocabulary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vocabulary = yield vocabulary_service_1.vocabularyServices.insertVocabularyToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Vocabulary inserted successfully!',
        data: vocabulary,
    });
}));
const getAllVocabulary = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield vocabulary_service_1.vocabularyServices.getAllVocabulary(req.query);
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Vocabulary retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
const getVocabularyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vocabulary = yield vocabulary_service_1.vocabularyServices.getSingleVocabularyById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!vocabulary) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Vocabulary not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Vocabulary retrieved successfully!',
        data: vocabulary,
    });
}));
const updateVocabularyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vocabularyId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const updatedVocabulary = yield vocabulary_service_1.vocabularyServices.updateVocabularyById(vocabularyId, req.body);
    if (!updatedVocabulary) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Vocabulary not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Vocabulary updated successfully!',
        data: updatedVocabulary,
    });
}));
const deleteVocabularyById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const vocabularyId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const deletedVocabulary = yield vocabulary_service_1.vocabularyServices.deleteVocabularyById(vocabularyId);
    if (!deletedVocabulary) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Vocabulary not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Vocabulary deleted successfully!',
        data: deletedVocabulary,
    });
}));
exports.vocabularyController = {
    insertVocabulary,
    getAllVocabulary,
    getVocabularyById,
    updateVocabularyById,
    deleteVocabularyById,
};
