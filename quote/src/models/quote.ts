import { QuoteRating } from "./quoteRating";

export class Quote{
    id?: string;
    quote?: string;
    author?: string;
    rating: QuoteRating[] = [];
}