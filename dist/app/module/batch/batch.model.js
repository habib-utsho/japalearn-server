"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const batchSchema = new mongoose_1.Schema({
    batch: { type: Number, default: 1 },
    department: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AcademicDepartment' },
    totalStudent: { type: Number, default: 0 },
}, { timestamps: true });
const Batch = (0, mongoose_1.model)('Batch', batchSchema);
exports.default = Batch;
