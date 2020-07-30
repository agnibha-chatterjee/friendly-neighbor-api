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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.updateProfile = exports.registerUser = exports.loginOrSignUp = void 0;
var User_1 = __importDefault(require("../db/models/User"));
var cloudinaryConfig_1 = require("../utils/cloudinaryConfig");
var path_1 = require("path");
var compressImage_1 = require("../utils/compressImage");
var detelePhotos_1 = require("../utils/detelePhotos");
var moment_1 = __importDefault(require("moment"));
var grpc_client_1 = require("../grpc/grpc-client");
exports.loginOrSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, user, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.body._id;
                return [4, User_1.default.findById(_id)];
            case 1:
                user = _a.sent();
                if (!user) return [3, 2];
                res.status(200).send({ newUser: false, user: user });
                return [3, 4];
            case 2: return [4, User_1.default.create(req.body)];
            case 3:
                newUser = _a.sent();
                res.status(201).send({ newUser: true, user: newUser });
                _a.label = 4;
            case 4: return [2];
        }
    });
}); };
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, username, defaultLocation, address, defaultSearchRadius, _id, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, username = _a.username, defaultLocation = _a.defaultLocation, address = _a.address, defaultSearchRadius = _a.defaultSearchRadius, _id = _a._id;
                return [4, User_1.default.findByIdAndUpdate(_id, {
                        $set: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            username: username,
                            defaultLocation: defaultLocation,
                            address: address,
                            defaultSearchRadius: defaultSearchRadius,
                        },
                    })];
            case 1:
                _b.sent();
                return [4, User_1.default.findById(_id).select({
                        defaultLocation: 0,
                        defaultSearchRadius: 0,
                        address: 0,
                    })];
            case 2:
                user = _b.sent();
                if ((user === null || user === void 0 ? void 0 : user.email) && (user === null || user === void 0 ? void 0 : user.username) && (user === null || user === void 0 ? void 0 : user.lastName) && (user === null || user === void 0 ? void 0 : user.firstName)) {
                    res.status(201).send({ success: true, user: user });
                }
                else {
                    res.status(500).send({ success: false });
                }
                return [2];
        }
    });
}); };
exports.updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, name, contactNumber, address, defaultLocation, defaultSearchRadius, user, daysSinceLastEdit;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.params.userId;
                _a = req.file ? JSON.parse(req.body.data) : req.body, name = _a.name, contactNumber = _a.contactNumber, address = _a.address, defaultLocation = _a.defaultLocation, defaultSearchRadius = _a.defaultSearchRadius;
                return [4, User_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                if (!(name !== (user === null || user === void 0 ? void 0 : user.username))) return [3, 6];
                if (!((user === null || user === void 0 ? void 0 : user.lastModified) === '')) return [3, 3];
                return [4, User_1.default.findByIdAndUpdate(userId, {
                        $set: { name: name, lastModified: moment_1.default().toISOString() },
                    })];
            case 2:
                _b.sent();
                return [3, 6];
            case 3:
                daysSinceLastEdit = moment_1.default().diff(moment_1.default(user === null || user === void 0 ? void 0 : user.lastModified), 'days');
                if (!(daysSinceLastEdit < 365)) return [3, 4];
                return [2, res.send({
                        error: 'You can change your name every 365 days. Please try again!',
                    })];
            case 4: return [4, User_1.default.findByIdAndUpdate(userId, {
                    $set: { name: name, lastModified: moment_1.default().toISOString() },
                })];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                if (!!req.file) return [3, 8];
                return [4, User_1.default.findByIdAndUpdate(userId, {
                        $set: {
                            name: name,
                            contactNumber: contactNumber,
                            defaultLocation: defaultLocation,
                            defaultSearchRadius: defaultSearchRadius,
                            address: address,
                        },
                    })];
            case 7:
                _b.sent();
                res.status(200).send({ success: true });
                return [3, 10];
            case 8: return [4, compressImage_1.compressImage(userId, req.file)];
            case 9:
                _b.sent();
                cloudinaryConfig_1.uploader.upload(path_1.resolve(__dirname, "../../uploads/" + userId + "-" + req.file.originalname + ".jpeg"), {
                    resource_type: 'image',
                    public_id: "profilePhotos/" + userId,
                    overwrite: true,
                }, function (error, result) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error)
                                    console.log("CLOUDINARY-ERROR - " + error);
                                res.status(200).send({
                                    profilePicture: result === null || result === void 0 ? void 0 : result.secure_url,
                                    success: true,
                                });
                                return [4, User_1.default.findByIdAndUpdate(userId, {
                                        $set: {
                                            profilePicture: result === null || result === void 0 ? void 0 : result.secure_url,
                                            cloudinaryPublicId: result === null || result === void 0 ? void 0 : result.public_id,
                                            name: name,
                                            contactNumber: contactNumber,
                                            defaultLocation: defaultLocation,
                                            defaultSearchRadius: defaultSearchRadius,
                                            address: address,
                                        },
                                    })];
                            case 1:
                                _a.sent();
                                detelePhotos_1.deletePhotos(path_1.resolve(__dirname, "../../uploads/"));
                                return [2];
                        }
                    });
                }); });
                _b.label = 10;
            case 10:
                grpc_client_1.client.saveUserLocation({
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    location: defaultLocation,
                    radius: defaultSearchRadius,
                }, function (err, data) {
                    if (err)
                        console.log("ERROR - " + err);
                    if (data.success) {
                        console.log("Updated user - " + (user === null || user === void 0 ? void 0 : user._id), data);
                    }
                });
                return [2];
        }
    });
}); };
exports.getUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, daysSinceLastEdit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4, User_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                if ((user === null || user === void 0 ? void 0 : user.lastModified) === '') {
                    return [2, res.status(200).send({ user: user, canChangeName: true })];
                }
                else {
                    daysSinceLastEdit = moment_1.default().diff(moment_1.default(user === null || user === void 0 ? void 0 : user.lastModified), 'days');
                    if (daysSinceLastEdit < 365) {
                        return [2, res.status(200).send({ user: user, canChangeName: false })];
                    }
                    else {
                        return [2, res.status(200).send({ user: user, canChangeName: true })];
                    }
                }
                return [2];
        }
    });
}); };
