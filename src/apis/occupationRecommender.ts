import axios from 'axios';
import { getAPIUrl } from 'utils/getApiUrl';

type OccupationRecommenderParams = {
  occupation: string;
  accessToken?: string;
};
export const occupationRecommender = async (
  params: OccupationRecommenderParams
): Promise<any> => {
  const apiQueryUrl = `https://${getAPIUrl()}/di/v1/occupations/recommender`;

  try {
    const response = await axios.post(
      apiQueryUrl,
      {
        occupation_id: params.occupation?.toUpperCase(),
      },
      {
        headers: {
          Authorization: `Bearer ${params.accessToken}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    const error = new Error();
    error.message = err?.message;
    error.stack = err?.stack;
    throw error;
  }
};
