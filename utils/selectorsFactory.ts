
import { createSelector } from '@reduxjs/toolkit';

/**
 * 根据fields字段，自动生成Selector
 * @param namespace store的一级分支名称
 * @param initialState 初始值
 * @template T initialState类型
 * @return state的一级selectors；
 */
type AinitialState<T> = {
  [P in keyof T]?: (state: T) => T[P]
}
function autoInitSelectors<T>(namespace: string, initialState: T): AinitialState<T> {
  const selectorsObj: AinitialState<T> = {};
  const namespaceSelector = (state): T => state[namespace];
  const fields = Object.keys(initialState);
  for (let i = 0; i < fields.length; i++) {
    const element = fields[i];
    selectorsObj[element] = createSelector(
      namespaceSelector,
      (subState: T) => subState[element],
    );
  }
  return selectorsObj;
}

export default autoInitSelectors;
