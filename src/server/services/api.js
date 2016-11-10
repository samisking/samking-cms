/* eslint no-param-reassign: "off" */
import SKGraphQLClient from 'sk-graphql-client';
import { postJSON } from 'sk-fetch-wrapper/lib/json';
import config from '../../config';

const APIService = {
  GraphClient: new SKGraphQLClient({
    endpoint: config.API_URL
  }),
  makeHeaders: token => ({ headers: { Authorization: token } }),
  getToken: async () => {
    try {
      const res = await postJSON(`${config.API_URL}/get-token`, {
        username: config.API_USER_NAME,
        password: config.API_USER_PASS
      });

      return res.token;
    } catch (err) {
      throw err;
    }
  },
  verifyToken: async token => {
    try {
      const res = await postJSON(`${config.API_URL}/verify-token`, {}, {
        headers: {
          Authorization: token
        }
      });

      return res.token;
    } catch (err) {
      throw err;
    }
  }
};

export default APIService;
