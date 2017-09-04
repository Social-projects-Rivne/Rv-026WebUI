import React from 'react';
import { Route, IndexRoute } from 'react-router';

import checkLogin from '../common/checkLogin';
import NotFound from '../common/NotFound';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/MainPage/MainPage';
import SignInPage from '../pages/SignInPage/SignInPage';
import RecipesPage from '../pages/RecipesPage/RecipesPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';
import Terms from '../pages/Terms/Terms';

const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signupsuccess" component={SignUpSuccess} />
        <Route path="/terms" component={Terms} />
        <Route path="/signin" onEnter={checkLogin} component={SignInPage} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;