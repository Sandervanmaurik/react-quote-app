const someCommonValues = ['common', 'values'];
const baseURL: string = "http://localhost:5000";

export const doRequest = (url: any, method: any, body?: any): Promise<any> => {
   let requestOptions;
   if(body){
      requestOptions = {
         headers: { 'Content-Type': 'application/json' },
         method: method,
         body: JSON.stringify(body)
      }
   }
   else{
      requestOptions = {
         headers: { 'Content-Type': 'application/json' },
         method: method
      }
   }
   return fetch(`${baseURL}${url}`, requestOptions)
      .then(response => response.json());
};


export const vote = (quoteId: string, ratingId: string, userId: string): Promise<any> => {
   let body = { userId: userId, vote: ratingId };
   return doRequest(`/quotes/${quoteId}`, 'POST', body);
}