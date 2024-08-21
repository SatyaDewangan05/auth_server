"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./config/db"));
var authRoutes_1 = __importDefault(require("./routes/authRoutes"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var authMiddleware_1 = require("./middlewares/authMiddleware");
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors")); // Import CORS middleware
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*", // Replace with your React app URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// Set view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
// Routes
app.use('/api/auth', authRoutes_1.default);
// User
app.use('/api/users', userRoutes_1.default);
// Protected Route (Welcome Page)
app.get('/welcome', authMiddleware_1.protect, function (req, res) {
    res.render('welcome', { user: req.user }); // TypeScript might not know about req.user
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () { return console.log("Server running on port ".concat(PORT)); });
