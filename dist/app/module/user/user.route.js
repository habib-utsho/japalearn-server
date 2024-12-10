"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post('/', uploadImgToCloudinary_1.upload.single('file'), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, zodValidateHandler_1.default)(user_validation_1.createUserZodSchema), user_controller_1.userController.insertUser);
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.ADMIN, user_constant_1.USER_ROLE.USER), user_controller_1.userController.getMe);
router.get('/', user_controller_1.userController.getAllUsers);
router.get('/:id', user_controller_1.userController.getUserById);
