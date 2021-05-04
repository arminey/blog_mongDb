import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Users from './pages/Users/Users';
import Articles from './pages/Articles/Articles';
import Categories from './pages/Categories/Categories';
import CreateCategory from './pages/CreateCategory/CreateCategory';

import { useAuth } from './shared/auth-hook';
import Sidebar from './components/Sidebar/Sidebar';
import { AuthContext } from './shared/context/auth-context';



const App = () => {
  const { role, token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/api/categories/createcategory">
          <CreateCategory />
        </Route>
        <Route path="/api/users" exact>
          <Users />
        </Route>
        <Route path="/api/articles" exact>
          <Articles />
        </Route>
        <Route path="/api/categories" exact>
          <Categories />
        </Route>
        <Redirect to="/api/users" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }


  return (
    <AuthContext.Provider
      value={{
        role: role,
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        {token && <Sidebar title={''}/>}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
