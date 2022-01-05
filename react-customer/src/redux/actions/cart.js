import * as Types from '../../constants/ActionType';
import { toast } from 'react-toastify';
import callApi from '../../utils/apiCaller';
import 'react-toastify/dist/ReactToastify.css';


export const actAddCartRequest = (customerId, product, quantity) => {

    console.log("chuẩn bị call api", customerId, product, quantity)
    const newQuantity = quantity ? quantity : 1;
        const dataguidi = { customerId, productId: product.productId, quantity: newQuantity }
    return async () => {
        if (quantity > product.quantity) {
            return toast.error(`Sản phẩm của chúng tôi hiện còn có ${product.quantity} sản phẩm`)
        }
        console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
        const res = await callApi('cart', 'POST', dataguidi);
        if (res && res.status === 201) {
            toast.success("thêm sản phẩm thành công");
        };
    }
}

export const actAddCart = (item) => {
    return {
        type: Types.ADD_CART,
        item
    }
}

// lấy dữ liệu giỏ hàng
export const actFetchCartRequest = (id) => {
    console.log("dữ liệu chuẩn bị gửi đi", id)
    return async dispatch => {
        console.log("dữ liệu chuẩn bị gửi đi",id)
        const res = await callApi(`cart/${id}`, 'GET');
        if (res && res.status === 200) {
            console.log("giỏ hang của tôi",res.data.cartEntities)
            dispatch(actFetchCart(res.data.cartEntities));
        };
    };
}

export const actFetchCart = (items) => {
    return {
        type: Types.FETCH_CART,
        items
    }

}

// xóa giỏ hàng
export const actRemoveCartRequest = (item) => {
    let id = parseInt(localStorage.getItem("_id"))
    const dataguidi = {customerId:id,productId:item.productId,quantity:item.quantity}
    console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
    return async dispatch => {
        const res = await callApi(`cart`, 'DELETE',dataguidi);
        if (res && res.status === 200) {
            console.log("giỏ hang của tôi",res.data)
        };
    };
}

export const actRemoveCart = (item) => {
    return {
        type: Types.REMOVE_CART,
        item
    }
}

// sửa giỏ hàng
export const actUpdateCartRequest = (item) => {
    let id = parseInt(localStorage.getItem("_id"))
    const dataguidi = {customerId:id,productId:item.productId,quantity:item.quantity}
    console.log("dữ liệu chuẩn bị gửi đi", dataguidi)
    return async dispatch => {
        const res = await callApi(`cart`, 'PUT',dataguidi);
      
    };
}

export const actUpdateCart = (item) => {
    return {
        type: Types.UPDATE_CART,
        item
    }
}