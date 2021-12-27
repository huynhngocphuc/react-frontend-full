import React from 'react';
import HomePage from './pages/HomPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ActivePage from './pages/ActivePage';
import NotFoundPage from './pages/NotFoundPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage'



const routes = [
  {
    path: '/',
    exact: true,
    main: (match) => < HomePage match={match} />
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
    path: '',
    exact: true,
    main: (match) => < NotFoundPage match={match}/>
  }

]

export default routes;