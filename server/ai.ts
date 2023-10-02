import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";

const model = new OpenAI({temperature: 0.5, modelName: "gpt-3.5-turbo"});

export const getSummary = async(titles: string[]) => {
    const text = titles.join(" ");

    const prompt = PromptTemplate.fromTemplate(
        `Please generate a brief summary based on the following: {headlines}`
    );

    const input = await prompt.format({
        headlines: text
    });

    const output = await model.call(input);
    return output; 
}

export const getSuggestedQueries = async(content: string) => {
    const prompt = PromptTemplate.fromTemplate(
        `Suggest 3 brief search queries for this text: {text}`
    );

    const input = await prompt.format({
        text: content
    })

    const output = await model.call(input);
    return output;
}