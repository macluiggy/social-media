// a way to save all the environment variables in one place
// and use them in the app
const config = {
  apiVersion: process.env.API_VERSION || 'v1',
};

export default config;
