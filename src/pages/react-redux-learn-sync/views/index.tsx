
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateItem, updateFlag } from '../redux/action';
import { IListItem, pageState } from '../interface/types';
const { useEffect } = React;
require('../style/index');

function IndexPage(props) {
  const dispatch = useDispatch();
  const { dataList, flag } = useSelector(
    (state: pageState) => state,
  );

  const itemClickhandle = (item: IListItem, index: number) => {
    dispatch(updateItem(index));
    dispatch(updateFlag());
  }

  return (
    <div className='test-page-container'>
      {dataList.map((item, index) => (
        <p
          className='list-item'
          key={item.age}
          onClick={() => itemClickhandle(item, index)}
        >
          {`name is ${item.name}---age is ${item.age} &&& flag is ${flag}`}
        </p>)
      )}
    </div>
  );
}

export default IndexPage;