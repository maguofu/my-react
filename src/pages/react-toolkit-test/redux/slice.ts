import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NAMESPACE } from '../interface/constants';
import { pageState } from '../interface/types';
import services from '../services/index';
export const initialState: pageState = {
  dataList: [{
    age: 12,
    name: 'wasdfga',
    sex: 'man',
  }],
  flag: false,
};

export const testApi = createAsyncThunk(
  `${NAMESPACE}/testApi`,
  async (params) => await services.testApi(params),
)

const slice = createSlice({
  name: NAMESPACE,
  initialState,
  reducers: {
    updateItem(state, action: PayloadAction<number>) {
      state.dataList[action.payload].age += 1;
    },
    updateFlag(state) {
      state.flag = !state.flag;
    },
  },
  // 处理异步请求的reducer
  extraReducers: (builder) => {
    // fetch为一个异步请求
    builder.addCase(testApi.fulfilled, (state, action) => {
      const data = action.payload && action.payload.data; // data为接口返回的data字段
    })
  },
});

export const { actions, reducer } = slice;