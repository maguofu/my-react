import { initialState } from './state';
import { UPDATE_ITEM, UPDATE_FLAG, FETCH_DATA } from '../interface/constants';
import { IListItem } from '../interface/types';


export function reactReduxLearnReducer(state=initialState, action) {
  switch (action.type) {
    case UPDATE_ITEM:
      return {
        ...state,
        dataList: state.dataList.map((item:IListItem, index:number) => {
          if (action.index === index) {
            return {
              ...item,
              age: item.age += 1,
            }
          }
          return item;
        })
      };
    case UPDATE_FLAG:
      return {
        ...state,
        flag: !state.flag,
      }
    case FETCH_DATA:
      return {
        ...state,
        fetchData: {errno: 0}
      }
    default:
      return state;
  }
}


