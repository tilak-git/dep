"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const imageController_1 = require("../controller/imageController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.post('/upload', upload.single('image'), imageController_1.uploadImage);
router.post('/process', imageController_1.processImage);
router.get('/download', imageController_1.downloadImage);
exports.default = router;
