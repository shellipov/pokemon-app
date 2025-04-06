import { colorsMap as colorsMapDesign } from './design/colors';
import { gradientsMap as gradientsMapDesign } from './design/colors';

export const colorsMap = { ...colorsMapDesign };
export const gradientsMap = { ...gradientsMapDesign };

export type ColorName = keyof typeof colorsMap;
export type ColorsMap = { [colorName in ColorName]: string };

export type GradientName = keyof typeof gradientsMap;
export type GradientsMap = { [gradientName in GradientName]: string[] };
