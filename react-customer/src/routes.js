import React from 'react';
import HomePage from './pages/HomPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivePage from './pages/ActivePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ResetPasswordPage from './pages/ResetPasswordPage'
import ShopCategoryPage from './pages/ShopCategoryPage';
import ProductSearchPage from './pages/ProductSearchPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckOutPage from './pages/CheckOutPage';
import PaypalPage from './pages/PaypalPage';
import MoMoPage from './pages/MoMoPage ';
import VnPayPage from './pages/VnPayPage';
import Order1Page from './pages/OrderStatus1Page';
import Order2Page from './pages/OrderStatus2Page';
import Order3Page from './pages/OrderStatus3Page';
import ProductPage from './pages/ProductPage';
import AfterCheckoutPage from './pages/AfterCheckoutPage';
import LoginGooglePage from './pages/LoginGooglePage';
import ProfilePage from './pages/ProfilePage'
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
    path: '/payment/paypal/success/:orderid',
    exact: false,
    main: (match) => < PaypalPage  match={match} />
  },
  {
    path: '/oauth2/redirect',
    exact: false,
    main: (match) => < LoginGooglePage  match={match} />
  },
  {
    path: '/payment/momo/:orderid',
    exact: false,
    main: (match) => < MoMoPage  match={match} />
  },
  {
    path: '/payment/vnpay/:orderid',
    exact: false,
    main: (match) => < VnPayPage  match={match} />
  },
  {
    path: '/login',
    exact: false,
    main: (match) => < LoginPage match={match} />
  },
  {
    path: '/register',
    exact: false,
    main: (match) => < RegisterPage match={match} />
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
    path: '/search',
    exact: false,
    main: (match) => <ProductSearchPage match={match} />
  },
  {
    path: '/cart',
    exact: false,
    main: (match) => < ShoppingCartPage match={match} />
  },
  {
    path: '/profile',
    exact: false,
    main: (match) => < ProfilePage match={match} />
  },

  {
    path: '/order/status1',
    exact: false,
    main: (match) => < Order1Page match={match} />
  },
  {
    path: '/order/status2',
    exact: false,
    main: (match) => < Order2Page match={match} />
  },
  {
    path: '/order/status3',
    exact: false,
    main: (match) => < Order3Page match={match} />
  },
  {
    path: '/checkout',
    exact: false,
    main: (match) => < CheckOutPage match={match}/>
  },
  {
    path: '/after-checkout',
    exact: false,
    main: (match) => < AfterCheckoutPage match={match}/>
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