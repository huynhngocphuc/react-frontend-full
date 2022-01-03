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
