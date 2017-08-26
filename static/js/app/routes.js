import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from '../common/NotFound';
import MainLayout from '../layouts';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import { RecipesPage, RecipesNew } from '../pages/RecipesPage';

const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/signin" component={SignInPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/recipes/new" component={RecipesNew} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;