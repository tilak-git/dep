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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePreview = exports.processImageFile = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const processImageFile = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { filePath, brightness, contrast, saturation, rotation, format } = params;
    if (!fs_1.default.existsSync(filePath)) {
        throw new Error('File not found');
    }
    const image = (0, sharp_1.default)(filePath)
        .rotate(Number(rotation))
        .modulate({
        brightness: Number(brightness),
        saturation: Number(saturation)
    })
        .linear(Number(contrast), -(128 * Number(contrast)) + 128);
    let buffer;
    if (format === 'png') {
        buffer = yield image.png({ compressionLevel: 9 }).toBuffer();
    }
    else {
        buffer = yield image.jpeg({ quality: 90 }).toBuffer();
    }
    return { buffer, format };
});
exports.processImageFile = processImageFile;
const generatePreview = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { filePath, brightness, contrast, saturation, rotation } = params;
    const image = (0, sharp_1.default)(filePath)
        .rotate(rotation)
        .modulate({
        brightness: brightness,
        saturation: saturation
    })
        .linear(contrast, -(128 * contrast) + 128);
    return image
        .resize(300)
        .jpeg({ quality: 60 })
        .toBuffer();
});
exports.generatePreview = generatePreview;
