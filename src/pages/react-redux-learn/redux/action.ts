
import { UPDATE_ITEM, UPDATE_FLAG, FETCH_DATA } from '../interface/constants';
import api from '../services/index';

export function updateItem(index: number) {
  return {
    type: UPDATE_ITEM,
    index,
  }
}

export function updateFlag() {
  return {
    type: UPDATE_FLAG,
  }
}

export function fetchData() {
  return {
    type: FETCH_DATA,
  }
}