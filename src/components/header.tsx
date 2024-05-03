import { Typography } from '@pearsonwfs/component-library';

export const Header = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="displayXLBold"
        hasDefaultParagraphSpacing
      >
        AI Impact Analyzer
      </Typography>
      <Typography component="p" hasDefaultParagraphSpacing>
        Based on research from Gartner and McKinsey, and leveraging our tools
        for labor market insights, the following calculator takes in your
        company's profit this year, your industry, and your current level of
        maturity to assess the potential impact of AI in your business in the
        coming few years. We assess four individual categories which are
        combined into one estimated value for potential net profit increase due
        to a successful AI transformation initiative in your company.
      </Typography>
    </>
  );
};
