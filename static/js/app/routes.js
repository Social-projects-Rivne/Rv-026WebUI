import React from 'react';
import { Route, IndexRoute } from 'react-router';

import checkLogin from '../common/checkLogin';
import checkLoginCook from '../common/checkLoginCook';
import checkUserId from '../common/checkUserId';
import NotFound from '../common/NotFound';
import MainLayout from '../layouts';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import RecipesPage from '../pages/RecipesPage';
import CreateRecipePage from '../pages/CreateRecipePage';
import RecipePage from '../pages/RecipePage';
import OrderAcceptPage from '../pages/OrderAcceptPage';
import SignUpPage from '../pages/SignUpPage';
import SignUpSuccess from '../pages/SignUpSuccess';
import Terms from '../pages/Terms';
import User from '../pages/Profile';
import OrdersPage from '../pages/OrdersPage';
import UserPage from '../pages/UserPage';

const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/recipes/search/name=:name" component={RecipesPage} />
        <Route path="/recipes/search/tagtype=:tagtype" component={RecipesPage} />
        <Route path="/recipes/search/ingredients=:ingredients" component={RecipesPage} />
        <Route path="/recipes/search/tag=:tag_id" component={RecipesPage} />
        <Route path="/recipes/new" onEnter={checkUserId} component={CreateRecipePage} />
        <Route path="/recipes/:id" component={RecipePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signupsuccess" component={SignUpSuccess} />
        <Route path="/terms" component={Terms} />
        <Route path="/signin" onEnter={checkLogin} component={SignInPage} />
        <Route path="/profile" onEnter={checkUserId} component={User} />
        <Route path="/orders/new" component={OrderAcceptPage} />
        <Route path="/orders" onEnter={checkLoginCook} component={OrdersPage} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;
