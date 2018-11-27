import {
  ModelConfig, RematchDispatch, ModelReducers, ModelEffects,
} from '@rematch/core'
import { RootState } from '-/store/index'

export type SharksState = number

export interface IReducers extends ModelReducers {
  increment(state: SharksState, payload?: number): SharksState,
}

export interface IEffects extends ModelEffects<RootState> {
  incrementAsync(): Promise<void>,
}

export interface IModel extends ModelConfig {
  state: SharksState,
  reducers: IReducers,
  effects(dispatch: RematchDispatch): IEffects,
}
