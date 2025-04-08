// По-умолчанию все флаги заданы текущей работы, в production выключены
import { ScreenName } from '@/src/AppPouter.types';

export const DebugVars = !__DEV__ ? undefined : {
  isDev: true,
  // экран авторизации
  // показать имена экранов
  showScreenNames: false,
  // разрешить использования реатотрона bootstrapper
  enableReactotron: true,
  // кнопка переключения темы App
  enableToggleThemeButton: false,
  // скрыть предупреждения reactotron
  hideYellowBoxWarnings: false,
  appActiveNav: 'MainPage' as ScreenName,
  // Выводит в лог "подвисший запрос" (reactotron показывает лог запроса только после его выполнения)
  enableLongFetchLogger: true,
};

if (DebugVars) {
  // logger.levels.trace.enable(); // all logs, levels see in src/vtb/shared/logger/logger.config.ts
  // logger.levels.debug.enable(); // лог отладки без огромных дампов данных, которые часто мешают
  // logger.levels.info.enable();
}

if (DebugVars) {
  DebugVars.showScreenNames = true;
  DebugVars.enableToggleThemeButton = true;
  DebugVars.hideYellowBoxWarnings = true;
}
