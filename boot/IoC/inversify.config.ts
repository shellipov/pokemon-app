import 'reflect-metadata';
import { Container } from 'inversify';
import { ExampleService, ExampleServiceImpl } from '@/boot/IoC/example';
import {GetPokemonDataStore, IGetPokemonDataStore} from "@/api/getPokemonDataStore/GetPokemonDataStore.store";

const InversifyConfig = new Container();

// Здесь регистрируются все зависимости
InversifyConfig.bind<ExampleService>('ExampleService').to(ExampleServiceImpl);
InversifyConfig.bind<IGetPokemonDataStore>('GetPokemonDataStore').to(GetPokemonDataStore).inSingletonScope();

export { InversifyConfig };
