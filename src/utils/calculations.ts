export const calcProfitGenerated = (
  profit: number,
  aiMaturity: string,
  automationRiskThreshold: number,
  skillScores: number[]
): { profitGenerated: number } => {
  // try {
  // Fetch trending skills data
  // const trendingSkillsResponse = await axios.get(trendingSkillsUrl);
  // const trendingSkillsData = trendingSkillsResponse.data;
  // const skillIdsTrending: string[] = trendingSkillsData.map((item: { id: string }) => item.id);
  //
  // // Payload for future skills importance request
  // const payload = { skill_ids: skillIdsTrending };
  //
  // // Post request for future skills importance
  // const automatedRiskRequest = await axios.post(futureSkillsImportanceUrl, payload);
  // const automationRiskJson = automatedRiskRequest.data;
  // const threshold = automationRiskJson.future_proof_threshold;

  // Extract scores and compute average
  // const skillScores = automationRiskJson.skill_future_importance_scores.map((skill: { future_importance_score: number }) => skill.future_importance_score);
  const averageScore =
    skillScores.reduce((acc: number, score: number) => acc + score, 0) /
    skillScores.length;

  // Difference between average and threshold
  const difference = averageScore - automationRiskThreshold;

  // Calculation of adjusted risk
  const adjustedRisk = difference / parseFloat(aiMaturity);
  const profitGenerated = adjustedRisk * -1 * profit;

  return { profitGenerated };

  //   console.log("adjusted_risk: ", adjustedRisk);
  //   console.log('profit_generated: ', profitGenerated);
  // } catch (error) {
  //   console.error('Error:', error);
  // }
};

export const calculateCompanySpecificImpact = (
  industryPercentageImpact: number,
  profit: number,
  aiMaturity: string
): number => {

  // try {
  // const response = await axios.get(url, { headers });
  // const industryJson = response.data;
  //
  // // Extracting ids and names into separate lists
  // const ids: string[] = industryJson.map((entry: { id: string }) => entry.id);
  //
  // // Industry Impact
  // const industryPercentageImpactList: number[] = [5,5,80,5,10,10,10,10,80,50,70,60,50,80,20,33,33,40,50,20,20,33];
  // const idIndex = ids.indexOf(industry);

  const companyIndustryImpact =
    industryPercentageImpact / parseInt(aiMaturity) / 100;

  // Company Size Impact
  let companySizeImpactFactor = 0;
  if (profit < 10000000) {
    companySizeImpactFactor = 33;
  } else if (profit >= 10000000 && profit <= 100000000) {
    companySizeImpactFactor = 22;
  } else {
    companySizeImpactFactor = 11;
  }
  const companySizeImpact =
    companySizeImpactFactor / parseInt(aiMaturity) / 100;

  // Final Score
  const companySpecificImpact =
    (companyIndustryImpact + companySizeImpact) * profit;

  return companySpecificImpact;
  // } catch (error) {
  //     console.error('Error:', error);
  // }
};
