import jsonData from '../assets/randomized_industry_group_tasks_final.json';

export const calcAutomationRiskAvoidance = (
  profit: number,
  aiMaturity: string,
  automationRiskThreshold: number,
  skillScores: number[]
): number => {
  // Extract scores and compute average
  const averageScore =
    skillScores.reduce((acc: number, score: number) => acc + score, 0) /
    skillScores.length;

  // Difference between average and threshold
  const difference = averageScore - automationRiskThreshold;

  // Calculation of adjusted risk
  const adjustedRisk = difference / parseFloat(aiMaturity);
  const profitGenerated = ((adjustedRisk * -1) / 100) * profit;

  return Math.round(profitGenerated);
};

export const calculateCompanySpecificImpact = (
  industryPercentageImpact: number,
  profit: number,
  aiMaturity: string
): number => {
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

  return Math.round(companySpecificImpact);
};

export const calcProductivityAndInnovation = (
  industry: string,
  profit: number
): number[] => {
  const industryData = jsonData.filter((data) => data.industry === industry);
  const profitableIndustryData = industryData
    .filter((data) => data.profitable)
    .map((data) => parseFloat(data.percent_difference.replace('%', '')));
  const unprofitableIndustryData = industryData
    .filter((data) => !data.profitable)
    .map((data) => parseFloat(data.percent_difference.replace('%', '')));

  const profitablePercentDiffAvg =
    profitableIndustryData.reduce((acc, val) => acc + Math.abs(val)) /
    profitableIndustryData.length;

  const unprofitablePercentDiffAvg =
    unprofitableIndustryData.reduce((acc, val) => acc + Math.abs(val)) /
    unprofitableIndustryData.length;

  const productivity = (unprofitablePercentDiffAvg / 100) * profit;
  const incrementalInnocation = (profitablePercentDiffAvg / 100) * profit;

  return [Math.round(productivity), Math.round(incrementalInnocation)];
};
