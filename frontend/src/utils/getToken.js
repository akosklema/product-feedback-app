function getToken() {
  return  JSON.parse(localStorage.getItem('jwt'));
};

export default getToken;