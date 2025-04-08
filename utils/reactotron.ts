import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import AnsiParser from 'ansi-parser';
import reactotron from 'reactotron-react-native';

const reactotronHost = process.env.REACTOTRON_HOST || 'localhost';

const errorTypeRegExp = /.*?{(.*?)}/;

export function reactotronInit () {
  const configure = reactotron
    .configure({
      name: 'pokemonApp',
      host: reactotronHost,
    });

  // @ts-ignore
  configure.useReactNative({
    storybook: true, // If using Storybook
    asyncStorage: true, // AsyncStorage logs
    networking: true, // Network requests
    editor: false, // Disable editor integration (may conflict with Expo)
    errors: true, // Error tracking
    overlay: false, // Disable overlay (better for Expo)
  })
    .setAsyncStorageHandler(AsyncStorage)
    .connect()
    .clear();

  // patchConsoleLog();
}

function patchConsoleLog () {
  const nativeConsoleLog = console.log;

  console.log = (...args: any[]) => {
    nativeConsoleLog(...args);
    let name = 'CONSOLE.LOG';
    const isPreview = args.length > 0 && typeof args[0] === 'string';
    let important = false;

    // пишем не просто CONSOLE.LOG, а уровень лога
    const levelReg = /\{(TRACE|DEBUG|INFO|ERROR)\}/;
    const levelNames = levelReg.exec(args[0]);

    if (isPreview && levelNames?.length) {
      // задаем уровень как имя
      name = levelNames[1];
      // удаляем уровень из аргументов
      args[0] = args[0].replace(levelNames[0], '');
    }

    for (let i = 0; i < args.length; i++) {
      if (typeof args[i] !== 'string') {
        continue;
      }

      const withColor = AnsiParser.parse(args[i]).filter((item) => item.style); // проверяем, есть ли ANSI цветовая escape последовательность
      important = withColor.length > 0;

      // проверяем не является ли строка ошибкой
      const errorType = isPreview && important ? args[i].match(errorTypeRegExp) : null;

      try {
        // преобразуем строку в js - если это возможно
        if (important) {
          // обрезаем ANSI цветовую escape последовательность (reactotron её не воспринимает)
          args.splice(i, 1, AnsiParser.removeAnsi(args[i]));
        }
        args[i] = JSON.parse(args[i]);
        // если удалось преобразовать, то не требуется искать ошибку - так как это объект
        important = false;
      } catch (e) {
        // no code
      }

      name = errorType && important ? errorType[1] : name;
    }


    // находим какое количество информации можно включить в превью
    let countOfStrungsArgs = 0;
    while (args[countOfStrungsArgs] && (typeof args[countOfStrungsArgs] === 'string' || typeof args[countOfStrungsArgs] === 'number')) {
      countOfStrungsArgs++;
    }

    // делаем ограничение на 120 первых символов
    const preview = isPreview ? args.slice(0, countOfStrungsArgs).join(' ').slice(0, 120) : undefined;

    reactotron.display({
      name,
      value: args,
      preview,
      important,
    });
  };
}


