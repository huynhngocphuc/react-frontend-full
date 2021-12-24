import React from 'react';
import Login from './components/Login/Login';
import DashboardPage from './pages/DashBoardPage'
import ProductPage from './pages/ProductPage';


const routes = [
    {
        path: '/',
        exact: true,
        main: () => <DashboardPage />
    },
    {
        path: '/login',
        exact: false,
        main: () => <Login />
    },
    {
        path: '/products',
        exact: true,
        main: ({ match }) => <ProductPage  match={match}/>
      },
]

export default routes;