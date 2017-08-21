import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from '../common/NotFound';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';


const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/signupsuccess" component={SignUpSuccess} />


        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;
