
import { UPDATE_ITEM, UPDATE_FLAG, FETCH_DATA, SETFETCHDATA } from '../interface/constants';
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

export function setFetchData(fetchData?: any) {
  return {
    type: SETFETCHDATA,
    fetchData,
  }
}

export function fetchData(params?: any) {
  return (dispatch) => {
    api.testApi(params).then(res => {
      dispatch(setFetchData(res))
    })
  }
}