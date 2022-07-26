import express, { RequestHandler } from "express";
import { Quote } from "models/quote";
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
}));
const port = 5000;
let allQuotes: Quote[] = [];

app.use(express.json());

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
    fetch('http://quotes.stormconsultancy.co.uk/quotes.json')
        .then(response => response.json())
        .then(data => {
            (data as []).forEach(x => {
                let quote: Quote = {
                    id: x["id"],
                    quote: x["quote"],
                    author: x["author"],
                    rating: [{ id: "AAA", name: "Boring", voters: [] }, { id: "BBB", name: "I don't get it", voters: [] }, { id: "CCC", name: "Funny", voters: [] }, { id: "DDD", name: "Inspiring", voters: [] }]
                }
                allQuotes.push(quote);
            });
        });
});
app.get('/getquotes', (req: any, res: any) => {
    res.send(allQuotes);
});

app.get('/quotes/:quoteId', (req: any, res: any) => {
    res.send(allQuotes.find(x => x.id == req.params.quoteId));
});

app.post('/quotes/:quoteId', (req: any, res: any) => {
    let userId = req.body.userId;
    let voteOptionId = req.body.vote;
    let quoteId = req.params.quoteId;

    let quote = allQuotes.find(x => x.id == quoteId);
    if (quote) {
        for (let rating of quote.rating) {
            rating.voters = rating.voters.filter(x => x !== userId);
        }
    }
    quote.rating.find(x => x.id == voteOptionId).voters.push(userId);
    res.send(quote);
});



