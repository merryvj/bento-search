import Metaphor, { SearchOptions, SearchResponse } from 'metaphor-node';
import express, { Request, Response } from 'express';
import {getSummary} from './ai';

const app = express();

const metaphor = new Metaphor('7087297d-5455-4d9a-9f98-0a442a0e04fa');

app.get("/api", async (req: Request, res: Response) => {
    let result: SearchResponse = await metaphor.search('what is happening in New York City? Include a mix of good and bad news.', {startPublishedDate: "2023-06-24"});
    res.json(result);
})

const titles = [
  "State of emergency issued for New York as heavy rain and intense floods pummel city – live",
  "New York City’s not-so-sudden migrant surge, explained",
  "New York declares state of emergency amid heavy rainfall and flash flooding",
  "New York City reels after flash flooding chaos and powerful downpours",
  "New York City in state of emergency as torrential rain floods subways, roads and basements",
  "Why So Many Migrants Are Coming to New York",
  "New York City’s Floods and Torrential Rainfall Explained",
  "Rain Eases, but Officials Warn That Flood Risks Remain",
  "NYC flooding live updates: Millions at risk of flooding in tri-state area",
  "One-year-old dies at New York City daycare and three children hospitalized"
]

app.get("/summary", async (req: Request, res: Response) => {
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

