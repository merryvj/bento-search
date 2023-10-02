import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import {
    StructuredOutputParser,
    OutputFixingParser,
  } from "langchain/output_parsers";
import { GetContentsResponse } from "metaphor-node";

const model = new OpenAI({modelName:"gpt-3.5-turbo"});

const getPrompt = async(content:string) => {
    const prompt = PromptTemplate.fromTemplate(
        `Briefly summarize the following headlines: {headlines}`
    );

    const input = await prompt.format({
        headlines: content
    });

    return input;
}

export const getSummary = async(titles: string[]) => {
    const text = titles.join(" ");
    const input = await getPrompt(text);
    const output = await model.call(input);
    return output; 
}

export const getContentSummary = async(extracts:GetContentsResponse) => {

    const contents = extracts.contents;

    const prompt = PromptTemplate.fromTemplate(
        `Concisely summarize the main ideas or key points from the following three web pages, considering their context relative to each other. Provide an overall summary of the three summaries in less than five sentences: {1}, {2}, {3}`
    );

    const input = await prompt.format({
        1: contents[0].extract,
        2: contents[1].extract,
        3: contents[2].extract,
    });

    const output = await model.call(input);
    return output;
}