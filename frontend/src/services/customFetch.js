import configData from '../config';

function customFetch(url, method = 'GET', headers = undefined, body = undefined) {
  const accessToken = JSON.parse(localStorage.getItem('jwt'));
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));

  const decodedAccessToken = JSON.parse(window.atob(accessToken.split('.')[1]));
  const decodedRefreshToken = JSON.parse(window.atob(refreshToken.split('.')[1]));

  const accessTokenExpired = decodedAccessToken.exp < Date.now() / 1000;
  const refreshTokenExpired = decodedRefreshToken.exp < Date.now() / 1000;

  if (accessTokenExpired && refreshTokenExpired) {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    return Promise.reject()
  }

  if (accessTokenExpired) {
    return fetch(`${configData.SERVER_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refreshToken: refreshToken
      })
    })
      .then((res) => {
        return res.json()
      })
      .then((resJson) => {
        if (resJson.status !== 'success') {
          throw new Error(resJson.message);
        }

        localStorage.setItem('jwt', JSON.stringify(resJson.data.accessToken));

        const headerObj = {
          ...headers,
          Authorization: `Bearer ${resJson.data.accessToken}`
        }

        return fetch(url, {
          method: method,
          headers: headerObj,
          body: body
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const headerObj = {
      ...headers,
      Authorization: `Bearer ${accessToken}`
    }
    
    return fetch(url, {
      method: method,
      headers: headerObj,
      body: body
    });
  }
};

export default customFetch;