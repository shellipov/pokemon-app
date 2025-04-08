import { TextStyle } from 'react-native';
import {isAndroid} from '../../helpers';

// на хуавеях по умолчанию может стоять не робото, а кастомный шрифт, в котором нет всех нужных шлифов, например small-caps,
// поэтому для андроида используем робото как кастомный шрифт приложения
const FONT_STYLE_REG: TextStyle = isAndroid ? { fontFamily: 'Roboto-Regular', fontWeight: undefined } : {};
// semibold вынужденно приводим к bold, т.к. если указывать fontWeight, то fontFamily не подхватится
const FONT_STYLE_BOLD: TextStyle = isAndroid ? { fontFamily: 'Roboto-Bold', fontWeight: undefined } : {};
const FONT_STYLE_MEDIUM: TextStyle = isAndroid ? { fontFamily: 'Roboto-Medium', fontWeight: undefined } : {};
const FONT_STYLE_THIN: TextStyle = isAndroid ? { fontFamily: 'Roboto-Thin', fontWeight: undefined } : {};
const FONT_STYLE_LIGHT: TextStyle = isAndroid ? { fontFamily: 'Roboto-Light', fontWeight: undefined } : {};

const textStylesMobile: { [key in TextStyleNameDesign]: TextStyle } = {
  // title
  title1Bold: {
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 43,
    ...FONT_STYLE_BOLD,
  },
  title2Med: {
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 43,
    ...FONT_STYLE_MEDIUM,
  },
  title3Med: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 34,
    letterSpacing: 0.2,
    ...FONT_STYLE_MEDIUM,
  },
  title4Bold: {
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.2,
    ...FONT_STYLE_BOLD,
  },
  title4Thin: {
    fontSize: 24,
    fontWeight: '200',
    lineHeight: 28,
    letterSpacing: 0.2,
    ...FONT_STYLE_THIN,
  },
  title5Med: {
    fontSize: 24,
    fontWeight: '500',
    ...FONT_STYLE_MEDIUM,
  },
  title5Sem: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.2,
    ...FONT_STYLE_BOLD,
  },
  title7RegCaps: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    textTransform: 'lowercase',
    fontVariant: ['small-caps'],
    ...FONT_STYLE_REG,
  },

  // subtitle
  subtitle1Reg: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 26,
    ...FONT_STYLE_REG,
  },
  subtitle1Sem: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21,
    ...FONT_STYLE_BOLD,
  },
  subtitle1Bold: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26,
    ...FONT_STYLE_BOLD,
  },

  // body
  body1Light: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 19,
    ...FONT_STYLE_LIGHT,
  },
  body1Reg: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    ...FONT_STYLE_REG,
  },
  body1Med: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    ...FONT_STYLE_MEDIUM,
  },
  body2Light: {
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 17,
    ...FONT_STYLE_LIGHT,
  },
  body2Med: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    ...FONT_STYLE_MEDIUM,
  },
  body2Reg: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 24,
    ...FONT_STYLE_REG,
  },
  body3Reg: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
    ...FONT_STYLE_REG,
  },
  body4Reg: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    ...FONT_STYLE_REG,
  },

  // caption
  caption0RegSmallCaps: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 1,
    textTransform: 'lowercase',
    fontVariant: ['small-caps'],
    ...FONT_STYLE_REG,
  },
  caption1RegSmallCaps: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    letterSpacing: 1,
    textTransform: 'lowercase',
    fontVariant: ['small-caps'],
    ...FONT_STYLE_REG,
  },
  caption2RegCaps: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    ...FONT_STYLE_REG,
  },
  caption2SemCaps: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    textTransform: 'uppercase',
    ...FONT_STYLE_BOLD,
  },
  caption3RegCaps: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    ...FONT_STYLE_REG,
  },
  caption3Sem: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    ...FONT_STYLE_BOLD,
  },
  caption3Bold: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    ...FONT_STYLE_BOLD,
  },
};

// добавляем сюда новые ключи стилей
export enum TextStyleNameDesign {
  title1Bold = 'title1Bold',
  title2Med = 'title2Med',
  title3Med = 'title3Med',
  title4Bold = 'title4Bold',
  title4Thin = 'title4Thin',
  title5Med = 'title5Med',
  title5Sem = 'title5Sem',
  title7RegCaps = 'title7RegCaps',

  subtitle1Reg = 'subtitle1Reg',
  subtitle1Sem = 'subtitle1Sem',
  subtitle1Bold = 'subtitle1Bold',

  body1Light = 'body1Light',
  body1Reg = 'body1Reg',
  body1Med = 'body1Med',
  body2Light = 'body2Light',
  body2Med = 'body2Med',
  body2Reg = 'body2Reg',
  body3Reg = 'body3Reg',
  body4Reg = 'body4Reg',

  caption0RegSmallCaps = 'caption0RegSmallCaps',
  caption1RegSmallCaps = 'caption1RegSmallCaps',
  caption2RegCaps = 'caption2RegCaps',
  caption2SemCaps = 'caption2SemCaps',
  caption3RegCaps = 'caption3RegCaps',
  caption3Sem = 'caption3Sem',
  caption3Bold = 'caption3Bold',
}

export const textStylesDesign = { textStylesIos: textStylesMobile, textStylesAndroid: textStylesMobile };

