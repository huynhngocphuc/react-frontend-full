import axios from 'axios';
import * as Config from '../constants/Config';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
toast.configure()

export default async function callApi(endpoint, method = 'GET', body, token) {
  
  try {
    let data;
    console.log(token)
    if (token !== undefined && token !== null && token !== '') {
      console.log("vào chổ có token")
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        headers: { Authorization: `${token}` },
        data: body
      });
      return data;
    } else {
      console.log("vào chổ không token")
      data = await axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
      });
      return data;
    }
  }
  catch (err) {
    
    if (err.response && err.response.data) {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: `${err.response.data.message}`
      })
    } else {
      MySwal.fire({
        icon: 'error',
        title: 'Lỗi Server',
        text: 'không thể kết nối server!'
      })
    }
  }
}