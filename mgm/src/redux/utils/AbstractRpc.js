export default class AbstractRpc {

  static recordPerPage = 2;

  cfetch(pUrl, pOptions) {
    let cOptions = pOptions;
    if (!cOptions) {
      cOptions = {};
    }
    if (!cOptions.credentials) {
      cOptions.credentials = 'same-origin';
    }
    const { url, options } = this.handleRequest(pUrl, cOptions);
    return fetch(url, options).then(this.handleResponse);
  }

  formPost(url, queryString, options) {
    return this.cfetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: queryString,
      ...options
    }).then((response) => {
      return response.json();
    });
  }

  filePost(url, queryString, options) {
    return this.cfetch(url, {
      method: 'POST',
      headers: {
      },
      body: queryString,
      ...options
    }).then((response) => {
      return response.json();
    });
  }

  jsonGet(url, options) {
    return this.cfetch(url, options)
    .then(response => {
      return response.json();
    });
  }

  jsonPost(url, request, options) {
    return this.cfetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
      ...options
    }).then((response) => {
      return response.json();
    });
  }

  pagerPost(url, filter, actPage, options) {
    const start = Math.trunc((actPage - 1) * 5);
    const fetchRequest = { ...filter, range: { start, length: 5 } };
    return this.jsonPost(url, fetchRequest, options)
    .then(fetchResponse => {
      const pageCount = Math.ceil(fetchResponse.rowCount / 5);
      return Promise.resolve({ pageCount, data: fetchResponse.data });
    });
  }

  pagerPost2(url, filter, actPage, options) {
    const start = Math.trunc((actPage - 1) * 5);
    const fetchRequest = { ...filter, range: { start, length: 5 } };
    return this.jsonPost(url, fetchRequest, options)
    .then(fetchResponse => {
      const pageCount = Math.ceil(fetchResponse.rowCount / 5);
      return Promise.resolve({ pageCount, data: fetchResponse });
    });
  }
}
