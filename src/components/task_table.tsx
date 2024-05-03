import { Card, Grid, GridColumn, GridRow, Typography } from "@pearsonwfs/component-library";
import jsonData from '../assets/randomized_industry_group_tasks_final.json';
import styled from 'styled-components';
import { ComponentWrapper } from 'components/component.styles';

interface TaskGroupColumnsProps {
  taskGroup: string;
  percent_difference: string;
}
const TaskGroupColumns = ({
  taskGroup,
  percent_difference,
}: TaskGroupColumnsProps) => {
  return (
    <>
      <GridColumn mdColumns={10}>{taskGroup}</GridColumn>
      <GridColumn mdColumns={2}>{percent_difference}</GridColumn>
    </>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
`;

const StyledGrid = styled(Grid)`
  width: 100%;
`;

const CenteredGridColumn = styled(GridColumn)`
  text-align: center;
`;

interface TaskTableProps {
  industry: string;
}
const TaskTable = ({ industry }: TaskTableProps) => {
  console.log(jsonData.filter((data) => data.industry === industry));

  return (
    <>
      <ComponentWrapper>
        <Typography
          component="h4"
          variant="bodyLBold"
          hasDefaultParagraphSpacing
        >
          Industry Tasks Most Impacted By AI
        </Typography>
        <Typography component="p" hasDefaultParagraphSpacing>
          Specific task groups most impacted by AI, measured by the percent change in the relative time needed to accomplish the task by relevant occupations in the target industry
        </Typography>
        <StyledCard variant="filled">
          <StyledGrid variant="without-navigation">
            <GridRow rowSpacing={36}>
              <GridColumn mdColumns={8}>
                <Typography component="span" variant="bodyLBold">
                  Task Group
                </Typography>
              </GridColumn>
              <CenteredGridColumn mdColumns={4}>
                <Typography component="span" variant="bodyLBold">
                  Time change with AI (%)
                </Typography>
              </CenteredGridColumn>
              {jsonData
                .filter((data) => data.industry === industry)
                .sort((a, b) => {
                  return (
                    Math.abs(parseInt(b.percent_difference.replace('%', ''))) -
                    Math.abs(parseInt(a.percent_difference.replace('%', '')))
                  );
                })
                .map((data, index) => {
                  if (index < 10) {
                    return (
                      <TaskGroupColumns
                        taskGroup={data.task_group}
                        percent_difference={data.percent_difference}
                      />
                    );
                  }
                })}
            </GridRow>
          </StyledGrid>
        </StyledCard>
      </ComponentWrapper>
    </>
  );
};

export const StyledTaskTable = styled(TaskTable)`
  margin-top: 24px;
`;
