import axios from 'axios';
import { getAPIUrl } from 'utils/getApiUrl';

type IndustriesParams = {
  accessToken?: string;
};
export const industries = async (
  params: IndustriesParams
): Promise<any> => {
  const baseUrl = `https://${getAPIUrl()}/di/v1/industries`;
  const apiUrl = `${baseUrl}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    const error = new Error();
    error.message = err?.message;
    error.stack = err?.stack;
    throw error;
  }
};
