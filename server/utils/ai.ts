import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";

const model = new OpenAI({temperature: 0.5, modelName: "gpt-3.5-turbo"});

export const getSummary = async(content: string[]) => {

    const prompt = PromptTemplate.fromTemplate(
        `Please generate a brief summary based on all content from the following: {extracts}`
    );

    const input = await prompt.format({
        extracts: content.slice(0, 2)
    });

    const output = await model.call(input);
    return output; 
}

export const getSuggestedQueries = async(content: string) => {
    const parser = new CommaSeparatedListOutputParser();

    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate("Suggest 3 search queries related to this {text}.\n{format_instructions}"),
        new OpenAI({ temperature: 1, modelName: "gpt-3.5-turbo"}),
        parser,
      ]);

      const output = await chain.invoke({
        text: content,
        format_instructions: parser.getFormatInstructions(),
      });

    return output;
}