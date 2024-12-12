"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const lesson_validate_1 = require("./lesson.validate");
const lesson_controller_1 = require("./lesson.controller");
const router = (0, express_1.Router)();
exports.lessonRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(lesson_validate_1.createLessonZodSchema), lesson_controller_1.lessonController.insertLesson);
router.get('/', lesson_controller_1.lessonController.getAllLessons);
router.get('/:lessonNumber', lesson_controller_1.lessonController.getLessonById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(lesson_validate_1.updateLessonZodSchema), lesson_controller_1.lessonController.updateLessonById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), lesson_controller_1.lessonController.deleteLessonById);
