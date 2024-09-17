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
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImage = exports.processImage = exports.uploadImage = void 0;
const imageService_1 = require("../utils/imageService");
const fileUtils_1 = require("../utils/fileUtils");
const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    if (!(0, fileUtils_1.isValidFileType)(req.file.mimetype)) {
        (0, fileUtils_1.deleteExpiredFiles)([req.file.path]);
        return res.status(400).json({ error: 'Invalid file type' });
    }
    const addUploadedFile = (0, fileUtils_1.setupFileCleanup)(5 * 60 * 1000, 15 * 60 * 1000);
    addUploadedFile(req.file.path);
    res.json({ filePath: req.file.path });
};
exports.uploadImage = uploadImage;
const processImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.body;
    try {
        const preview = yield (0, imageService_1.generatePreview)(params);
        res.json({ preview: `data:image/jpeg;base64,${preview.toString('base64')}` });
    }
    catch (error) {
        res.status(500).json({ error: 'Image processing failed' });
    }
});
exports.processImage = processImage;
const downloadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.query;
    if (!params.filePath || typeof params.filePath !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing filePath' });
    }
    try {
        const { buffer, format } = yield (0, imageService_1.processImageFile)(params);
        res.setHeader('Content-Disposition', `attachment; filename=processed_image.${format}`);
        res.setHeader('Content-Type', `image/${format}`);
        res.setHeader('Content-Length', buffer.length);
        res.send(buffer);
    }
    catch (error) {
        res.status(500).json({ error: 'Image processing failed' });
    }
});
exports.downloadImage = downloadImage;
