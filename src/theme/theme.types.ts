export type ThemeSizes = 'sm' | 'md' | 'lg';

export enum ThemeName {
  Light = 'Light',
  Dark = 'Dark',
  System = 'System'
}

export const themeNameDefault: ThemeName = ThemeName.Dark;
