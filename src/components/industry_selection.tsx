import { SegmentedControl, Typography } from '@pearsonwfs/component-library';
import { ComponentWrapper } from 'components/component.styles';
import styled from 'styled-components';

const StyledSegmentedControl = styled(SegmentedControl)`
  width: 1044px;
`;

export const IndustrySelection = ({
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
          Company Industry
        </Typography>
        <Typography component="p" hasDefaultParagraphSpacing>
          Please select your company's current industry. Please note more
          industries are coming soon.
        </Typography>
        <StyledSegmentedControl
          aria-label="Choose your industry"
          items={items}
          selectedValue={selectedValue}
          onChange={onChange}
        />
      </ComponentWrapper>
    </>
  );
};
