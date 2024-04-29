import { css, FlattenSimpleInterpolation } from 'styled-components';

interface Media {
  laptop: (arg: TemplateStringsArray) => FlattenSimpleInterpolation;
  laptopSmall: (arg: TemplateStringsArray) => FlattenSimpleInterpolation;
  tablet: (arg: TemplateStringsArray) => FlattenSimpleInterpolation;
  tabletSmall: (arg: TemplateStringsArray) => FlattenSimpleInterpolation;
  mobile: (arg: TemplateStringsArray) => FlattenSimpleInterpolation;
}

type Size = 'laptop' | 'laptopSmall' | 'tablet' | 'tabletSmall' | 'mobile';

const sizes = {
  laptop: 1440,
  laptopSmall: 1239,
  tablet: 904,
  tabletSmall: 768,
  mobile: 599,
};

const media: Media = Object.keys(sizes).reduce(
  (acc: Media, label: Size) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
        ${css(...args)};
      }
    `;
    return acc;
  },
  {
    laptop: () => css``,
    laptopSmall: () => css``,
    tablet: () => css``,
    tabletSmall: () => css``,
    mobile: () => css``,
  }
);

export { media };
