import React from 'react';
import HomePage from './pages/HomPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ActiveRegister from './pages/ActiveRegister';



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
    path: '/activate/:code',
    exact: true,
    main: (match) => < ActiveRegister match={match} />
  }
]

export default routes;