import Metaphor, { GetContentsResponse, SearchOptions, SearchResponse } from 'metaphor-node';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import cors from 'cors';
import {getSuggestedQueries, getSummary} from './utils/ai';

dotenv.config();

const metaphor = new Metaphor(process.env.METAPHOR_API_KEY);

const app = express();

const corsOptions = {
  origin: 'https://bento-search.onrender.com',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://bento-search.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(cors(corsOptions));

app.use(cors(corsOptions));

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
        // startPublishedDate: "2023-09-27", //TODO: calculate this
        useAutoprompt:true,
        numResults: 9
      });
    console.log(result);
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

app.get("/similar", async (req: Request, res: Response) => {
  const url = req.query.url;
  try {
    const result = await metaphor.findSimilar(url.toString(), {numResults: 9});
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})



app.get('/capture', async (req: Request, res: Response) => {
  const url = req.query.url;
  if (!url) {
    res.status(400).send('Please provide a URL parameter.');
    return;
  }

  try {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath()
    });
    const page = await browser.newPage();
    await page.goto(url.toString());

    const screenshot = await page.screenshot();
    await browser.close();

    res.set('Content-Type', 'image/png');
    res.send(screenshot);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    res.status(500).send('Error capturing screenshot.');
  }
});

app.get('/extract', async (req: Request, res: Response) => {
  const id = req.query.id;

  try {
    const result = await metaphor.getContents([id.toString()]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

