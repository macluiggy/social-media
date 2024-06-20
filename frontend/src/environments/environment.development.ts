const baseUrl = 'http://localhost:3000';
// staging for testing
// const baseUrl = 'https://socialmediastaging-1a776fnb.b4a.run'

// apiUrl: 'https://backend-green-three-34.vercel.app/api/v1'
// apiUrl: 'https://srng5l6h-3000.use2.devtunnels.ms/api/v1',

export const environment = {
  production: false,
  apiUrl: `${baseUrl}/api/v1`,
  baseUrl,
  test: 'DEVELOPMENT ENVIRONMENT',
};
