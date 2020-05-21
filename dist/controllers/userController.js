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
exports.getUserData = exports.postUserCoordinates = exports.updateProfile = exports.registerUser = exports.loginOrSignUp = void 0;
var User_1 = __importDefault(require("../db/models/User"));
var google_auth_library_1 = require("google-auth-library");
var cloudinaryConfig_1 = require("../utils/cloudinaryConfig");
var path_1 = require("path");
var detelePhotos_1 = require("../utils/detelePhotos");
var client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.loginOrSignUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idToken, ticket, payload, email, name_1, picture, sub, newUser, existingUser, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idToken = req.body.idToken;
                return [4, client.verifyIdToken({
                        idToken: idToken,
                        audience: process.env.GOOGLE_CLIENT_ID,
                    })];
            case 1:
                ticket = _a.sent();
                payload = ticket.getPayload();
                if (!(payload !== undefined)) return [3, 6];
                email = payload.email, name_1 = payload.name, picture = payload.picture, sub = payload.sub;
                newUser = {
                    email: email,
                    name: name_1,
                    profilePicture: picture,
                    googleId: sub,
                };
                return [4, User_1.default.findOne({ email: email })];
            case 2:
                existingUser = _a.sent();
                if (!existingUser) return [3, 3];
                res.status(200).send({ newUser: false, user: existingUser });
                return [3, 5];
            case 3: return [4, User_1.default.create(newUser)];
            case 4:
                user = _a.sent();
                res.status(201).send({ newUser: true, user: user });
                _a.label = 5;
            case 5: return [3, 7];
            case 6:
                res.status(406).send({ error: 'invalid token' });
                _a.label = 7;
            case 7: return [2];
        }
    });
}); };
exports.registerUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, defaultSearchRadius, defaultLocation, contactNumber, id, registeredUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, address = _a.address, defaultSearchRadius = _a.defaultSearchRadius, defaultLocation = _a.defaultLocation, contactNumber = _a.contactNumber, id = _a.id;
                return [4, User_1.default.findByIdAndUpdate(id, {
                        $set: { address: address, defaultLocation: defaultLocation, defaultSearchRadius: defaultSearchRadius, contactNumber: contactNumber },
                    })];
            case 1:
                registeredUser = _b.sent();
                res.status(201).send(registeredUser);
                return [2];
        }
    });
}); };
exports.updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        console.log(req.body);
        userId = req.params.userId;
        cloudinaryConfig_1.uploader.upload(path_1.resolve(__dirname, "../../uploads/" + userId + "-" + req.file.originalname + ".jpeg"), {
            resource_type: 'image',
            public_id: "profilePhotos/" + userId,
            overwrite: true,
        }, function (error, result) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (error)
                            throw error;
                        res.status(200).send({ imageURL: result === null || result === void 0 ? void 0 : result.secure_url });
                        return [4, User_1.default.findByIdAndUpdate(userId, {
                                $set: {
                                    profilePicture: result === null || result === void 0 ? void 0 : result.secure_url,
                                    cloudinaryPublicId: result === null || result === void 0 ? void 0 : result.public_id,
                                },
                            })];
                    case 1:
                        _a.sent();
                        detelePhotos_1.deletePhotos(path_1.resolve(__dirname, "../../uploads/"));
                        return [2];
                }
            });
        }); });
        return [2];
    });
}); };
exports.postUserCoordinates = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req.body);
        res.status(200).send(req.body);
        return [2];
    });
}); };
exports.getUserData = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4, User_1.default.findById(userId, { address: 0 })];
            case 1:
                user = _a.sent();
                res.status(200).send(user);
                return [2];
        }
    });
}); };
