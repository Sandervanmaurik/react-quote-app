import express, { RequestHandler } from "express";
import { Quote } from "models/quote";
import fetch from 'node-fetch';
import cors from 'cors';
import { nextTick } from "process";

const app = express();
// app.use(cors); /* NEW */
// app.use(express.json());
const allowedOrigins = ['http://localhost:3000'];

// const options: cors.CorsOptions = {
//     origin: allowedOrigins
// };
// app.use(cors(options));
app.use(cors({
    origin: ['http://localhost:3000'],
}));
const port = 5000;
let allQuotes: Quote[] = [];

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
                    rating: [{ name: "Boring", rating: 0 }, { name: "I don't get it", rating: 0 }, { name: "Funny", rating: 0 }, { name: "Inspiring", rating: 0 }]
                }
                allQuotes.push(quote);
            });
        });
});
app.get('/getquotes', (req: any, res: any) => {
    res.send(allQuotes);
});



