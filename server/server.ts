import Metaphor, { SearchOptions, SearchResponse } from 'metaphor-node';
import express, { Request, Response } from 'express';

const app = express();

const metaphor = new Metaphor('7087297d-5455-4d9a-9f98-0a442a0e04fa');

app.get("/api", async (req: Request, res: Response) => {
    let result: SearchResponse = await metaphor.search('what is happening in New York City? Include a mix of good and bad news.', {startPublishedDate: "2023-06-24"});
    res.json(result);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

