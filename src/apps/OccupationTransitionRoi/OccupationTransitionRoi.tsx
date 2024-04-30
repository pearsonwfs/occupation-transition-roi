import { Theme, Typography } from '@pearsonwfs/component-library';
import { useEffect, useState } from "react";
import { Wrapper } from './OccupationTransitionRoi.styles';
import { OccupationTransitionRoiProps } from './OccupationTransitionRoi.types';
import { occupationDetails } from '../../apis/occupationDetails';

export const OccupationTransitionRoi = ({
  accessToken = 'accessToken',
}: OccupationTransitionRoiProps) => {
  const [details, setDetails] = useState(undefined);
  useEffect(() => {
    occupationDetails({ accessToken, occupationId: 'ICT.SSD' }).then(
      (data: any[]) => {
        setDetails(data);
      }
    );
  }, []);

  return (
    <Theme theme="workforce">
      <Wrapper>
        <Typography
          component="h1"
          variant="displayXLBold"
          hasDefaultParagraphSpacing
        >
          Occupation Transitions ROI
        </Typography>
        <Typography component="h2" variant="displayM" hasDefaultParagraphSpacing >
          {details?.category_name}
        </Typography>
      </Wrapper>
    </Theme>
  );
};
