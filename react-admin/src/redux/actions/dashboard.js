import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { actShowLoading, actHiddenLoading } from './loading'
export const actFetchDashboardRequest = () => {
  return async dispatch => {
    dispatch(actShowLoading());
      const res = await callApi('statistic/general', 'GET', null);
      if (res && res.status === 200) {
        dispatch(actFetchDashboard(res.data));
      }
      setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
  };
}

export const actFetchDashboard = (data) => {
  return {
      type : Types.FETCH_DASHBOARD,
      data
  }
}
