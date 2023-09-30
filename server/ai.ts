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
    // const text = titles.join(" ");
    // const input = await getPrompt(text);
    // const output = await model.call(input);
    // return "output"; 

    return {result: "New York City is in a state of emergency due to intense floods and rainfall, causing chaos and risks to the millions in the tri-state area. A surge of migrants are coming to the city, and a one-year-old died at a daycare and three children were hospitalized."}
}