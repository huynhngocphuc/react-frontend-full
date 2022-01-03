import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { actShowLoading, actHiddenLoading } from './loading'


// lấy toàn bộ sản phẩm
export const actFetchProductsRequest = (page) => {
    const newPage = page === null || page === undefined ? 1 : page


    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`view/product/search?page=${newPage}`, 'GET')
                .then(res => {
                    if (res && res.status === 200) {
                        console.log("đây là trả về", res.data.listProduct)
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




// lấy sản phẩm theo id
export const actGetProductRequest = (id) => {
    return async dispatch => {
        dispatch(actShowLoading());
        const res = await callApi(`view/product/${id}`, 'GET');
        if (res && res.status === 200) {
            console.log("vào đây rồi lấy thông tin luôn rồi", res.data)
            dispatch(actGetProduct(res.data));
        }
        setTimeout(function () { dispatch(actHiddenLoading()) }, 200);
    }
}

export const actGetProduct = (product) => {
    return {
        type: Types.FETCH_PRODUCT,
        product
    }
}
// lấy sản phẩm theo từ khóa
export const actGetProductOfKeyRequest = (key, page) => {
    const newPage = page === null || page === undefined ? 1 : page
    const newKey = (key === undefined || key === '' || key === null) ? 'latop' : key
    console.log(newPage,newKey)
    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`view/product/search?keyword=${newKey}&page=${newPage}`, 'GET')
                .then(res => {
                    if (res && res.status === 200) {
                        console.log("trả về rồi",res.data.listProduct)
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
}
//lấy sản phẩm theo loại 

export const actGetProductOfCategoryRequest = (name, page) => {
    const newPage = page === null || page === undefined ? 1 : page
    const newCategory = (name === undefined || name === '' || name === null) ? 'latop' : name
    console.log(newPage,newCategory)
    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`view/product/search?category=${newCategory}&page=${newPage}`, 'GET')
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
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}
// lấy 10 sản phẩm giảm giá

export const actFetchProductsDiscountRequest = (page) => {
    const newOffset = page === null || page === undefined ? 1 : page
    return async dispatch => {
        const res = await callApi(`view/product/10discount`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsDiscount(res.data));
        }
    };
}

export const actFetchProductsDiscount = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_DISCOUNT,
        products
    }
}


