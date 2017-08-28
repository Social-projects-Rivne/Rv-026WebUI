import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from '../common/NotFound';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import Recipes from '../pages/Recipes/Recipes';




const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/recipes" component={Recipes} />
        <Route path="*" component={NotFound} />
    </Route>
);


export default routes;
