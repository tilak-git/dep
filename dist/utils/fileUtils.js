"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFileCleanup = exports.isValidFileType = exports.deleteExpiredFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const deleteExpiredFiles = (filePaths) => {
    filePaths.forEach(filePath => {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}:`, err);
            }
            else {
                console.log(`Deleted expired file: ${filePath}`);
            }
        });
    });
};
exports.deleteExpiredFiles = deleteExpiredFiles;
const isValidFileType = (mimeType) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    return allowedTypes.includes(mimeType);
};
exports.isValidFileType = isValidFileType;
const setupFileCleanup = (interval, expirationTime) => {
    const uploadedFiles = [];
    setInterval(() => {
        const now = Date.now();
        const expiredFiles = uploadedFiles.filter(file => now - file.timestamp > expirationTime);
        (0, exports.deleteExpiredFiles)(expiredFiles.map(file => file.path));
        const remainingFiles = uploadedFiles.filter(file => now - file.timestamp <= expirationTime);
        uploadedFiles.length = 0;
        uploadedFiles.push(...remainingFiles);
    }, interval);
    return (filePath) => {
        uploadedFiles.push({ path: filePath, timestamp: Date.now() });
    };
};
exports.setupFileCleanup = setupFileCleanup;
