import {
  FeedbackState,
  SegmentedControl,
  TextInput,
  Theme,
  Typography,
} from '@pearsonwfs/component-library';
import { useEffect, useMemo, useState } from 'react';
import { Wrapper } from './OccupationTransitionRoi.styles';
import { OccupationTransitionRoiProps } from './OccupationTransitionRoi.types';
import { occupationDetails } from '../../apis/occupationDetails';
import taskTimeByOccupation from '../../assets/combined.json';
import { industries as callIndustries } from '../../apis/industries';
import { BarGraph } from '../../charts/bar_graph';
import { industryTrendingSkills as callIndustryTrendingSkills } from '../../apis/trandingSkills';
import { skillFutureImportance } from '../../apis/futureSkillImportance';

const availableIndustries = [
  'human health and social work activities',
  'information and communication',
  'education',
];
const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || '';
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

  useEffect(() => {
    callIndustries({ accessToken: accessToken }).then((data) => {
      setIndustries(data);
    });
  }, []);

  useEffect(() => {
    if (!!industries && industry) {
      const industryId = industries.find(
        (industryItem: any) => industryItem.name === capitalize(industry)
      ).id;
      callIndustryTrendingSkills({
        accessToken: accessToken,
        industry: industryId,
      }).then((data: any) => {
        setIndustryTrendingSkills(data);
      });
    }
  }, [industry, industries]);

  useEffect(() => {
    if (!!industryTrendingSkills) {
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

  // useEffect(() => {
  //   setDetails(taskTimeByOccupation[0]);
  // }, []);
  //
  // useEffect(() => {
  //   console.log(industry);
  // }, [industry]);

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
      icon: 'user-astronaut-regular',
      labelText: `${level}`,
      value: `${level}`,
    };
  });

  return (
    <Theme theme="workforce">
      <Wrapper>
        <Typography
          component="h1"
          variant="displayXLBold"
          hasDefaultParagraphSpacing
        >
          Occupation Transitions ROI
        </Typography>
        <TextInput
          id="profit"
          name="Company Profit"
          label="Company Profit"
          type="number"
          value={profit}
          onChange={(value: string) => setProfit(value)}
        />
        <SegmentedControl
          aria-label="Choose your idustry"
          items={industriesToSegmentedItems()}
          selectedValue={industry}
          onChange={(size: string) => setIndustry(size)}
        />
        <SegmentedControl
          aria-label="Choose your AI Maturity Level"
          items={aiMaturityLevels}
          selectedValue={aiMaturity}
          onChange={(level: string) => setAiMaturity(level)}
        />
        {/*{!showGraph && <FeedbackState variant="loading" />}*/}
        <BarGraph
          data={{ name: industry, data: [1, 5, 6, 7] }}
          loading={!showGraph}
        />
      </Wrapper>
    </Theme>
  );
};
