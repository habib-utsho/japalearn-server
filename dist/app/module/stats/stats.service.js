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
exports.statsService = void 0;
const lesson_model_1 = __importDefault(require("../lesson/lesson.model"));
const tutorial_model_1 = __importDefault(require("../tutorial/tutorial.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const vocabulary_model_1 = require("../vocabulary/vocabulary.model");
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const totalUsers = yield user_model_1.default.find({ role: 'user' }).countDocuments();
    const totalAdmins = yield user_model_1.default.find({ role: 'admin' }).countDocuments();
    const totalLesson = yield lesson_model_1.default.countDocuments();
    const totalVocabulary = yield vocabulary_model_1.Vocabulary.countDocuments();
    const totalTutorials = yield tutorial_model_1.default.countDocuments();
    return {
        totalUsers,
        totalAdmins,
        totalLesson,
        totalVocabulary,
        totalTutorials,
    };
});
exports.statsService = {
    getAdminStats,
};
