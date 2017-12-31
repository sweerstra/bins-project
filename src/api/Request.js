class Request {
  get(url) {
    return this._request(url);
  }

  post(url, data) {
    return this._request(url, {
      method: 'post',
      body: JSON.stringify(data)
    });
  }

  put(url, data) {
    return this._request(url, {
      method: 'put',
      body: JSON.stringify(data)
    });
  }

  delete(url, data) {
    return this._request(url, {
      method: 'delete',
      body: JSON.stringify(data)
    });
  }

  async _request(url, options) {
    return fetch(url, options)
      .then(resp => resp.json())
      .catch(err => err);
  };
}

export default new Request();
