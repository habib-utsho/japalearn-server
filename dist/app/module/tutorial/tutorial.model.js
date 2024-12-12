"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: {
        type: String,
        required: true,
        match: /^(http|https):\/\/[^ "\n]+$/,
    },
    description: { type: String, default: '' },
    lesson: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });
const Tutorial = (0, mongoose_1.model)('Tutorial', tutorialSchema);
exports.default = Tutorial;
