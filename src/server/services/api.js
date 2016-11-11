/* eslint no-param-reassign: "off" */
import { postJSON } from 'sk-fetch-wrapper/lib/json';
import SKGraphQLClient from 'sk-graphql-client';
import config from '../../config';

const APIService = {
  client: new SKGraphQLClient({
    endpoint: config.API_URL
  }),
  getToken: async () => {
    const apiLogin = await postJSON(`${config.API_URL}/get-token`, {
      username: config.API_USER_NAME,
      password: config.API_USER_PASS
    });

    if (!apiLogin.success) {
      throw new Error('Failed to get a token');
    }

    return apiLogin.token;
  },
  verifyToken: async token => {
    const verifyToken = await postJSON(`${config.API_URL}/verify-token`, {}, {
      headers: { Authorization: token }
    });

    if (!verifyToken.success) {
      throw new Error('Failed to verify the token');
    }

    return verifyToken.token;
  },
};

export default APIService;
