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
exports.removeUserThatResponded = exports.acceptUserThatResponded = exports.addUserToRespondedBy = exports.getRequestHistory = exports.deleteRequest = exports.createRequest = exports.getFilteredRequests = void 0;
var path_1 = require("path");
var uploadRequestImages_1 = require("../utils/uploadRequestImages");
var Request_1 = __importDefault(require("../db/models/Request"));
var detelePhotos_1 = require("../utils/detelePhotos");
var grpc_client_1 = require("../grpc/grpc-client");
var User_1 = __importDefault(require("../db/models/User"));
var cloudinaryConfig_1 = require("../utils/cloudinaryConfig");
var moment_1 = __importDefault(require("moment"));
exports.getFilteredRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, fetchedRequests;
    return __generator(this, function (_a) {
        userId = req.params.userId;
        fetchedRequests = [];
        grpc_client_1.client.fetchRequestsNearby({ userId: userId }, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
            var requests;
            return __generator(this, function (_a) {
                if (err)
                    return [2, res.status(500).send({ err: err })];
                if (!data.requests.length) {
                    return [2, res.status(200).send(data.requests)];
                }
                requests = data.requests;
                requests.map(function (_a) {
                    var postId = _a.postId, distance = _a.distance;
                    return __awaiter(void 0, void 0, void 0, function () {
                        var request;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4, Request_1.default.findOne({
                                        _id: postId,
                                        completed: false,
                                    }).populate({
                                        path: 'requestedBy',
                                        select: 'name email profilePicture',
                                    })];
                                case 1:
                                    request = _b.sent();
                                    if (request) {
                                        fetchedRequests.push({
                                            request: request,
                                            distance: Math.ceil(distance),
                                        });
                                        if (fetchedRequests.length === requests.length) {
                                            res.status(200).send(fetchedRequests);
                                        }
                                    }
                                    else {
                                        return [2, res.status(200).send([])];
                                    }
                                    return [2];
                            }
                        });
                    });
                });
                return [2];
            });
        }); });
        return [2];
    });
}); };
exports.createRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var files, data, userId, newRequest, user, location_1, searchRadius, _id_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                files = [];
                data = JSON.parse(req.body.data);
                data['location'] = JSON.parse(data['location']);
                data['cost'] = parseInt(data['cost']);
                userId = req.body.uid;
                return [4, Request_1.default.create(data)];
            case 1:
                newRequest = _a.sent();
                if (!newRequest._id) return [3, 5];
                res.status(201).send(newRequest);
                if (!(Object.keys(req.files).length > 0)) return [3, 3];
                files = Object.keys(req.files).map(function (fieldname) {
                    return req.files[fieldname][0];
                });
                return [4, uploadRequestImages_1.uploadRequestImages(files, newRequest._id)];
            case 2:
                _a.sent();
                detelePhotos_1.deletePhotos(path_1.resolve(__dirname, "../../uploads/"));
                _a.label = 3;
            case 3: return [4, User_1.default.findById(newRequest.requestedBy)];
            case 4:
                user = _a.sent();
                location_1 = newRequest.location, searchRadius = newRequest.searchRadius, _id_1 = newRequest._id;
                if (JSON.stringify(user === null || user === void 0 ? void 0 : user.defaultLocation) === JSON.stringify(location_1)) {
                    grpc_client_1.client.forwardRequestNearbyDefaultLocation({ userId: userId, radius: searchRadius, postId: _id_1 }, function (err, data) {
                        if (err)
                            console.log("ERROR - " + err);
                        if (data.success) {
                            console.log("Created Req(default location) " + _id_1, data);
                        }
                    });
                }
                else {
                    grpc_client_1.client.forwardRequestNearbyCustomLocation({ userId: userId, location: location_1, radius: searchRadius, postId: _id_1 }, function (err, data) {
                        if (err)
                            console.log("ERROR - " + err);
                        if (data.success) {
                            console.log("Created Req(custom location) " + _id_1, data);
                        }
                    });
                }
                return [3, 6];
            case 5:
                res.status(500).send({ error: 'error creating request' });
                _a.label = 6;
            case 6: return [2];
        }
    });
}); };
exports.deleteRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, deletedRequest, deletedImages, user, location_2, searchRadius, _id_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestId = req.params.requestId;
                return [4, Request_1.default.findByIdAndDelete(requestId)];
            case 1:
                deletedRequest = _a.sent();
                if (!deletedRequest) return [3, 4];
                res.status(200).send({
                    success: true,
                    message: 'request was successfully deleted',
                });
                deletedImages = deletedRequest.images.map(function (img) { return "requests/" + img.name; });
                return [4, cloudinaryConfig_1.cloudinaryApi.delete_resources(deletedImages)];
            case 2:
                _a.sent();
                return [4, User_1.default.findById(deletedRequest.requestedBy)];
            case 3:
                user = _a.sent();
                location_2 = deletedRequest.location, searchRadius = deletedRequest.searchRadius, _id_2 = deletedRequest._id;
                grpc_client_1.client.deleteRequest({
                    userId: user === null || user === void 0 ? void 0 : user._id,
                    location: location_2,
                    radius: searchRadius,
                    postId: _id_2,
                }, function (err, data) {
                    if (err)
                        console.log("ERROR - " + err);
                    if (data.success) {
                        console.log("Deleted request " + _id_2, data);
                    }
                });
                return [3, 5];
            case 4:
                res.status(500).send({
                    success: false,
                    message: 'error deleting request',
                });
                _a.label = 5;
            case 5: return [2];
        }
    });
}); };
exports.getRequestHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, requests, necessaryRequestData, finalData_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4, Request_1.default.find({ requestedBy: userId })];
            case 1:
                requests = _a.sent();
                if (requests.length === 0) {
                    return [2, res.status(200).send([])];
                }
                else {
                    necessaryRequestData = requests.map(function (_a) {
                        var respondedBy = _a.respondedBy, _id = _a._id, title = _a.title, createdAt = _a.createdAt, cost = _a.cost, requestType = _a.requestType, completed = _a.completed, acceptedUser = _a.acceptedUser;
                        return ({
                            respondedBy: respondedBy,
                            _id: _id,
                            cost: cost,
                            createdAt: moment_1.default(createdAt).add(330, 'minutes').toISOString(),
                            title: title,
                            requestType: requestType,
                            completed: completed,
                            acceptedUser: acceptedUser,
                        });
                    });
                    finalData_1 = [];
                    necessaryRequestData.forEach(function (_a) {
                        var respondedBy = _a.respondedBy, _id = _a._id, cost = _a.cost, createdAt = _a.createdAt, title = _a.title, requestType = _a.requestType, completed = _a.completed, acceptedUser = _a.acceptedUser;
                        User_1.default.find({ _id: { $in: respondedBy } })
                            .select('name email contactNumber profilePicture')
                            .exec(function (err, user) {
                            if (err)
                                return res.status(200).send({
                                    request: { _id: _id, cost: cost, createdAt: createdAt, title: title },
                                    users: [],
                                });
                            finalData_1.push({
                                request: {
                                    _id: _id,
                                    cost: cost,
                                    createdAt: createdAt,
                                    title: title,
                                    requestType: requestType,
                                    acceptedUser: acceptedUser,
                                    completed: completed,
                                },
                                users: user,
                            });
                            if (finalData_1.length === requests.length) {
                                res.status(200).send(finalData_1);
                            }
                        });
                    });
                }
                return [2];
        }
    });
}); };
exports.addUserToRespondedBy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, requestId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, userId = _a.userId, requestId = _a.requestId;
                return [4, Request_1.default.findByIdAndUpdate(requestId, {
                        $addToSet: { respondedBy: userId },
                    })];
            case 1:
                _b.sent();
                res.status(200).send({ success: true });
                return [2];
        }
    });
}); };
exports.acceptUserThatResponded = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, requestId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, userId = _a.userId, requestId = _a.requestId;
                return [4, Request_1.default.findByIdAndUpdate(requestId, {
                        $set: { completed: true, acceptedUser: userId },
                    })];
            case 1:
                _b.sent();
                res.status(200).send({
                    success: true,
                    message: "successfully accepted response of user " + userId,
                });
                return [2];
        }
    });
}); };
exports.removeUserThatResponded = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, requestId;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, userId = _a.userId, requestId = _a.requestId;
                return [4, Request_1.default.findByIdAndUpdate(requestId, {
                        $set: { completed: false },
                        $pull: { respondedBy: userId },
                    })];
            case 1:
                _b.sent();
                res.status(200).send({
                    success: true,
                    message: "successfully declined response of user " + userId,
                });
                return [2];
        }
    });
}); };
