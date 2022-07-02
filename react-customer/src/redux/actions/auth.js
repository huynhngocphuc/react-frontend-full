import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { toast } from 'react-toastify';
import { startLoading, doneLoading } from '../../utils/loading';
import 'react-toastify/dist/ReactToastify.css';

export const actLoginRequest = (user) => {
    return async dispatch => {
        const res = await callApi('auth/login', 'POST', user);
        if (res && res.data.token) {
            console.log(res.data)
            const token = res.data.token
            const id = res.data.customerId
            const idAccount = res.data.id
            localStorage.setItem('_auth', token);
            localStorage.setItem('_id', id);
            localStorage.setItem('_idaccount', idAccount)
            localStorage.setItem('_username', res.data.username);
            dispatch(actLogin(token));
        }
    };
}
export const actLoginGoogleRequest = (token, customerId, id) => {
    return async dispatch => {
        const res = await callApi(`auth/oauth/google?id=${id}&customerId=${customerId}`, 'GET');

        console.log(`duw lieu xem co ten khong${res.data}`)
        // const token = res.data.token
        // const id = res.data.customerId
        // const idAccount = res.data.id
        localStorage.setItem('_auth', token);
        localStorage.setItem('_id', customerId);
        localStorage.setItem('_idaccount',id)
        localStorage.setItem('_username', "CUSTOMER");
        dispatch(actLogin(token));

    };
}

export const actLogin = (token) => {
    return {
        type: Types.LOGIN,
        token
    }
}

export const actRegisterRequest = (user) => {
    console.log(user)
    return async () => {
        startLoading();
        const res = await callApi('registration', 'POST', user);
        if (res && res.status === 200) {
            console.log(res)
            toast.success(res.data)
            doneLoading()
        }
    };
}

export const actTokenRequest = (token) => {
    return async dispatch => {
        dispatch(actToken(token));
    };
}

export const actToken = (token) => {
    return {
        type: Types.TOKEN_REDUX,
        token
    }
}

export const actForgotPasswordRequest = (email) => {
    return async () => {
        startLoading()
        const res = await callApi('auth/forgot', 'POST', email);
        if (res && res.status === 200) {
            const mes = res.data.message ? res.data.message : "Vui lòng xác nhận email để đổi mật khẩu";
            localStorage.setItem('_mailreset', email.email);
            toast.success(mes)
            doneLoading()
        }
    };
}

export const actPasswordRequest = (user) => {
    return async () => {
        startLoading()
        const res = await callApi('auth/reset', 'POST', user);
        if (res && res.status === 200) {
            const mes = res.data.message ? res.data.message : "Đổi mật khẩu thành công";
            localStorage.removeItem("_mailreset");
            toast.success(mes)
            doneLoading()
        }
    };
}
// export const actActiveRequest = (code) => {
//     console.log(code)
//     return async () => {
//         const res = await callApi(`registration/activate/${code}`, 'GET',null);
//         if (res && res.status === 200) {
//             console.log(res)
//             toast.success('Xác thực thành công')
//         }
//         toast.success('Xác thực thành công')
//     };
// }


// export const actUpdateMeRequset = (data, token) => {
//     return async dispatch => {
//         const res = await callApi('users/me', 'PUT', data, token);
//         if (res && res.status === 200) {
//             toast.success('Update user is success')
//         }
//     };
// }

// export const actChangePasswordMeRequset = (data, token) => {
//     return async dispatch => {
//         const res = await callApi('users/me/changePassword', 'PUT', data, token);
//         if (res && res.status === 200) {
//             toast.success('Change password is success')
//         }
//     };
// }

