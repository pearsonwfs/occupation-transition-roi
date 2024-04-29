import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;

export const Navigation = styled.div`
  ${({ theme }) => css`
    height: 100vh;
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    background-color: ${theme.v1.semanticColors.fill.neutral.light};

    &::before {
      content: '';
      position: absolute;

      background-color: transparent;
      right: -25px;
      height: 50px;
      width: 25px;
      top: 0;
      border-top-left-radius: 25px;
      box-shadow: 0 -25px 0 0 ${theme.v1.semanticColors.fill.neutral.light};
    }
  `}
`;
