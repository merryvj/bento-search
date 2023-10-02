import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";

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
    const parser = new CommaSeparatedListOutputParser();

    const chain = RunnableSequence.from([
        PromptTemplate.fromTemplate("List 3 suggested search queries to help me respond based on this {text}.\n{format_instructions}"),
        new OpenAI({ temperature: 0 }),
        parser,
      ]);

      const output = await chain.invoke({
        text: content,
        format_instructions: parser.getFormatInstructions(),
      });

    return output;
}