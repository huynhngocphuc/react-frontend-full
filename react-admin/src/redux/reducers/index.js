import { combineReducers } from 'redux';
import auth from './auth';
import loading from './loading';
import nameRole from './nameRole';
import dashboard from './dashboard'
import users from './users';
import products from './products';
import categories from './categories';
import producers from './producers';

const appReducers = combineReducers({
    auth,
    loading,
    nameRole,
    dashboard,
    users,
    products,
    categories,
    producers
    
})

export default appReducers;