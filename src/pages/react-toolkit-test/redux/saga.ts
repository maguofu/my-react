import { func } from 'prop-types'
// import { takeEvery } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { actions } from './slice';
import services from '../services/index';

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* fetchData() {
  const res = yield call(services.testApi);
  console.log(res)
}