import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { actShowLoading, actHiddenLoading } from './loading'
import 'react-toastify/dist/ReactToastify.css';


export const actFetchCategoriesRequest = () => {

    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi('category/all', 'GET', null)
                .then(res => {
                    if (res && res.status === 200) {
                        console.log("Loaisp", res.data)
                        dispatch(actFetchCategories(res.data));
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

export const actFetchCategories = categories => {
    return {
        type: Types.FETCH_CATEGORIES,
        categories
    }
}