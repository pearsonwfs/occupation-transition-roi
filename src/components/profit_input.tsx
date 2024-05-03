import { TextInput, Typography } from '@pearsonwfs/component-library';
import { ComponentWrapper } from 'components/component.styles';
import styled from 'styled-components';

const StyledTextInput = styled(TextInput)`
  width: 1044px;
`;
export const ProfitInput = ({
  value,
  onChange,
}: {
  value: number;
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
          Company Profits ($ Millions)
        </Typography>
        <StyledTextInput
          id="profit"
          name="Company Profit"
          label="Company Profit"
          type="number"
          value={String(value)}
          onChange={onChange}
        />
      </ComponentWrapper>
    </>
  );
};
