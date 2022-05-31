import { ThunkAction } from "redux-thunk";
import { State } from "./store";
import {Action} from 'redux'

export type Thunk<T = void> = ThunkAction<T, State, never, any>;
export type ActionType<T extends string = string, P = any> = Action<T> & {payload: P};
export type ActionFunc<R = any> = (...args: never[]) => ActionType;
export type ActionsUnion<
  A extends Record<string, ActionFunc<R['payload']>>,
  R extends ReturnType<A[keyof A]> = ReturnType<A[keyof A]>
> = R;