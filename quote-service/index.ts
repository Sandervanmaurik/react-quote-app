import express from "express";
import { Quote } from "models/quote";
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());
const port = 5000;
let allQuotes: Quote[] = [];

const colors = {
    grey: "#c9ccd6",
    purple: "#9D85FF",
    green: "#69B59E",
    yellow: "#FAC94C",
    lightgrey: "#F1F2F6",
    lightpurple: "#EFEBFF",
    lightgreen: "#D6EBE5",
    lightyellow: "#FEF3D7"
}

app.use(express.json());

type simpleQuote = { id: string, hasVoted: boolean };

app.listen(port, () => {
    fetch('http://quotes.stormconsultancy.co.uk/quotes.json')
        .then(response => response.json())
        .then(data => {
            (data as []).forEach(x => {
                let quote: Quote = {
                    id: x["id"],
                    quote: x["quote"],
                    author: x["author"],
                    rating: [{ id: "AAA", name: "Boring", voters: [], voteCount: 0, color: colors.lightgrey, icon: "fa-face-meh", iconColor:  colors.grey}, { id: "BBB", name: "I don't get it", voters: [], voteCount: 0, color: colors.lightpurple, icon: "fa-question", iconColor: colors.purple }, { id: "CCC", name: "Funny", voters: [], voteCount: 0, color: colors.lightgreen, icon: "fa-face-grin-beam", iconColor: colors.green }, { id: "DDD", name: "Inspiring", voters: [], voteCount: 0, color: colors.lightyellow, icon: "fa-lightbulb", iconColor: colors.yellow }]
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
            if (rating.voters.find(voter => voter === userId)) {
                rating.voteCount -= 1;
                rating.voters = rating.voters.filter(x => x !== userId);
            }
        }
    }
    let rating = quote.rating.find(x => x.id == voteOptionId);
    rating.voters.push(userId);
    rating.voteCount += 1;
    res.send(quote);
});

app.get('/quotes/:quoteId', (req: any, res: any) => {
    let quoteId = req.params.quoteId;
    res.send(allQuotes.find(x => x.id === quoteId));
});


function userHasVoted(userId: string, quoteId: string) {
    let quote = allQuotes.find(quote => quote.id === quoteId);
    let found = false;
    quote.rating.forEach(rating => {
        if (rating.voters.find(voter => voter == userId)) {
            found = true;
        }
    })
    return found;
}


