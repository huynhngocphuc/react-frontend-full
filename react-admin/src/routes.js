import React from 'react';
import Login from './components/Login/Login';
import DashboardPage from './pages/DashBoardPage'
import ProductPage from './pages/ProductPage';
import ActionProductPage from './pages/ActionProductPage';
import CategoryPage from './pages/CategoryPage';
import ProducerPage from './pages/ProducerPage';

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
        main: ({ match }) => <ProductPage match={match} />
    },
    {
        path: '/products/add',
        exact: false,
        main: ({ history }) => <ActionProductPage history={history} />
    },
    {
        path: '/categories',
        exact: true,
        main: () => <CategoryPage />
    },
    {
        path: '/producers',
        exact: true,
        main: () => <ProducerPage/>
    }

]

export default routes;