import {
  Theme,
  Typography,
} from '@pearsonwfs/component-library';
import { useEffect } from 'react';
import { Wrapper, ReplaceThisComponent } from './OccupationTransitionRoi.styles';
import { OccupationTransitionRoiProps } from './OccupationTransitionRoi.types';

export const OccupationTransitionRoi = ({
  accessToken = 'accessToken',
}: OccupationTransitionRoiProps) => {
  useEffect(() => {
    console.log('Write custom logic on app load here');
  }, []);

  return (
    <Theme theme="workforce">
      {/* DO NOT DELETE THE THEME WRAPPER */}
      {/* EVERYTHING INSIDE CAN BE REPLACED */}
      <Wrapper>
        <ReplaceThisComponent>
          <Typography
            component="h1"
            variant="displayXLBold"
            hasDefaultParagraphSpacing
          >
            Replace me
          </Typography>
        </ReplaceThisComponent>
      </Wrapper>
    </Theme>
  );
};
