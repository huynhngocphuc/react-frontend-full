
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

export const actAddProductRequest = (data) => {
  console.log("duw lieu request",data)
  return async dispatch => {
    const res = await callApi('product', 'POST', data);
    console.log("res",res)
    if (res && res.status === 201) {
      toast.success('Thêm sản phẩm thành công')
      console.log("dữ liệu trả về",res.data)
      dispatch(actAddProduct(res.data));
    }
  }
}
export const actAddProduct = (data) => {
  return {
    type: Types.ADD_PRODUCT,
    data
  }
}

export const actDeleteProductRequest = (id) => {
  return async dispatch => {
    await callApi(`product/delete/${id}`, 'PUT', null);
    dispatch(actDeleteProduct(id));
  }
}
export const actDeleteProduct = (id) => {
  return {
    type: Types.REMOVE_PRODUCT,
    id
  }
}


export const actEditProductRequest = (id, data) => {
  return async dispatch => {
    const res = await callApi(`product/${id}`, 'PUT', data);
    if (res && res.status === 200) {
      toast.success('Sửa sản phẩm thành công')
      dispatch(actEditProduct(res.data));
    }
  }
}

export const actEditProduct = (data) => {
  return {
    type: Types.EDIT_PRODUCT,
    data
  }
}

