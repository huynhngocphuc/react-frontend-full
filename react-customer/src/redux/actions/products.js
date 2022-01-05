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
                        localStorage.setItem("_keyword",newKey)
                        console.log("trả về rồi lala",res.data)
                        const newKeyPage = {key:newKey,totalPage: res.data.totalPage}
                        dispatch(actFetchProducts(res.data.listProduct));
                        dispatch(actFetchKeySearch(newKeyPage));
                        console.log("lưu search",newKeyPage)
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
                        const newKeyPage = {key:newCategory,totalPage: res.data.totalPage}
                        dispatch(actFetchProducts(res.data.listProduct));
                        dispatch(actFetchKeySearch(newKeyPage));
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
//lưu tên search
export const actFetchKeySearch = (newKeyPage) => {
    return {
        type: Types.FETCH_KEYSEARCH,
        newKeyPage
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
// lấy 10 sản phẩm bán chạy

export const actFetchProductsBestRequest = (page) => {
    const newOffset = page === null || page === undefined ? 1 : page
    return async dispatch => {
        const res = await callApi(`view/product/10bestproduct`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsBest(res.data.map));
        }
    };
}

export const actFetchProductsBest = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_BEST,
        products
    }
}


