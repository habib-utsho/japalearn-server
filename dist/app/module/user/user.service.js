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
exports.userServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const user_model_1 = __importDefault(require("./user.model"));
const appError_1 = __importDefault(require("../../errors/appError"));
const mongoose_1 = __importDefault(require("mongoose"));
const uploadImgToCloudinary_1 = require("../../utils/uploadImgToCloudinary");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const insertUserToDb = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const alreadyExistEmail = yield user_model_1.default.findOne({ email: payload.email });
        if (alreadyExistEmail) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Email is already exist. Try with different email!');
        }
        const cloudinaryRes = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(`${Date.now()}-${payload.name}`, file.path);
        if (cloudinaryRes) {
            payload.profileImg = cloudinaryRes.secure_url;
        }
        const userData = {
            name: payload.name,
            email: payload.email,
            password: payload.password || process.env.STUDENT_DEFAULT_PASSWORD,
            needsPasswordChange: true,
            role: payload.role || 'user',
            profileImg: cloudinaryRes
                ? cloudinaryRes.secure_url
                : 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
        };
        // Save user
        const user = yield user_model_1.default.create([userData], { session });
        if (!(user === null || user === void 0 ? void 0 : user.length)) {
            throw new appError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to insert user to db');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return user[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(err);
    }
});
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} createdAt` }))
        .searchQuery(user_constant_1.userSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery()
        .populateQuery([]);
    const result = yield (userQuery === null || userQuery === void 0 ? void 0 : userQuery.queryModel);
    const total = yield user_model_1.default.countDocuments(userQuery === null || userQuery === void 0 ? void 0 : userQuery.queryModel.getFilter());
    return { data: result, total };
});
const toggleUserRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id);
    if (!user) {
        throw new appError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'User is not found!');
    }
    user.role = user.role === 'admin' ? 'user' : 'admin';
    yield user.save();
    return user;
});
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).select('-__v');
    return user;
});
const getSingleUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(id).select('-__v');
    return user;
});
const getMe = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ email: payload.email }).select('-__v');
    return result;
});
exports.userServices = {
    insertUserToDb,
    getAllUser,
    deleteUserById,
    toggleUserRoleById,
    getSingleUserById,
    getMe,
};
