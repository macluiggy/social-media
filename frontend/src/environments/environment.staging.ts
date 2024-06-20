const baseUrl = 'https://backend-macluiggy-macluiggys-projects.vercel.app';
// apiUrl: 'https://social-media-staging.up.railway.app/api/v1',
// apiUrl: 'https://backend-macluiggy-macluiggys-projects.vercel.app/api/v1',

export const environment = {
  production: false,
  apiUrl: `${baseUrl}/api/v1`,
  baseUrl,
  test: 'STAGING ENVIRONMENT', // This is the only line that is different
};
