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
const app = (0, express_1.default)();
const metaphor = new metaphor_node_1.default('7087297d-5455-4d9a-9f98-0a442a0e04fa');
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield metaphor.search('a blog post about the future of search from the early days of the internet');
    res.json(result);
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
