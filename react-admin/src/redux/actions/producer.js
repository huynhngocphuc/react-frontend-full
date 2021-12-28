import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchProducersRequest = () => {
    
    return dispatch => {
      dispatch(actShowLoading());
      return new Promise((resolve, reject) => {
        callApi('supplier/all', 'GET', null)
          .then(res => {
            if (res && res.status === 200) {
              dispatch(actFetchProducers(res.data));
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
  
  export const actFetchProducers = (producers) => {
    return {
      type: Types.FETCH_PRODUCERS,
      producers
    }
  }