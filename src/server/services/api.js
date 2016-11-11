/* eslint no-param-reassign: "off" */
import SKGraphQLClient from 'sk-graphql-client';
import config from '../../config';

const APIService = {};

export const APIClient = new SKGraphQLClient({
  endpoint: config.API_URL
});

export default APIService;
