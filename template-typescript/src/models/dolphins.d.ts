import {
  ModelConfig, RematchDispatch, ModelReducers, ModelEffects,
} from '@rematch/core'
import { RootState } from '-/store/index'

export type DolphinsState = number

export interface IReducers extends ModelReducers {
  increment(state: DolphinsState): DolphinsState,
}

export interface IEffects extends ModelEffects<RootState> {
  incrementAsync(): Promise<void>,
}

export interface IModel extends ModelConfig {
  state: DolphinsState,
  reducers: IReducers,
  effects(dispatch: RematchDispatch): IEffects,
}
