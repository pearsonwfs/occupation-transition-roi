import { Theme } from '@pearsonwfs/component-library';
import { useEffect, useMemo, useState } from 'react';
import { Wrapper } from './OccupationTransitionRoi.styles';
import { OccupationTransitionRoiProps } from './OccupationTransitionRoi.types';
import { industries as callIndustries } from '../../apis/industries';
import { industryTrendingSkills as callIndustryTrendingSkills } from '../../apis/trandingSkills';
import { skillFutureImportance } from '../../apis/futureSkillImportance';
import {
  calcAutomationRiskAvoidance,
  calcProductivityAndInnovation,
  calculateCompanySpecificImpact,
} from 'utils/calculations';
import { percentageImpactByIndustry } from 'utils/constants';
import { Header } from 'components/header';
import { ProfitInput } from 'components/profit_input';
import { IndustrySelection } from 'components/industry_selection';
import { AiMaturitySelection } from 'components/ai_maturity_selection';
import { Results } from 'components/results';

const availableIndustries = [
  'human health and social work activities',
  'information and communication',
  'education',
];
const capitalize = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || '';
export const OccupationTransitionRoi = ({
  accessToken = 'accessToken',
}: OccupationTransitionRoiProps) => {
  // const [details, setDetails] = useState(undefined);
  const [industry, setIndustry] = useState(availableIndustries[0]);
  const [profit, setProfit] = useState(0);
  const [aiMaturity, setAiMaturity] = useState('1');
  const [industries, setIndustries] = useState(undefined);
  const [futureSkillImportances, setFutureSkillImportances] =
    useState(undefined);
  const [industryTrendingSkills, setIndustryTrendingSkills] =
    useState(undefined);

  const showGraph = useMemo(() => {
    return !!industries && !!futureSkillImportances && !!industryTrendingSkills;
  }, [industries, futureSkillImportances, industryTrendingSkills]);
  const industryId = useMemo(() => {
    return (
      !!industries &&
      industries.find(
        (industryItem: any) => industryItem.name === capitalize(industry)
      ).id
    );
  }, [industries, industry]);

  useEffect(() => {
    callIndustries({ accessToken: accessToken }).then((data) => {
      setIndustries(data);
    });
  }, []);

  useEffect(() => {
    if (!!industries && !!industryId) {
      setIndustryTrendingSkills(undefined);
      callIndustryTrendingSkills({
        accessToken: accessToken,
        industry: industryId,
      }).then((data: any) => {
        setIndustryTrendingSkills(data);
      });
    }
  }, [industryId, industries]);

  useEffect(() => {
    if (!!industryTrendingSkills) {
      setFutureSkillImportances(undefined);
      const skillIds: string[] = industryTrendingSkills.map(
        (skill: { id: string }) => skill.id
      );
      skillFutureImportance({
        accessToken: accessToken,
        skillIds: skillIds,
      }).then((data) => {
        setFutureSkillImportances(data);
      });
    }
  }, [industryTrendingSkills]);

  const industriesToSegmentedItems = () => {
    return availableIndustries.map((size: string) => {
      return {
        icon: 'building-regular',
        labelText: capitalize(size),
        value: size,
      };
    });
  };

  const aiMaturityLevels = [1, 2, 3, 4, 5].map((level: number) => {
    return {
      icon: 'tools-regular',
      labelText: `${level}`,
      value: `${level}`,
    };
  });

  const graphData = useMemo(() => {
    if (industryId && profit && aiMaturity && futureSkillImportances) {
      const automationRiskThreshold =
        futureSkillImportances.future_proof_threshold;
      const skillScores =
        futureSkillImportances.skill_future_importance_scores.map(
          (skill: { future_importance_score: number }) =>
            skill.future_importance_score
        );
      const automationRiskAvoidance = calcAutomationRiskAvoidance(
        profit,
        aiMaturity,
        automationRiskThreshold,
        skillScores
      );
      const industryPercentImpact = percentageImpactByIndustry.find(
        (kv: { key: string; value: number }) => kv.key === industryId
      ).value;
      const companySpecificImpact = calculateCompanySpecificImpact(
        industryPercentImpact,
        profit,
        aiMaturity
      );
      const [productivity, innovation] = calcProductivityAndInnovation(
        capitalize(industry),
        profit
      );

      return [
        automationRiskAvoidance,
        productivity,
        innovation,
        companySpecificImpact,
      ];
    }
    return [0, 0, 0, 0];
  }, [industry, industryId, profit, aiMaturity, futureSkillImportances]);

  return (
    <Theme theme="workforce">
      <Wrapper>
        <Header />
        <ProfitInput
          value={profit}
          onChange={(value: string) => setProfit(Number(value))}
        />
        <IndustrySelection
          items={industriesToSegmentedItems()}
          selectedValue={industry}
          onChange={(size: string) => setIndustry(size)}
        />
        <AiMaturitySelection
          items={aiMaturityLevels}
          selectedValue={aiMaturity}
          onChange={(level: string) => setAiMaturity(level)}
        />
        <Results
          loading={!showGraph}
          industryName={capitalize(industry)}
          graphData={graphData}
        />
      </Wrapper>
    </Theme>
  );
};
