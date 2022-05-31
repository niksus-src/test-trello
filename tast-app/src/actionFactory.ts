import {ActionType} from './types';

export function createAction<T extends string, P>(type: T, payload?: P): ActionType<T, P>;

export function createAction<T extends string, P>(type: T, payload?: P) {
  return {type, payload};
}