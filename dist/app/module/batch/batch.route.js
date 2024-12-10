"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchRouter = void 0;
const express_1 = require("express");
const batch_controller_1 = require("./batch.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const batch_validate_1 = require("./batch.validate");
const router = (0, express_1.Router)();
exports.batchRouter = router;
router.post('/', (0, zodValidateHandler_1.default)(batch_validate_1.createBatchZodSchema), batch_controller_1.batchController.insertBatch);
router.get('/', batch_controller_1.batchController.getAllBatches);
router.get('/:id', batch_controller_1.batchController.getBatchById);
