import AsyncStorage from '@react-native-async-storage/async-storage';
// import { IDebugCommand } from '@VTB/service/DebugCommands';
// import { gDebugCommandsService } from '@VTB/service/DebugCommands/DebugCommandsService.service';
import AnsiParser from 'ansi-parser';
// import { autorun } from 'mobx';
import reactotron from 'reactotron-react-native';
// import ReactotronFlipper from 'reactotron-react-native/dist/flipper';
// import { name as appName } from '../../app.json';

const reactotronHost = process.env.REACTOTRON_HOST || 'localhost';

type Reactotron = typeof reactotron;
let tron: Reactotron | undefined;
const errorTypeRegExp = /.*?{(.*?)}/;

export function reactotronInit () {
  const r = reactotron
    .configure({
      name: 'pokemonApp',
      host: reactotronHost,
      // createSocket: path => new ReactotronFlipper(path),
    });

  // @ts-ignore
  r.useReactNative({
    asyncStorage: { ignore: [] },
    networking: {},
    editor: {},
    errors: {
      veto: (stackFrame: any) => false,
    },
  })
    .setAsyncStorageHandler(AsyncStorage)
    .connect()
    .clear();

  tron = r;

  patchConsoleLog();
  // debugCommandsInit();
}

export async function reactotronConnect () {
  if (tron && !(tron as any).connected) {
    await tron.connect();
    console.log('REACTOTRON Reconnected', tron); // 🐞 ✅
  }
}

// patch the console.log
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
    const preview = isPreview ? args.slice(0, countOfStrungsArgs).join(' ').slice(0, 120) : null;

    reactotron.display({
      name,
      value: args,
      preview,
      important,
    });
  };
}

// function debugCommandsInit() {
//   autorun(() => {
//     debugCommandsMap(gDebugCommandsService.commands);
//   });
// }

 type DebugCommandHandler = () => void;

 interface IDebugCommand {
  title: string;
  handler: DebugCommandHandler;
}

// interface ICustomCommand {
//   debugCommand: IDebugCommand;
//   uid: string;
//   remover: () => void;
// }

// let customCommands: ICustomCommand[] = [];

// function debugCommandsMap(debugCommands: IDebugCommand[]) {
//   const r = tron!;
//   // remove deleted
//   const removedCommands = customCommands.filter(cc => debugCommands.indexOf(cc.debugCommand) === -1);
//   removedCommands.forEach(cc => cc.remover());
//
//   // add new
//   customCommands = customCommands.filter(cc => debugCommands.indexOf(cc.debugCommand) !== -1);
//   debugCommands.forEach(dc => {
//     const isExists = customCommands.findIndex(cc => cc.debugCommand === dc) !== -1;
//     const uid = debugCommandUidAbbrev(dc);
//     const description = `command (cmd+.): ${uid}`;
//     if (!isExists) {
//       const remover = r.onCustomCommand({
//         command: uid, description, title: dc.title, handler: () => {
//           console.log(`🐞 [DebugCommand] Execute: ${dc.title}`); // 🐞 ✅
//           dc.handler();
//         },
//       });
//
//       customCommands.push({
//         debugCommand: dc,
//         uid,
//         remover,
//       });
//     }
//
//     console.log(`🐞 [DebugCommand] ${description} → ${dc.title}`); // 🐞 ✅
//   });
// }

// function debugCommandUidAbbrev(dc: IDebugCommand): string {
//   return dc.title.trim().split(' ').map(word => word[0]).join('').toLowerCase();
// }
