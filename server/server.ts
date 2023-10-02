import Metaphor, { GetContentsResponse, SearchOptions, SearchResponse } from 'metaphor-node';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import {getSuggestedQueries, getSummary} from './ai';


const metaphor = new Metaphor('7087297d-5455-4d9a-9f98-0a442a0e04fa');

const app = express();

// register body-parser middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.post("/search", async (req: Request, res: Response) => {
  const { city } = req.body;
 
  try {
    const result: SearchResponse = await metaphor.search(
      `Everyone is talking about this in ${city}:`,
      {
        startPublishedDate: "2023-09-27", //TODO: calculate this
        useAutoprompt:true,
        numResults: 3
      });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post("/content", async (req: Request, res: Response) => {
  const {ids} = req.body;

  try {
    const result: GetContentsResponse = await metaphor.getContents(ids);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.post("/suggested", async (req: Request, res: Response) => {
  const {content} = req.body;
  const output = await getSuggestedQueries(content);
  res.json(output);
})

app.post("/summary", async (req: Request, res: Response) => {
  const {content} = req.body;
  const output = await getSummary(content);
  res.json(output);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

