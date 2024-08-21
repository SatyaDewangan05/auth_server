"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var router = express_1.default.Router();
router.post('/signup', authController_1.signup);
router.post('/verify-otp', authController_1.verifyOTP);
router.post('/signin', authController_1.signIn);
exports.default = router;
