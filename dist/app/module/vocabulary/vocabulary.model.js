"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vocabulary = void 0;
const mongoose_1 = require("mongoose");
const vocabularySchema = new mongoose_1.Schema({
    word: { type: String, required: true },
    meaning: { type: String, required: true },
    pronunciation: { type: String, required: true },
    whenToSay: { type: String, required: true },
    lessonNumber: { type: Number, required: true, default: 0 },
    adminEmail: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
});
const Vocabulary = (0, mongoose_1.model)('Vocabulary', vocabularySchema);
exports.Vocabulary = Vocabulary;
