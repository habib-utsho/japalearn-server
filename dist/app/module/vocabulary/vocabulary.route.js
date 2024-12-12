"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularyRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const vocabulary_validate_1 = require("./vocabulary.validate");
const vocabulary_controller_1 = require("./vocabulary.controller");
const router = (0, express_1.Router)();
exports.vocabularyRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(vocabulary_validate_1.createVocabularyZodSchema), vocabulary_controller_1.vocabularyController.insertVocabulary);
router.get('/', vocabulary_controller_1.vocabularyController.getAllVocabulary);
router.get('/:id', vocabulary_controller_1.vocabularyController.getVocabularyById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(vocabulary_validate_1.updateVocabularyZodSchema), vocabulary_controller_1.vocabularyController.updateVocabularyById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), vocabulary_controller_1.vocabularyController.deleteVocabularyById);
