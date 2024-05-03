import { BarGraph } from '../charts/bar_graph';
import { Card, Typography } from "@pearsonwfs/component-library";
import { ComponentWrapper } from 'components/component.styles';
import styled from 'styled-components';

const StyledBarGraph = styled(BarGraph)`
  width: 700px;
`;

const ResultsContrainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface StyledTypographyProps {
  positive?: boolean;
  size?: number;
}

const StyledTypography = styled(Typography)<StyledTypographyProps>`
  color: ${(props) => (props.positive ? 'forestgreen' : 'unset')};
  text-align: ${(props) => (props.size > 10000 ? 'center' : 'left')};
  margin-bottom: 24px;
`;

const ProfitContainer = styled(Card)`
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
          <ProfitContainer variant="filled">
            <Typography
              component="h5"
              variant="displayMBold"
              hasDefaultParagraphSpacing
            >
              {`Net Profit Increase`}
            </Typography>
            <StyledTypography
              component="h3"
              variant="displayXLBold"
              hasDefaultParagraphSpacing
              positive={netProfit !== 0}
              size={netProfit}
            >
              {`$${netProfit} Million`}
            </StyledTypography>
          </ProfitContainer>
        </ResultsContrainer>
      </ComponentWrapper>
    </>
  );
};
