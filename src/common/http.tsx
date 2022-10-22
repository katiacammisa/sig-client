export const baseurl = "http://localhost:8080/";

type Config = {
  headers?: Object | null,
  noAuth?: boolean,
};

const request = (url: string, method: string, body: Object | null, config: Config) => {

  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
  };
  const configuration: Object = {
    method: method,
    body: body ? JSON.stringify(body) : undefined,
    headers: config ? config.headers : headers,
  };
  return fetch(baseurl + url, configuration)

    .then(response => {
      if(response.ok) return response.json();

      // if an error occurs on the server return the errorMessage in case we intentionally threw that error, or a generic one in case an unexpected exception rises.
      return response.json().then(error => {
        if(error.hasOwnProperty('message')) {
          throw (error.message)
        } else throw new Error("Unexpected server error")
      })
    })
    // Catch connection errors and the error throw above.
    .catch(error => {
      throw(error)
    })
}

export const get = (url: string, config = {}) => request(url, "GET", null, config);
export const getWithBody = (url: string, body: Object, config = {}) => request(url, "GET", body, config);
export const post = (url: string, body: Object, config = {}) => request(url, "POST", body, config);
export const put = (url: string, body: Object, config = {}) => request(url, "PUT", body, config);
export const del = (url: string, config = {}) => request(url, "DELETE", null, config);
