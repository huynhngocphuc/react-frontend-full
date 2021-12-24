
import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { actShowLoading, actHiddenLoading } from './loading'
import 'react-toastify/dist/ReactToastify.css';


export const actFetchProductsRequest = (offset) => {
    const newOffset = offset === null || offset === undefined ? 0 : offset;
    const limit = 10;
    return dispatch => {
      dispatch(actShowLoading());
      return new Promise((resolve, reject) => {
        callApi(`products?limit=${limit}&offset=${newOffset}&orderBy=-createdAt`, 'GET', null)
          .then(res => {
            if (res && res.status === 200) { 
              dispatch(actFetchProducts(res.data.results));
              resolve(res.data);
              setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          });
      });
    };
  };

