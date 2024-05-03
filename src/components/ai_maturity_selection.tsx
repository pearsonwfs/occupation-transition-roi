import { SegmentedControl, Typography } from '@pearsonwfs/component-library';
import { ComponentWrapper } from 'components/component.styles';
import styled from 'styled-components';

const StyledSegmentedControl = styled(SegmentedControl)`
  width: 1044px;
`;

export const AiMaturitySelection = ({
  items,
  selectedValue,
  onChange,
}: {
  items: any;
  selectedValue: string;
  onChange: any;
}) => {
  return (
    <>
      <ComponentWrapper>
        <Typography
          component="h4"
          variant="bodyLBold"
          hasDefaultParagraphSpacing
        >
          Current AI Maturity
        </Typography>
        <Typography component="p" hasDefaultParagraphSpacing>
          An estimate of the AI maturity at the company from a range of 1 to 5
          with 5 being the most proficient
        </Typography>
        <StyledSegmentedControl
          aria-label="Choose your AI Maturity Level"
          items={items}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      </ComponentWrapper>
    </>
  );
};
