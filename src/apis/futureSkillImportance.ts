import axios from 'axios';
import { getAPIUrl } from 'utils/getApiUrl';

type SkillFutureImportanceParams = {
  accessToken?: string;
  skillIds: string[];
};
export const skillFutureImportance = async (
  params: SkillFutureImportanceParams
): Promise<any> => {
  const baseUrl = `https://${getAPIUrl()}/di/v1/skills/skill_future_importance`;
  const apiUrl = `${baseUrl}`;

  try {
    const response = await axios.post(
      apiUrl,
      {
        skill_ids: params.skillIds,
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
