"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
app.use('/api/images', imageRoutes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + "/build/index.html"));
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
