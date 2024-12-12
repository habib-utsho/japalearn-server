"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const tutorial_controller_1 = require("./tutorial.controller");
const tutorial_validate_1 = require("./tutorial.validate");
const router = (0, express_1.Router)();
exports.tutorialRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(tutorial_validate_1.createTutorialZodSchema), tutorial_controller_1.tutorialController.insertTutorial);
router.get('/', tutorial_controller_1.tutorialController.getAllTutorials);
router.get('/:id', tutorial_controller_1.tutorialController.getTutorialById);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), (0, zodValidateHandler_1.default)(tutorial_validate_1.updateTutorialZodSchema), tutorial_controller_1.tutorialController.updateTutorialById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN), tutorial_controller_1.tutorialController.deleteTutorialById);
