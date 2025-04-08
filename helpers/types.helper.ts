// @ts-ignore
import isFunction from 'lodash/isFunction';

// Часто проще использовать чем "| undefined"
export type Maybe<T> = T | undefined;

// значение или функция, которая вернёт значение
export type LambdaValue<TValue, TArgs = unknown> = TValue | ((args?: TArgs) => TValue);

// Если value функуия, вызвать для получения значения, иначе вернуть value.
export function resolveLambdaValue<TValue, TArgs = unknown> (value: LambdaValue<TValue>, args?: TArgs): TValue {
  // @ts-ignore
  return isFunction(value) ? value(args) : value;
}
