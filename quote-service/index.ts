import express, { RequestHandler } from "express";
import { Quote } from "models/quote";
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.11:3000'];

app.use(cors({
    origin: allowedOrigins,
}));
const port = 5000;
let allQuotes: Quote[] = [];

app.use(express.json());

type simpleQuote = { id: string, hasVoted: boolean };

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
                    rating: [{ id: "AAA", name: "Boring", voters: ['2c951a4a54a5b4296d96ddd16b592bc3'], color: "#F1F2F6", icon: "sleepy" }, { id: "BBB", name: "I don't get it", voters: [], color: "#EFEBFF", icon: "questionMark" }, { id: "CCC", name: "Funny", voters: [], color: "#D6EBE5", icon: "laugh" }, { id: "DDD", name: "Inspiring", voters: [], color: "#FEF3D7", icon: "idea" }]
                }
                allQuotes.push(quote);
            });
        });
});

app.get('/quotes/random', (req: any, res: any) => {
    let randomQuote: Quote = (allQuotes) ? allQuotes[Math.floor(Math.random() * (allQuotes.length - 1))] : null;
    res.send(JSON.stringify(randomQuote));
});


app.get('/quotes', (req: any, res: any) => {
    res.send(allQuotes);
});

app.get('/simple-quotes', (req: any, res: any) => {
    let userId = req.query.userId;
    let simpleQuotes: simpleQuote[] = [];
    allQuotes.forEach(x => {
        simpleQuotes.push({
            id: x.id,
            hasVoted: userHasVoted(userId, x.id)
        });
    });
    res.send(JSON.stringify(simpleQuotes));
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

app.get('/quotes/:quoteId', (req: any, res: any) => {
    let quoteId = req.params.quoteId;
    res.send(allQuotes.find(x => x.id === quoteId));
});


function userHasVoted(userId: string, quoteId: string){
    let quote = allQuotes.find(quote => quote.id === quoteId);
    let found = false;
    quote.rating.forEach(rating => {
        if(rating.voters.find(voter => voter == userId)){
            found = true;
        }
    })
    return found;
}


