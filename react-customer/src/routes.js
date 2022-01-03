import React from 'react';
import HomePage from './pages/HomPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ActivePage from './pages/ActivePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ResetPasswordPage from './pages/ResetPasswordPage'
import ShopCategoryPage from './pages/ShopCategoryPage';
import ProductSearch from './components/ProductAll/ProductSearch';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckOutPage from './pages/CheckOutPage';
import PaypalPage from './pages/PaypalPage';

import ProductPage from './pages/ProductPage';
const routes = [
  {
    path: '/',
    exact: true,
    main: (match) => < HomePage match={match} />
  },
  {
    path: '/products',
    exact: true,
    main: (match) => < ProductPage match={match}/>
  },
  {
    path: '/products/:id',
    exact: true,
    main: (match) => < ProductDetailPage match={match} />
  },
  {
    path: '/payment/success/:orderid',
    exact: false,
    main: (match) => < PaypalPage  match={match} />
  },
  {
    path: '/login-register',
    exact: false,
    main: (match) => < LoginRegisterPage match={match} />
  },
  {
    path: '/forgot-password',
    exact: false,
    main: (match) => < ForgotPasswordPage  match={match}/>
  },
  {
    path: '/reset/:code',
    exact: true,
    main: (match) => < ResetPasswordPage  match={match}/>
  },
  {
    path: '/activate/:code',
    exact: true,
    main: (match) => < ActivePage match={match} />
  },
  {
    path: '/categories/:name',
    exact: false,
    main: (match) => <ShopCategoryPage match={match} />
  },
  {
    path: '/products/search/:key',
    exact: false,
    main: (match) => <ProductSearch match={match} />
  },
  {
    path: '/cart',
    exact: false,
    main: (match) => < ShoppingCartPage match={match} />
  },
  {
    path: '/checkout',
    exact: false,
    main: (match) => < CheckOutPage match={match}/>
  },
  {
    path: '/about',
    exact: false,
    main: (match) => < AboutPage match={match}/>
  },
  {
    path: '/contact',
    exact: false,
    main: (match) => < ContactPage match={match}/>
  },
  {
    path: '',
    exact: true,
    main: (match) => < NotFoundPage match={match}/>
  }

]

export default routes;