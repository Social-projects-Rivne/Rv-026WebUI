import React from 'react';
import { Route, IndexRoute } from 'react-router';

import checkLogin from '../common/checkLogin';
import checkUserId from '../common/checkUserId';
import NotFound from '../common/NotFound';
import MainLayout from '../layouts';
import MainPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import RecipesPage from '../pages/RecipesPage';
import CreateRecipePage from '../pages/CreateRecipePage';
import RecipePage from '../pages/RecipePage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignUpSuccess from '../pages/SignUpSuccess/SignUpSuccess';
import Terms from '../pages/Terms/Terms';
import User from '../pages/UserPage/UserPage';

const routes = (
    <Route path="/" component={MainLayout}>
        <IndexRoute component={MainPage} />
        <Route path="/recipes" component={RecipesPage} />
        <Route path="/:tag_id/recipes" component={RecipesPage} />
        <Route path="/recipes/new" onEnter={checkUserId} component={CreateRecipePage} />
        <Route path="/recipes/:id" component={RecipePage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signupsuccess" component={SignUpSuccess} />
        <Route path="/terms" component={Terms} />
        <Route path="/signin" onEnter={checkLogin} component={SignInPage} />
        <Route path="/profile" onEnter={checkUserId}  component={User} />
        <Route path="*" component={NotFound} />
    </Route>
);

export default routes;
