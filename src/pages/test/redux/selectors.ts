
import selectorsFactory from '@utils/selectorsFactory.ts';
import { initialState } from './slice';
import { NAMESPACE } from '../interface/constants';
export const selectors = selectorsFactory(NAMESPACE, initialState);