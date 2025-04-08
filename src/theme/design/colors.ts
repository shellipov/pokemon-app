
// базовые цвета. выносим сюда чтобы не копипастить и быстрее менять всю карту цветов
const bgBasic = ['#F7F8FC', '#000000'];
const bgAdditionalOne = ['#FFFFFF', '#151118'];
const elementSecondary = ['#898A93', '#6F6F79'];
const elementSuccess = ['#2EC290', '#00A200'];
const free = ['#000000', '#FFFFFF'];

export const colorsMap = {
  // не зависят от темы
  debug: 'magenta',
  freeBlack: '#000000',
  white: '#FFFFFF',
  // BG
  transparent: 'transparent',
  bgBasic,
  bgSuccess: ['#D7FEF1', '#192E23'],
  bgAdditionalOne,
  bgAdditionalTwo: ['#EEF1F3', '#252230'],
  bgAdditionalThree: ['#0E0E10', '#FEFEFE'],
  bgAdditionalFour: [bgAdditionalOne[0], '#0A080C'],

  // Element
  elementPrimary: ['#302F2D', '#FEFEFE'],
  elementSecondary,
  elementAdditional: ['#DEE3E7', '#2A292D'],
  elementDivider: ['#D8DADF', '#5C5C67'],
  elementDividerTwo: ['#D4D4D4', '#252230'],
  elementPrivate: ['#D7AA88', '#B18947'],
  elementDisableButton: ['#E3E3EB', '#424045'],
  elementSuccess,
  elementAttention: ['#FF8515', '#FF8515'],
  elementError: ['#E7353F', '#FF0968'],

  // Text
  textPrimary: ['#302F2D', '#FFFFFF'],
  textPrivate: ['#C68F66', '#B18947'],
  textSecondary: elementSecondary,
  textSuccess: elementSuccess,
  textError: ['#E7353F', '#FF0968'],
  textAdditional: ['#DEE0E3', '#393640'],
  textInversion: ['#FFFFFF', '#0E0E10'],

  // Special
  specialExtra01: ['#C54BED', '#C54BED'],
  specialExtra01b: ['#EAE1F7', '#27173A'],
  specialExtra02: ['#00C399', '#00C399'],
  specialExtra02b: ['#DBF0F5', '#13262B'],
  specialExtra03: ['#53B1F8', '#53B1F8'],
  specialExtra03b: ['#CBE4FC', '#14273C'],
  specialExtra04: ['#B5B90A', '#B5B90A'],
  specialExtra05: ['#F14F5B', '#F14F5B'],
  specialExtra06: ['#F09B3D', '#F09B3D'],
  specialExtra07: ['#FFD013', '#FFD013'],
  specialExtra08: ['#D2342C', '#D2342C'],
  specialProduct01: ['#58AD98', '#6F9C91'],
  specialProduct02: ['#E46D7C', '#C89097'],
  specialProduct03: ['#7372B6', '#706F9C'],
  specialProduct04: ['#DFA144', '#C89097'],
  specialProduct05: ['#4BA1B4', '#6F949C'],
  specialProduct06: ['#9F8888', '#C0B7B7'],
  specialOrangeGradientStart: ['#F8D9B5', '#53320B'],
  specialOrangeGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialGreyGradientStart: ['#D1D1D1', '#302D2C'],
  specialGreyGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialAdvisor: ['#CA6751', '#552115'],
  specialSbp: ['#141630', '#FFFFFF'],
  specialCard01: '#349968',
  specialCard02: '#2C40A1',
  specialCard03: '#4A484F',
  specialBrownGradientStart: ['#F0E3DF', '#2D201C'],
  specialBrownGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialBrownGradientTwoStart: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialBrownGradientTwoEnd: ['#F0E3DF', '#2D201C'],
  specialImageBGStart: [bgBasic[0], bgBasic[1]],
  specialImageBGEnd: ['#E3E5ED', '#2D201C'],
  specialGreenGradientStart: ['#C8F5E6', '#0B2318'],
  specialGreenGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialRedGradientStart: ['#F7D5D5', '#370810'],
  specialRedGradientTwoStart: ['#EBE8EB', free[0]],
  specialRedGradientTwoEnd: ['#F0E3DF', '#280A0E'],
  specialRedGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialBlueGradientStart: ['#E6E8F0', '#0E1C28'],
  specialBlueGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialPurpleGradientStart: ['#E7DFF0', '#221C2D'],
  specialPurpleGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialGlamStart: ['#E389C0', '#D992B8'],
  specialGlamEnd: ['#F2D7F2', '#523747'],
  specialProgressBlue: ['#B2DBFB', '#1C3B5A'],
  specialProgressGreen: ['#B9F5B0', '#233F1F'],
  specialProgressRed: ['#F2D9D9', '#451218'],
  specialProgressViolet: ['#E8E3F1', '#44395E'],
  specialProgressSand: ['#E7D481', '#907D32'],
  specialSwitch: ['#DDC2AD', '#765F3C'],
  specialBlueGradientGraphStart: ['#90D4FF', '#0A517D'],
  specialBlueGradientGraphEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialGreenGradientGraphStart: ['#C8F5E6', '#194E1A'],
  specialBlueGradientGraphFlippedStart: [bgAdditionalOne[0], bgBasic[1]],
  specialBlueGradientGraphFlippedEnd: ['#90D4FF', '#12293F'],
  specialEmptyGraphStart: ['#E6EAF4', '#201F2A'],
  specialEmptyGraphEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialNeutralStart: [bgBasic[0], bgBasic[1]],
  specialNeutralEnd: ['#E3E5ED', '#1C2B2D'],
  // временно эти цвета, в библиотеке цветов пока нет, но будет скоро для разных типов баннеров
  specialBanner01Start: ['#DDC2AD', '#3E3330'],
  specialBanner01End: ['#765F3C', '#221815'],
  specialBanner02: '#D5CBB6',
  specialBanner03Start: '#5F1820',
  specialBanner03End: '#1B070A',
  specialBanner05Start: ['#DDD0BC', '#222430'],
  specialBanner05End: ['#F3E9DA', '#393939'],
  specialGoldGradientStart: '#B18947',
  specialGoldGradientTwo: ['#C48E64', '#A27D41'],
  specialGoldCashbackGradientStart: ['#E7C897', '#533D27'],
  specialGoldCashbackGradientEnd:  ['#A78244', '#D4B980'],
  specialGreenGradientMirStart: ['#91D6BF', '#005A00'],
  specialGreenGradientMirEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialShadingGradientEnd: [bgBasic[0], bgBasic[1]],
  specialLockedCardFrontBgGradientStart: ['#000000', '#000000'],
  specialLockedCardFrontBgGradientEnd: ['#000000', '#312C20'],
  specialSandGradientStart: ['#E5DBAD', '#5C4C10'],
  specialSandGradientEnd: [bgAdditionalOne[0], bgAdditionalOne[1]],
  specialDepositIconStopColor: ['#E6E8F1', '#201B24'],
};

type ColorName = keyof typeof colorsMap;
type ColorsMap = { [colorName in ColorName]: string };

export const opacityMap = {
  /**
   * Прозрачность для элементов в нажатом состоянии.
   */
  opacityPress: [0.5, 0.5],
  opacityCardShadow: [0.08, 0.80],
};

export type OpacityName = keyof typeof opacityMap;
export type OpacityMap = { [opacityName in OpacityName]: number };

export const gradientsMap = {
  specialCardBorderGradient: [
    ['#D2B47C', '#B18947', '#DACAB1', '#B18947', '#BE8D31','#ECE9E9'],
    ['#6B5531', '#B18947', '#70572E', '#2C2212'],
  ],
  specialCardFrontBgGradient: ['#000000', '#312C20'],
};


export enum ColorMutation {
  Normal = 'Normal',
  Press = 'Press',
  Disabled = 'Disabled',
}

export type GradientName = keyof typeof gradientsMap;
export type GradientsMap = { [gradientName in GradientName]: string[] };
