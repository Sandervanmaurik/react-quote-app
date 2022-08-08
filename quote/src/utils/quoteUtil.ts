import { doRequest } from "./utils";

export function vote(quoteId: string, ratingId: string, userId: string): Promise<any> {
    let body = { userId: userId, vote: ratingId };
    return doRequest(`/quotes/${quoteId}`, 'POST', body);
 }
 
 export function getAllBasicQuotes(userId: string) {
    return doRequest('/simple-quotes', "GET", { userId: userId });
 }
 
 export function getQuoteById(quoteId: string): Promise<any> {
    return doRequest(`/quotes/${quoteId}`, 'GET');
 }