
import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { actShowLoading, actHiddenLoading } from './loading'
import 'react-toastify/dist/ReactToastify.css';


export const actFetchProductsRequest = (page) => {
  const newPage = page === null || page === undefined ? 1 : page;
  return dispatch => {
    dispatch(actShowLoading());
    return new Promise((resolve, reject) => {
      callApi(`product/all?page=${newPage}`, 'GET', null)
        .then(res => {
          if (res && res.status === 200) {
            dispatch(actFetchProducts(res.data.listProduct));
            resolve(res.data);
            setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
          setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
        });
    });
  };
};

export const actFetchProducts = (products) => {
  return {
    type: Types.FETCH_PRODUCTS,
    products
  }
}

