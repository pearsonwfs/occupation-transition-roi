import axios from 'axios';
import { getAPIUrl } from 'utils/getApiUrl';

type IndustryTrendingSkillsParams = {
  industry: string;
  accessToken?: string;
};
export const industryTrendingSkills = async (
  params: IndustryTrendingSkillsParams
): Promise<any> => {
  const baseUrl = `https://${getAPIUrl()}/di/v1/industries/${
    params.industry
  }/skills/trending`;
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
