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
exports.tutorialController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const tutorial_service_1 = require("./tutorial.service");
const http_status_codes_1 = require("http-status-codes");
const appError_1 = __importDefault(require("../../errors/appError"));
const insertTutorial = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tutorial = yield tutorial_service_1.tutorialServices.insertTutorialToDb(req.body);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Tutorial inserted successfully!',
        data: tutorial,
    });
}));
const getAllTutorials = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, total } = yield tutorial_service_1.tutorialServices.getAllTutorials(req.query);
    const page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) ? Number(req.query.page) : 1;
    const limit = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) ? Number(req.query.limit) : 10;
    const totalPage = Math.ceil(total / limit);
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Tutorials retrieved successfully!',
        data,
        meta: { total, page, totalPage, limit },
    });
}));
const getTutorialById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tutorial = yield tutorial_service_1.tutorialServices.getSingleTutorialById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id);
    if (!tutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Tutorial retrieved successfully!',
        data: tutorial,
    });
}));
const updateTutorialById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tutorialId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const updatedTutorial = yield tutorial_service_1.tutorialServices.updateTutorialById(tutorialId, req.body);
    if (!updatedTutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Tutorial updated successfully!',
        data: updatedTutorial,
    });
}));
const deleteTutorialById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tutorialId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
    const deletedTutorial = yield tutorial_service_1.tutorialServices.deleteTutorialById(tutorialId);
    if (!deletedTutorial) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Tutorial not found!');
    }
    (0, sendResponse_1.default)(res, http_status_codes_1.StatusCodes.OK, {
        success: true,
        message: 'Tutorial deleted successfully!',
        data: deletedTutorial,
    });
}));
exports.tutorialController = {
    insertTutorial,
    getAllTutorials,
    getTutorialById,
    updateTutorialById,
    deleteTutorialById,
};
