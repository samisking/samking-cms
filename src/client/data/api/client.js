import SKGraphQLClient from 'sk-graphql-client';
import config from '../../../config';

const apiClient = new SKGraphQLClient({
  endpoint: config.API_URL
});

export default apiClient;
