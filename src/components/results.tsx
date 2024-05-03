import { BarGraph } from '../charts/bar_graph';
import { Typography } from '@pearsonwfs/component-library';
import { ComponentWrapper } from 'components/component.styles';
import styled from 'styled-components';

const StyledBarGraph = styled(BarGraph)`
  width: 600px;
`;

const ResultsContrainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface StyledTypographyProps {
  positive?: boolean;
}

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  color: ${(props) => (props.positive ? 'limegreen' : 'unset')};
`;

const ProfitContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
  align-items: center;
`;

export const Results = ({
  loading,
  industryName,
  graphData,
}: {
  loading: boolean;
  industryName: string;
  graphData: number[];
}) => {
  const netProfit = graphData.reduce((acc, val) => acc + val);

  return (
    <>
      <ComponentWrapper>
        <ResultsContrainer>
          <StyledBarGraph
            data={{ name: industryName, data: graphData }}
            loading={loading}
          />
          <ProfitContainer>
            <Typography
              component="h4"
              variant="displayXLBold"
              hasDefaultParagraphSpacing
            >
              {`Net Profit Increase:`}
            </Typography>
            <StyledTypography
              component="h4"
              variant="displayXLBold"
              hasDefaultParagraphSpacing
              positive={netProfit !== 0}
            >
              {`$${netProfit} Million`}
            </StyledTypography>
          </ProfitContainer>
        </ResultsContrainer>
      </ComponentWrapper>
    </>
  );
};
