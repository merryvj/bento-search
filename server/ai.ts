import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import {
    StructuredOutputParser,
    OutputFixingParser,
  } from "langchain/output_parsers";

const model = new OpenAI();

const getPrompt = async(content) => {
    const prompt = PromptTemplate.fromTemplate(
        `Summarize the following headlines in no more than 2 sentences: {headlines}`
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