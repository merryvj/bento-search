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
const metaphor_node_1 = __importDefault(require("metaphor-node"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const dotenv_1 = __importDefault(require("dotenv"));
const ai_1 = require("./utils/ai");
dotenv_1.default.config();
const metaphor = new metaphor_node_1.default(process.env.METAPHOR_API_KEY);
const app = (0, express_1.default)();
// register body-parser middleware
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
app.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.body;
    try {
        const result = yield metaphor.search(`Everyone is talking about this in ${city}:`, {
            // startPublishedDate: "2023-09-27", //TODO: calculate this
            useAutoprompt: true,
            numResults: 9
        });
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/content", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ids } = req.body;
    try {
        const result = yield metaphor.getContents(ids);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.post("/suggested", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const output = yield (0, ai_1.getSuggestedQueries)(content);
    res.json(output);
}));
app.post("/summary", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const output = yield (0, ai_1.getSummary)(content);
    res.json(output);
}));
app.get("/similar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    try {
        const result = yield metaphor.findSimilar(url.toString(), { numResults: 9 });
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.get('/capture', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    if (!url) {
        res.status(400).send('Please provide a URL parameter.');
        return;
    }
    try {
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        yield page.goto(url.toString());
        const screenshot = yield page.screenshot();
        yield browser.close();
        res.set('Content-Type', 'image/png');
        res.send(screenshot);
    }
    catch (error) {
        console.error('Error capturing screenshot:', error);
        res.status(500).send('Error capturing screenshot.');
    }
}));
app.get('/extract', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    try {
        const result = yield metaphor.getContents([id.toString()]);
        res.json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
