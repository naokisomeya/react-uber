import React, { Fragment, useEffect, useReducer } from 'react';

import { fetchLineFoods } from '../apis/line_foods';

import { postOrder } from '../apis/orders';

// reducers
import {
  initialState,
  lineFoodsActionTyps,
  lineFoodsReducer,
} from '../reducers/lineFoods';


export const Orders = () => {

  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTyps.POSTING });
    postOrder({
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      dispatch({ type: lineFoodsActionTyps.POST_SUCCESS });
      window.location.reload();
    });
  };


  useEffect(() => {
    dispatch({ type: lineFoodsActionTyps.FETCHING });
    fetchLineFoods()
      .then((data) =>
        dispatch({
          type: lineFoodsActionTyps.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data
          }
        })
      )
      .catch((e) => console.error(e));
  }, []);

  return (

    <Fragment>
      注文画面
    </Fragment>
  )
}
