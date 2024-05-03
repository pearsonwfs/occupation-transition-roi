import badgesImage from '../assets/light_BG.png';
import styled from 'styled-components';
import { Button, Typography } from '@pearsonwfs/component-library';
import { ComponentWrapper } from 'components/component.styles';

const StyledImage = styled.img`
  width: 100%;
`;

const CtaContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CallToAction = () => {
  return (
    <>
      <ComponentWrapper>
        <Typography
          component="h4"
          variant="bodyLBold"
          hasDefaultParagraphSpacing
        >
          Upskill Your Workforce Today
        </Typography>
        <Typography component="p" hasDefaultParagraphSpacing>
          Create your AI credentials and take a look at our vast collection of
          credentials in artificial intelligence, data science, and more!
        </Typography>
        <StyledImage id="badges-image" src={badgesImage} />
        <ComponentWrapper>
          <CtaContainer>
            <Button
              variant="primary"
              href="https://www.credly.com/skills/FS000456#gs_q=ai"
              buttonText="Browse AI Badges"
              component="a"
            />
          </CtaContainer>
        </ComponentWrapper>
      </ComponentWrapper>
    </>
  );
};
