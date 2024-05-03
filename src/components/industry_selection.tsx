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
