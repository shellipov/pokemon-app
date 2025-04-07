import 'reflect-metadata';
import { Container } from 'inversify';
import { ExampleService, ExampleServiceImpl } from '@/boot/IoC/example';

const InversifyConfig = new Container();

// Здесь регистрируются все зависимости
InversifyConfig.bind<ExampleService>('ExampleService').to(ExampleServiceImpl);

export { InversifyConfig };
