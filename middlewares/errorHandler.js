"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler = function (err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
};
exports.default = errorHandler;
