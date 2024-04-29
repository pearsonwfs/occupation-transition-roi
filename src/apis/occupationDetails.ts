import axios from 'axios';
import { getAPIUrl } from 'utils/getApiUrl';

type OccupationDetailsParams = {
  occupationId: string;
  accessToken?: string;
  occupationLevel?: number;
};
export const occupationDetails = async (
  params: OccupationDetailsParams
): Promise<any> => {
  const baseUrl = `https://${getAPIUrl()}/di/v1/occupations/${
    params.occupationId
  }`;
  const queryParams = params.occupationLevel
    ? `?occupation_level=${params.occupationLevel}`
    : '';
  const apiUrl = `${baseUrl}${queryParams}`;

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
