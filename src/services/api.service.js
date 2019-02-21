const API_BASE_URL = process.env.REACT_APP_API_BASE;

export function request (method, url, params, body) {
  url = new URL(url);

  for (let prop in params) {
    if (params.hasOwnProperty(prop)) {
      url.searchParams.set(prop, params[prop]);
    }
  }

  const token = window.localStorage.getItem('__token');

  return fetch (url, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: body ? JSON.stringify(body) : null
  })
  .then(checkRequest);
}

function checkRequest (res) {
  let jsonPromise = res.json();

  if (!res.ok) {
    return jsonPromise.then(data => {
      let err = Object.assign({}, data, {
        status: res.status,
        statusText: res.statusText
      });

      return Promise.reject(err);
    });
  }

  return jsonPromise;
}

export function login (username, password) {
  let url = `${API_BASE_URL}/auth/login`
  return request('post', url, {}, {
    username,
    password
  });
}

export function userProfile () {
  let url = `${API_BASE_URL}/profile`
  return request('get', url);
}