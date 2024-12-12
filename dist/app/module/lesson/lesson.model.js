"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true, default: 0 },
    vocabularyCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const Lesson = (0, mongoose_1.model)('Lesson', lessonSchema);
exports.default = Lesson;
