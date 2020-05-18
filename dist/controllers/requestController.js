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
exports.getRequestHistory = exports.deleteRequest = exports.createRequest = exports.getFilteredRequests = void 0;
var Request_1 = __importDefault(require("../db/models/Request"));
var grpc_client_1 = require("../grpc/grpc-client");
exports.getFilteredRequests = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        userId = req.params.userId;
        grpc_client_1.client.fetchRequestsNearby({ userId: userId }, function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
            var requests, ids, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (err)
                            console.log(err);
                        requests = data.requests;
                        ids = requests.map(function (_a) {
                            var postId = _a.postId;
                            return postId;
                        });
                        return [4, Request_1.default.find({
                                reqUID: { $in: ids },
                            }, { searchRadius: 0 }).populate({
                                path: 'requestedBy',
                                select: 'name email profilePicture',
                            })];
                    case 1:
                        posts = _a.sent();
                        res.status(200).send(posts);
                        return [2];
                }
            });
        }); });
        return [2];
    });
}); };
exports.createRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(req.body);
        console.log(JSON.parse(req.body.data));
        res.json({ hi: 'testing' });
        return [2];
    });
}); };
exports.deleteRequest = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var requestId, deletedRequest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestId = req.params.requestId;
                return [4, Request_1.default.findByIdAndDelete(requestId)];
            case 1:
                deletedRequest = _a.sent();
                if (deletedRequest) {
                    res.status(200).send({
                        success: true,
                        message: 'request was successfully deleted',
                    });
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: 'error deleting request',
                    });
                }
                return [2];
        }
    });
}); };
exports.getRequestHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, requests;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4, Request_1.default.find({ requestedBy: userId })];
            case 1:
                requests = _a.sent();
                res.status(200).send(requests);
                return [2];
        }
    });
}); };
