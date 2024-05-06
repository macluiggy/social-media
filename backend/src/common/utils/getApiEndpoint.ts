import { API_VERSION } from '../constants';

const getApiEndpoint = (resource) => {
  const api = `api/${API_VERSION}/${resource}`;
  return api;
};

export default getApiEndpoint;
