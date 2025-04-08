import { injectable } from 'inversify';

export interface ExampleService {
    getData(): string;
}

@injectable()
export class ExampleServiceImpl implements ExampleService {
  getData () {
    console.log('>>>>> getData');

    return 'Hello from Inversify!';
  }
}
