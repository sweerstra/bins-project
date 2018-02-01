class Request {
  get(url) {
    return this._request(url);
  }

  post(url, data) {
    return this._request(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  put(url, data) {
    return this._request(url, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  delete(url, data) {
    return this._request(url, {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async _request(url, options) {
    return fetch(url, options)
      .then(resp => resp.json())
      .catch(err => err);
  };
}

export default new Request();
