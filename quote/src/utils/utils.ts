const baseURL: string = "http://localhost:5000";

export function doRequest(url: any, method: any, body?: any): Promise<any> {
   let requestOptions: RequestInit;
   requestOptions = {
      headers: { 'Content-Type': 'application/json' },
      method: method,
   };

   switch (method) {
      case "GET":
         url += '?' + (new URLSearchParams(body)).toString();
         break;
      case "POST":
         requestOptions.body = JSON.stringify(body);
      default:
         break;
   }
   return fetch(`${baseURL}${url}`, requestOptions)
      .then(response => response.json());
};