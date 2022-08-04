const baseURL: string = "http://localhost:5000";

export const doRequest = (url: any, method: any, body?: any): Promise<any> => {
   let requestOptions: RequestInit;
   requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: method,
      body: JSON.stringify(body)
   };

   body = (body) ? JSON.stringify(body) : null;
   return fetch(`${baseURL}${url}`, requestOptions)
      .then(response => response.json());
};


export const vote = (quoteId: string, ratingId: string, userId: string): Promise<any> => {
   let body = { userId: userId, vote: ratingId };
   return doRequest(`/quotes/${quoteId}`, 'POST', body);
}


