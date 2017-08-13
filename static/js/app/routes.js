import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from '../common/NotFound';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';

const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;