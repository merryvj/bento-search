import Metaphor, { SearchOptions, SearchResponse } from 'metaphor-node';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import {getSummary} from './ai';


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
    const result: SearchResponse = await metaphor.search(`Everyone is talking about this in ${city}:`, { startPublishedDate: "2023-09-27", useAutoprompt:true});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// const titles = [
//   "State of emergency issued for New York as heavy rain and intense floods pummel city – live",
//   "New York City’s not-so-sudden migrant surge, explained",
//   "New York declares state of emergency amid heavy rainfall and flash flooding",
//   "New York City reels after flash flooding chaos and powerful downpours",
//   "New York City in state of emergency as torrential rain floods subways, roads and basements",
//   "Why So Many Migrants Are Coming to New York",
//   "New York City’s Floods and Torrential Rainfall Explained",
//   "Rain Eases, but Officials Warn That Flood Risks Remain",
//   "NYC flooding live updates: Millions at risk of flooding in tri-state area",
//   "One-year-old dies at New York City daycare and three children hospitalized"
// ]

app.post("/summary", async (req: Request, res: Response) => {
  const {titles} = req.body;
  const output = await getSummary(titles);
  res.json(output);
})

// app.post("/summary", async (req: Request, res: Response) => {
//   const { titles } = req.body;
//   try {
//     const summary = await getSummary(titles);
//     res.json({ summary });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// })


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

