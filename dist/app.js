"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../config/config.env') });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var morgan_1 = __importDefault(require("morgan"));
var connectDB_1 = __importDefault(require("./db/connectDB"));
var cloudinaryConfig_1 = require("./utils/cloudinaryConfig");
var errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
var app = express_1.default();
connectDB_1.default();
cloudinaryConfig_1.initializeCloudinary();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('tiny'));
}
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/users', userRoutes_1.default);
app.use('/api/requests', requestRoutes_1.default);
app.use(errorHandler_1.default);
var PORT = process.env.PORT || 5000;
var server = app.listen(PORT, function () {
    return console.log("Server is  running on port " + PORT);
});
process.on('unhandledRejection', function (err, promise) {
    console.log("Error " + err.message);
    server.close(function () { return process.exit(1); });
});
