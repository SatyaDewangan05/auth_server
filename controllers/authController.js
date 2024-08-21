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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.signIn = exports.verifyOTP = exports.signup = void 0;
var User_1 = __importDefault(require("../models/User"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var Otp_1 = __importDefault(require("../models/Otp"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var sendOTP = function (email, otp) { return __awaiter(void 0, void 0, void 0, function () {
    var transporter;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                return [4 /*yield*/, transporter.sendMail({
                        from: '"Satya Dewangan" <testercode404@gmail.com>',
                        to: email,
                        subject: "OTP Verification",
                        text: "Your OTP is ".concat(otp),
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, firstName, lastName, email, password, user, otp, otpData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("sign up data: ", req.body);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 10, , 11]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (user && user.verified) {
                    res.status(409).json({ message: "User already exists" });
                }
                otp = Math.floor(100000 + Math.random() * 900000);
                console.log("OTP: ", otp);
                return [4 /*yield*/, sendOTP(email, otp)];
            case 3:
                _b.sent();
                otpData = void 0;
                if (!!user) return [3 /*break*/, 5];
                user = new User_1.default({ firstName: firstName, lastName: lastName, email: email, password: password });
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                otpData = new Otp_1.default({ email: email, otp: otp });
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, Otp_1.default.findOne({ email: email })];
            case 6:
                otpData = _b.sent();
                if (otpData) {
                    otpData.otp = otp;
                }
                _b.label = 7;
            case 7:
                if (!otpData) return [3 /*break*/, 9];
                return [4 /*yield*/, otpData.save()];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                res.status(200).json({ message: "OTP sent to your email" });
                return [3 /*break*/, 11];
            case 10:
                error_1 = _b.sent();
                console.log("error: ", error_1);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var verifyOTP = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, otp, otpData, user, JWT_SECRET, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, otp = _a.otp;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4 /*yield*/, Otp_1.default.findOne({ email: email })];
            case 2:
                otpData = _b.sent();
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 3:
                user = _b.sent();
                if (!(otpData && otp === otpData.otp)) return [3 /*break*/, 6];
                user.verified = true; // Non-null assertion, make sure `user` is not null
                return [4 /*yield*/, user.save()];
            case 4:
                _b.sent();
                return [4 /*yield*/, Otp_1.default.deleteOne({ email: email })];
            case 5:
                _b.sent();
                JWT_SECRET = process.env.JWT_SECRET;
                token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({ message: "User verified", token: token });
                return [3 /*break*/, 7];
            case 6:
                res.status(400).json({ message: "Invalid OTP" });
                _b.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _b.sent();
                console.log("error: ", error_2);
                res.status(500).json({ message: "Server error" });
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.verifyOTP = verifyOTP;
var signIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var JWT_SECRET, _a, email, password, user, isMatch, token, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                JWT_SECRET = process.env.JWT_SECRET;
                _a = req.body, email = _a.email, password = _a.password;
                console.log("sign In data: ", req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 2:
                user = _b.sent();
                if (!!user) return [3 /*break*/, 3];
                res
                    .status(400)
                    .json({ success: false, message: "Invalid email or password" });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
            case 4:
                isMatch = _b.sent();
                if (!isMatch) {
                    res
                        .status(400)
                        .json({ success: false, message: "Invalid email or password" });
                }
                token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
                res.status(200).json({ success: true, token: token });
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_3 = _b.sent();
                console.log("error: ", error_3);
                res.status(500).json({ success: false, message: "Server error" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.signIn = signIn;
