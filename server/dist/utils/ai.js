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
exports.getSuggestedQueries = exports.getSummary = void 0;
const openai_1 = require("langchain/llms/openai");
const prompts_1 = require("langchain/prompts");
const output_parsers_1 = require("langchain/output_parsers");
const runnable_1 = require("langchain/schema/runnable");
const model = new openai_1.OpenAI({ temperature: 0.5, modelName: "gpt-3.5-turbo" });
const getSummary = (content) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = prompts_1.PromptTemplate.fromTemplate(`Please generate a brief summary based on all content from the following: {extracts}`);
    const input = yield prompt.format({
        extracts: content.slice(0, 2)
    });
    const output = yield model.call(input);
    return output;
});
exports.getSummary = getSummary;
const getSuggestedQueries = (content) => __awaiter(void 0, void 0, void 0, function* () {
    const parser = new output_parsers_1.CommaSeparatedListOutputParser();
    const chain = runnable_1.RunnableSequence.from([
        prompts_1.PromptTemplate.fromTemplate("Suggest 3 search queries related to this {text}.\n{format_instructions}"),
        new openai_1.OpenAI({ temperature: 1, modelName: "gpt-3.5-turbo" }),
        parser,
    ]);
    const output = yield chain.invoke({
        text: content,
        format_instructions: parser.getFormatInstructions(),
    });
    return output;
});
exports.getSuggestedQueries = getSuggestedQueries;
