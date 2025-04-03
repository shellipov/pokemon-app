// По-умолчанию все флаги заданы текущей работы, в production выключены

import type { INavigationManager } from '@VTB/service/NavigationManager';
import type { ScreenName } from '@VTB/shared/types';

type DebugNavigation = (n: INavigationManager) => void;

// DebugVars не должен содержать никаких значимых для приложения данных, в релизе он пустой
export const DebugVars = !__DEV__ ? undefined : {
  isDev: true,
  // экран авторизации
  // показать имена экранов
  showScreenNames: false,
  // разрешить дебаг режим AppModule
  enableDebugModule: true,
  // разрешить использования реатотрона bootstrapper
  enableReactotron: true,
  // также нужно включить enableDebugModule App
  enableToggleDebugButton: false,
  // кнопка переключения темы App
  enableToggleThemeButton: false,
  // кнопка переключения локализации App
  enableToggleLocalizationButton: false,
  // спрятать splashScreen bootstrapper
  hideSplashScreen: true,
  // показать PinCode ScreenNewPinCode
  showDefaultPinCode: true,
  defaultLogin: '',
  defaultLoginPhone: '79030017417',
  defaultPassword: '',
  defaultSmsCode: '',
  defaultPinCode: '',
  // импорт RemoteConfig Firebase (по-умолчанию: true)
  useFirebaseRemoteConfig: true,
  // Использовать локальный кеш ремоут конфига (по-умолчанию: true)
  useLocalRemoteConfig: true,
  // создать responder ReactApplication
  enableDevMenuGestureResponder: true,
  // скрыть предупреждения reactotron
  hideYellowBoxWarnings: false,
  // очистить историю ChatHistoryStore
  clearChatHistory: false,
  // при старте приложения пропустить экран ввода пин-кода AppVM, это приводит также к тому,
  // что при отладке остаётся заблокирован SecurityV2 и может возникнуть ошибка при обновлении токена
  skipUnlockScreen: true,
  // работает в связке с autoLoginFlow. При автологине вход по биометрии по умолчанию будет выключен
  skipNewBiometryScreen: true,
  // throw new Error TradeList, StpOrderList, OrderList
  argsAssertValidation: true,
  // вывести alert c сообщением, в случае вызова телефонного приложения SupportService
  showDebugAlerts: true,
  // не посылать исключения initRN2CrashliticBridge
  isCrashliticDisabled: true,
  // отрисовка индикатора DebugIndicator
  renderDebugIndicator: true,
  // восстановление состояние сессии SessionStoreEFTR
  isDevSessionPersistEnabled: true,
  // обновить данные в PreloadStore
  isPreloadDictData: true,
  // послать предупреждение в AccountRemotePreferences
  callRefreshWarn: true,
  // выяснить кто вызвал тот или оной метод/функцию в getStack helper
  checkWhoCallFunction: true,
  // загрузка экрана App, LoginDebugCommand
  appActiveNav: 'Root' as ScreenName,
  // вызов исключения (IoC)
  implementDisposableInterface: true,
  // Выводит в лог "подвисший запрос" (reactotron показывает лог запроса только после его выполнения)
  enableLongFetchLogger: true,
  // Включить проверки через assert
  enableAssert: true,
  // Включить логику Playground
  enablePlayground: true,
  // Разрешить обработчик "необработанного исключения" в DEV режиме
  enableExceptionHandler: false,
  // Включить логирование ошибок ExceptionHandlerService (лог засерает консоль, включить после устранения причин большого кол-ва ошибок)
  enableExceptionHandlerLog: true,
  // Отключить правила сложности нового пароля, чтобы можно было его менять на простой "1" для отладки
  disableNewPasswordValidators: true,
  // Отображать в размещениях тип и ид
  showPlacementInfo: false,
  // Дополнительно обновлять статус сервисного режима для нужд отладки
  isDebugRefreshLoginDisabled: false,
  // Имитировать задание API_CACHE_SETTINGS для всех API запросов
  enableCacheSettingsForAllURLs: true,
  debugNrbMobileLogin: '',
  debugNrbMobilePassword: '',
  debugDeeplink: 'Root',
  // Навигация для быстрого перехода на экран, над которым ты работаешь, кнопка в DebugPanel
  debugNavigation:  undefined as (DebugNavigation | undefined),
  // Показать кнопку "dFlag" для вкл/выкл DebugFlag.value, используя который, можно поймать нужное состояние при отладке
  enableDebugFlagButton: false,
  // По-возможности выполнить шаги логина автоматически (по-умолчанию выключено)
  autoLoginFlow: true,
  // Время в мс до истечения токена аутентификации, когда пора выполнять обновление токена
  timeToRefreshAccessToken: 0,
  isAllBottomTabsAvailable: true,
  // Задать интервал поллинга методов на уровне IntervalBasedDataSource и DataStoreBase в мс (если 0, применяются существующие интервалы)
  pollingInterval: 0,
};

if (DebugVars) {
  // logger.levels.trace.enable(); // all logs, levels see in src/vtb/shared/logger/logger.config.ts
  // logger.levels.debug.enable(); // лог отладки без огромных дампов данных, которые часто мешают
  // logger.levels.info.enable();
}

if (DebugVars) {
  // Тут можно включить необходимые флаги для сборки отладочных сборок, в общих ветках, должны быть закомментированы
  DebugVars.showScreenNames = true;
  // DebugVars.showPlacementInfo = true;
  // DebugVars.enableReactotron = true;
  // DebugVars.enableDebugModule = true;
  // DebugVars.enableToggleDebugButton = true;
  DebugVars.enableToggleThemeButton = true;
  // DebugVars.enableToggleLocalizationButton = true;
  // DebugVars.useFirebaseRemoteConfig = false;
  // DebugVars.clearChatHistory = true;
  // DebugVars.autoLoginFlow = false;
  // DebugVars.isDevSessionPersistEnabled = false;
  // DebugVars.skipUnlockScreen = false;
  // DebugVars.skipNewBiometryScreen = false;
  DebugVars.hideYellowBoxWarnings = true;
  // DebugVars.debugNavigation = n => n.navigateTo('UnifiedTransactionHistory');
  // DebugVars.isAllBottomTabsAvailable = true;
  // DebugVars.pollingInterval = 60000;
}
