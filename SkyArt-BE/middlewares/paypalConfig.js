import axios from 'axios';

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const getToken = async () => {
  try {
    const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', `grant_type=client_credentials`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const client = async () => {
  const tokenResponse = await getToken();
  const accessToken = tokenResponse.access_token;
  const tokenType = tokenResponse.token_type;
  const expiresIn = tokenResponse.expires_in;

  return {
    headers: {
      'Authorization': `${tokenType} ${accessToken}`,
      'Content-Type': 'application/json'
    },
    expiresIn
  };
};